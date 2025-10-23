"use client";

import { useContextDefault } from "@/context/Context";
import Image from "next/image";
import { memo, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

// Componente principal, memoizado para evitar renders desnecessários
const TelaCheia: React.FC = memo(() => {
  // Contexto para controlar abertura da tela cheia e imagem exibida
  const context = useContextDefault();
  const abrirImagensTelaCheia = context?.abrirImagensTelaCheia;
  const setAbrirImagensTelaCheia = context?.setAbrirImagensTelaCheia;

  // Referência para a imagem exibida
  const imgRef = useRef<HTMLImageElement>(null);

  // Estado para escala (zoom) da imagem
  const [scale, setScale] = useState(1);

  // Estado para armazenar distância inicial entre toques (pinça)
  const [startDistance, setStartDistance] = useState<number | null>(null);

  // Estado para posição da imagem (arrastar)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Última posição registrada (para arrastar)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  // Posição inicial do toque
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null,
  );

  // Fator de zoom acumulado para suavizar o pinch
  const [zoomFactor, setZoomFactor] = useState(1);

  // Estado para ativar/desativar modo de desenho
  const [isDrawing, setIsDrawing] = useState(false);

  // Referência para o canvas de assinatura/desenho
  const canvasRef = useRef<SignatureCanvas>(null);

  // Função para calcular a distância entre dois pontos de toque (pinça)
  const getDistance = (touches: Touch[]) => {
    if (touches.length < 2) return 0;
    const [touch1, touch2] = touches;
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Manipula o zoom via slider
  const handleZoomChange = (_: Event, value: number | number[]) => {
    if (typeof value === "number") {
      if (imgRef.current) {
        setPosition({
          x: 0,
          y: 0,
        });
        setScale(value);
      }
    }
  };

  // Evento de início do toque (armazena posição inicial)
  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  // Gerencia o zoom (pinça) e o arrastar da imagem
  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length === 2 && startDistance !== null) {
      // Pinça para zoom
      const currentDistance = getDistance(Array.from(e.touches) as Touch[]);

      // Suavização do zoom
      const smoothingFactor = 0.05;
      const distanceChange =
        (currentDistance - startDistance) * smoothingFactor;

      // Acúmulo progressivo do zoom
      const newZoomFactor = zoomFactor + Math.abs(distanceChange) * 0.02;
      setZoomFactor(newZoomFactor);

      // Novo cálculo do zoom, limitado entre 1x e 3x
      const newScale = Math.min(
        Math.max(1, scale + distanceChange * newZoomFactor),
        3,
      );

      // Ajusta a posição para manter o ponto de toque centralizado
      if (touchStart && imgRef.current) {
        const rect = imgRef.current.getBoundingClientRect();
        const offsetX = (touchStart.x - rect.left) / rect.width;
        const offsetY = (touchStart.y - rect.top) / rect.height;

        setPosition({
          x: (offsetX - 0.5) * (newScale - 1) * rect.width,
          y: (offsetY - 0.5) * (newScale - 1) * rect.height,
        });
      }

      setScale(newScale);
    } else if (e.touches.length === 1 && scale > 1 && touchStart) {
      // Arrastar a imagem quando está com zoom
      const dx = e.touches[0].clientX - touchStart.x;
      const dy = e.touches[0].clientY - touchStart.y;

      setPosition({
        x: lastPosition.x + dx,
        y: lastPosition.y + dy,
      });
    }
  };

  // Finaliza o toque, armazena última posição
  const handleTouchEnd = () => {
    setLastPosition(position);
    setStartDistance(null);
    setTouchStart(null);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/90 z-50 flex flex-col justify-center items-center font-[Montserrat] p-16 gap-y-8">
      {/* Área da imagem em tela cheia */}
      <div className="w-full h-full rounded-3xl relative text-white">
        <Image
          ref={imgRef}
          src={abrirImagensTelaCheia?.pathImage || ""}
          alt="Imagem Ampliada"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: "transform 0.1s ease-out",
          }}
          fill
          className="object-contain object-top"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      {/* Botões de ação (desenhar, apagar, fechar) */}
      <div className="absolute right-8 top-8 flex justify-between items-center gap-x-8">
        {isDrawing && (
          <button onClick={() => canvasRef.current?.clear()}>
            <Image
              src="/apagador.svg"
              alt="botao para fechar"
              aria-label="fechar"
              width={50}
              height={50}
              className="object-contain z-50 relative"
            />
          </button>
        )}

        <button onClick={() => setIsDrawing(!isDrawing)}>
          <Image
            src={isDrawing ? "/pencil-pressed.svg" : "/pencil.svg"}
            alt="botao para fechar"
            aria-label="fechar"
            width={50}
            height={50}
            className="object-contain z-50 relative"
          />
        </button>

        <button
          style={{ zIndex: 100 }}
          onClick={() => {
            setAbrirImagensTelaCheia?.({ open: false, pathImage: "" });
            setIsDrawing(!isDrawing);
          }}
        >
          <Image
            src="/menu/max-pressed.svg"
            alt="botao para fechar"
            aria-label="fechar"
            width={50}
            height={50}
            className="object-contain"
          />
        </button>
      </div>
      {/* Canvas de desenho sobre a imagem */}
      {isDrawing && (
        <div className="absolute inset-0">
          <SignatureCanvas
            ref={canvasRef}
            penColor="red"
            canvasProps={{
              className: "w-full h-full bg-transparent",
            }}
          />
        </div>
      )}
      {/* Slider de zoom */}
      <Box
        sx={{ width: 300, zIndex: 100 }}
        className="absolute bottom-0 right-4  "
      >
        <Slider
          value={scale}
          min={1}
          max={3}
          step={0.1}
          aria-label="Zoom"
          valueLabelDisplay="auto"
          onChange={handleZoomChange}
        />
      </Box>
    </div>
  );
});

TelaCheia.displayName = "TelaCheia"; // Nome do componente para debugging

export default TelaCheia;
