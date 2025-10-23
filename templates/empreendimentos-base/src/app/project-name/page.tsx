"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useContextDefault } from "@/context/Context";
import menuStructure from "../utils/menuStructure";

const MenuPage: React.FC = () => {
  const router = useRouter();
  const context = useContextDefault();
  const setSubmenuAndSelected = context?.setSubmenuAndSelected;

  const handleClick = (item: {
    caminho: string;
    submenuElements: string[];
  }) => {
    if (setSubmenuAndSelected) {
      setSubmenuAndSelected(item.caminho, item.submenuElements[0]);
      router.push(item.caminho);
    }
  };

  useEffect(() => {
    if (setSubmenuAndSelected) setSubmenuAndSelected("/project-name", "");
  }, []);

  return (
    <div className="w-full h-full bg-background-tela-inicial overflow-hidden relative min-h-[800px] min-w-[1200px] flex justify-center items-center">
      <div className="flex justify-center items-center flex-col">
        Entenda as seções
        {menuStructure.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              handleClick(item);
            }}
            className="px-8 p-2 m-2 bg-menu rounded
    shadow-lg hover:shadow-xl transition-shadow duration-300 h-12 w-60 flex flex-col justify-center items-center cursor-pointer"
          >
            <h2 className="text-xl font-light text-foreground">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
