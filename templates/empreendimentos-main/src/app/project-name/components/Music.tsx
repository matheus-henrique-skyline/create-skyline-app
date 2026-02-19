"use client";

import { useEffect, useRef } from "react";
import { useContextSound } from "@/context/ContextSound";

const Music = () => {
  const context = useContextSound();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sound = context?.sound;

  const volumeDown = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; // Diminui o volume em 10%
    }
  };

  volumeDown();

  useEffect(() => {
    const audio = audioRef.current;
    if (sound && audio) {
      audio.play();
      audio.currentTime = 0;
    }

    if (!sound) {
      audio?.pause();
    }
  }, [sound]);

  return (
    <div className="hidden h-0 w-0">
      <audio ref={audioRef} src="./praia.mp3" />
    </div>
  );
};

export default Music;
