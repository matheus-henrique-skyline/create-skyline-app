"use client";

import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useOrientation from "./components/verificaOrientacao";
import { usePathname } from "next/navigation";
import LoadingOverlay from "./components/Loading";
import { useContextDefault } from "@/context/Context";
import TelaCheia from "./components/TelaCheia";
import Music from "./project-name/components/Music";
import ButtonSoundAudio from "./components/ButtonSoundAudio";

//configurar tema
//cores e fontes
const theme = createTheme({
  palette: {
    background: {
      default: "#080830",
    },
    primary: {
      main: "#EBF7FD",
    },
    secondary: {
      main: "#EBF7FD",
    },
    text: {
      primary: "#080830",
      secondary: "#EBF7FD",
    },
  },
  typography: {
    fontFamily: "bricolage",
  },
});
const OrientationWarning = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-second text-first">
    <h1 className="text-2xl font-bold mb-4">Modo Paisagem Necessário</h1>
    <p className="text-center">
      Por favor, rotacione seu dispositivo para o modo paisagem para uma melhor
      experiência.
    </p>
  </div>
);

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isLandscape = useOrientation();
  const context = useContextDefault();
  const abrirImagensTelaCheia = context?.abrirImagensTelaCheia;
  useEffect(() => {
    setLoading(true); // Ativa o loading
    const timer = setTimeout(() => {
      setLoading(false); // Desativa após 2s
    }, 3000);

    return () => clearTimeout(timer); // Evita bugs ao desmontar
  }, [pathname]);
  return (
    <ThemeProvider theme={theme}>
      {loading && <LoadingOverlay />}
      {isLandscape ? children : <OrientationWarning />}
      {abrirImagensTelaCheia?.open && <TelaCheia />}
      <ButtonSoundAudio />
      <Music />
    </ThemeProvider>
  );
}
