"use client";

import React, { memo, useEffect, useState } from "react";
import { useContextDefault } from "@/context/Context";
import menuStructure from "../../utils/menuStructure";
import { usePathname } from "next/navigation";

const Submenu: React.FC = memo(function Submenu() {
  const [indexSelected, setIndex] = useState(0);
  const context = useContextDefault();
  const pathname = usePathname();
  const setSubmenu = context?.setSubmenuAndSelected;
  const submenu = context?.submenu;

  useEffect(() => {
    const indexMenu = menuStructure.findIndex((item: { caminho: string }) =>
      item.caminho.includes(pathname),
    );
    setIndex(indexMenu);
  }, [pathname]);
  
  return (
    <div className={`col-start-6 row-span-1 row-start-23 col-span-19 flex justify-evenly items-center gap-20 px-12 animate-fade-right animate-duration-[2500ms] ${menuStructure[indexSelected].submenuElements.length === 1 && "hidden"}`}>
      {menuStructure[indexSelected].submenu.map((item, index) => {
        return (
          <button
            onClick={() => {
              setSubmenu?.(
                menuStructure[indexSelected].caminho,
                menuStructure[indexSelected].submenuElements[index],
              );
            }}
            key={item}
            className={`w-full desktop:px-4 py-2 rounded-full border-2 border-personalizeorange  cursor-pointer ${
              submenu === menuStructure[indexSelected].submenuElements[index]
                ? "bg-black"
                : "hover:bg-second/20"
            }`}
          >
            <p
              className={`text-center desktop:text-[1em] text-sm ${
                submenu === menuStructure[indexSelected].submenuElements[index]
                  ? "text-white"
                  : "text-menu"
              }`}
            >
              {item}
            </p>
          </button>
        );
      })}
    </div>
  );
});

export default Submenu;
