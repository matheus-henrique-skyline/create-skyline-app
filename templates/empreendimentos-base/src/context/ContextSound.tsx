"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Sound {
  sound: number;
  toogleSound: () => void;
  playSound: () => void;
  buttonSound: boolean;
}

// Criando o contexto com um valor inicial opcional
const ContextSou = createContext<Sound | undefined>(undefined);

// Criando o provider
export const ContextSound = ({ children }: { children: ReactNode }) => {
  const [sound, setSound] = useState(0);
  const [buttonSound, setButtonSound] = useState(false);

  const playSound = () => {
    if (buttonSound === false) {
      setButtonSound(true);
      //defina o 1000 para a tamanho do som que escolher para os botões
      setTimeout(() => {
        setButtonSound(false);
      }, 1000);
    }
  };

  const toogleSound = () => {
    setSound?.(sound === 0 ? 1 : 0); // Alterna o som entre 0 e 1
  };

  return (
    <ContextSou.Provider
      value={{
        sound,
        toogleSound,
        playSound,
        buttonSound,
      }}
    >
      {children}
    </ContextSou.Provider>
  );
};

export const useContextSound = () => {
  return useContext(ContextSou);
};
