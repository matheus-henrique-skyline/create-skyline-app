"use client";

import { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeOff,
  VolumeUp,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface VideosProps {
  thumb: string;
  videoSrc: string;
}

declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>;
      killApp: () => void;
    };
  }
}

const VideoCustomize: React.FC<VideosProps> = ({ thumb, videoSrc }) => {
  const [videoLoadType, setVideoLoadType] = useState<string>("");

  // Referência para o elemento de vídeo
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Estado para play/pause
  const [playing, setPlaying] = useState(false);

  // Estado para mostrar/ocultar controles
  const [showControls, setShowControls] = useState(true);

  // Estado para mudo/desmutado
  const [muted, setMuted] = useState(false);

  // Estado para mostrar/ocultar slider de volume
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Estado para tempo atual de reprodução
  const [currentTime, setCurrentTime] = useState(0);

  // Estado para duração do vídeo
  const [duration, setDuration] = useState(0);

  // Estado para volume (0-100)
  const [volume, setVolume] = useState(100);

  // Estado para modo tela cheia
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Referência para o container (para fullscreen)
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Toca ou pausa o vídeo
  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
        setShowControls(true);
      } else {
        videoRef.current.play();
        setShowControls(false);
      }
      setPlaying(!playing);
    }
  };

  // Ativa ou desativa o mudo
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  // Entra ou sai do modo tela cheia
  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current
          .requestFullscreen()
          .then(() => setIsFullscreen(true));
      } else {
        document.exitFullscreen().then(() => setIsFullscreen(false));
      }
    }
  };

  // Lida com alteração do slider de volume
  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    const newVolume = typeof newValue === "number" ? newValue : newValue[0];
    setVolume(newVolume);

    // Define volume do vídeo e estado de mudo
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
      videoRef.current.muted = false;
      if (newVolume === 0) {
        setMuted(true);
      } else {
        setMuted(false);
      }
    }
  };

  useEffect(() => {
    try {
      if (window.electronAPI) {
        const ping = window.electronAPI.ping().then((res) => {
          console.log("Electron:", res);
          setVideoLoadType("media:/");
          return;
        });
        console.log(ping);
      }
    } catch (error) {
      console.error("Error accessing Electron API:", error);
      setVideoLoadType("");
      return;
    }
  }, []);

  useEffect(() => {
    // Define volume inicial do vídeo
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.volume = volume / 100;
      setCurrentTime(0);
    }
    if (playing) {
      togglePlay();
    }
  }, [videoSrc]);

  return (
    <div
      className={`${
        isFullscreen && !showControls ? "cursor-none" : "cursor-auto"
      } w-full h-full overflow-hidden relative`}
      ref={containerRef}
    >
      {/* Elemento de vídeo */}
      <video
        onClick={togglePlay}
        poster={thumb}
        ref={videoRef}
        className="animate-fade animate-duration-1000 absolute inset-0 w-full h-full object-contain"
        src={videoLoadType + videoSrc}
        onDoubleClick={toggleFullscreen}
        onTimeUpdate={() =>
          setCurrentTime(Number(videoRef.current?.currentTime.toFixed(2)) || 0)
        }
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
      />
      {!playing && (
        <IconButton
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <PlayArrow
            sx={{ width: "150px", height: "150px", color: "var(--second)" }}
            className="border-8 border-second p-2 rounded-full"
          />
        </IconButton>
      )}
      {/* Overlay dos controles */}
      {showControls && (
        <div
          className="absolute bottom-2 left-2 right-2 flex flex-col items-center justify-between bg-second/20 backdrop-blur-3xl p-2 mx-12 rounded-lg z-50 "
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          {/* Slider de progresso */}
          <Box className="w-full px-4">
            <Slider
              value={currentTime}
              min={0}
              max={duration}
              step={1}
              style={{ color: "var(--second)" }}
              onChange={(_, value) => {
                const newTime = typeof value === "number" ? value : value[0];
                setCurrentTime(newTime);
                if (videoRef.current) {
                  videoRef.current.pause();
                }
                setPlaying(false);
              }}
              onChangeCommitted={(_, value) => {
                const newTime = typeof value === "number" ? value : value[0];
                if (videoRef.current) {
                  videoRef.current.currentTime = newTime;
                  videoRef.current.play();
                  setPlaying(true);
                }
              }}
              valueLabelDisplay="auto"
            />
          </Box>
          {/* Controles de Play/Pause, Mudo, Volume, Fullscreen */}
          <div className="flex items-center justify-between w-full">
            <div className="flex justify-center items-center">
              {/* Botão Play/Pause */}
              <IconButton
                onClick={togglePlay}
                style={{ color: "var(--second)" }}
              >
                {playing ? <Pause /> : <PlayArrow />}
              </IconButton>

              {/* Botão Mudo/Desmutar */}
              <IconButton
                onClick={toggleMute}
                onMouseEnter={() => setShowVolumeSlider(true)}
                style={{ color: "var(--second)" }}
              >
                {muted ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
              {/* Slider de volume (aparece ao passar o mouse) */}
              {showVolumeSlider && (
                <Box sx={{ width: 100, zIndex: 100 }}>
                  <Slider
                    style={{ color: "var(--second)" }}
                    orientation="horizontal"
                    value={volume}
                    min={0}
                    max={100}
                    step={1}
                    aria-label="Volume"
                    valueLabelDisplay="auto"
                    onChange={handleVolumeChange}
                  />
                </Box>
              )}
            </div>
            {/* Botão de tela cheia */}
            <IconButton
              onClick={toggleFullscreen}
              style={{ color: "var(--second)" }}
            >
              {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCustomize;
