"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useContextSound } from "./ContextSound";

export interface Context {
  submenu: string;
  selected: string;
  setSubmenuAndSelected: (selected: string, submenu: string) => void;
  openMenu: boolean;
  setOpenMenu: (open: boolean) => void;
  abrirImagensTelaCheia: { open: boolean; pathImage: string };
  setAbrirImagensTelaCheia: (abrir: {
    open: boolean;
    pathImage: string;
  }) => void;
}

// Criando o contexto com um valor inicial opcional
const ContextDef = createContext<Context | undefined>(undefined);

// Criando o provider
export const ContextDefault = ({ children }: { children: ReactNode }) => {
  const contextSound = useContextSound();
  const playSound = contextSound?.playSound;

  const [menu, setMenu] = useState({
    selected: "",
    submenu: "",
  });
  const [openMenu, setOpenMenu] = useState(true);
  const [abrirImagensTelaCheia, setAbrirImagensTelaCheia] = useState({
    open: false,
    pathImage: "",
  });

  const setSubmenuAndSelected = (selected: string, submenu: string) => {
    setMenu({ selected, submenu });
    if (playSound) playSound();
  };

  return (
    <ContextDef.Provider
      value={{
        selected: menu.selected,
        submenu: menu.submenu,
        setSubmenuAndSelected,
        openMenu,
        setOpenMenu,
        abrirImagensTelaCheia,
        setAbrirImagensTelaCheia,
      }}
    >
      {children}
    </ContextDef.Provider>
  );
};

export const useContextDefault = () => {
  return useContext(ContextDef);
};
