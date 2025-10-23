"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import menuStructure from "../app/utils/menuStructure";
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
  const currenthPath = usePathname();
  let arrayOfSubmenuFirstElement = "";

  const menuIndex = menuStructure.findIndex((item: { caminho: string }) =>
    item.caminho.includes(currenthPath),
  );

  // If we're on /project-name (home page), set empty submenu
  if (currenthPath === "/project-name") {
    arrayOfSubmenuFirstElement = "";
  } else if (menuIndex !== -1) {
    arrayOfSubmenuFirstElement =
      menuStructure[menuIndex].submenuElements?.[0] || "";
  }

  const [menu, setMenu] = useState({
    selected: currenthPath,
    submenu: arrayOfSubmenuFirstElement,
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
