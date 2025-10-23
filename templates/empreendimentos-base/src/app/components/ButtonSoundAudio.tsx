import { useContextSound } from "@/context/ContextSound";
import React, { useEffect, useRef } from "react";

const ButtonSoundAudio: React.FC = () => {
  const context = useContextSound();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonSound = context?.buttonSound;

  useEffect(() => {
    const audio = audioRef.current;
    if (buttonSound && audio) {
      audio.currentTime = 0;
      audio.play();
    }

    if (!buttonSound) {
      audio?.pause();
    }
  }, [buttonSound]);

  return (
    <div className="hidden h-0 w-0">
      <audio src="./button-effect.mp3" ref={audioRef} />
    </div>
  );
};

export default ButtonSoundAudio;
