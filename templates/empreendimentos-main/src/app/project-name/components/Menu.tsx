"use client";

import React, { memo } from "react";
import menuStructure from "../utils/menuStructure";
import { usePathname, useRouter } from "next/navigation";
import { useContextDefault } from "@/context/Context";
import { useContextSound } from "@/context/ContextSound";
import Image from "next/image";

const delay = [
  "animate-delay-100",
  "animate-delay-200",
  "animate-delay-300",
  "animate-delay-400",
  "animate-delay-500",
  "animate-delay-600",
  "animate-delay-700",
];

const Menu: React.FC = memo(function Menu() {
  const context = useContextDefault();
  const setSubmenuAndSelected = context?.setSubmenuAndSelected;
  const pathname = usePathname();
  const router = useRouter();
  const contextSound = useContextSound();
  const [popUpShow, setPopUpShow] = React.useState(false);
  const playSound = contextSound?.playSound;
  const toogleSound = contextSound?.toogleSound;
  const handleClick = (item: {
    caminho: string;
    submenuElements: string[];
  }) => {
    if (setSubmenuAndSelected && playSound) {
      setSubmenuAndSelected(item.caminho, item.submenuElements[0]);
      router.push(item.caminho);
    }
  };

  const indexSelected = menuStructure.findIndex((item: { caminho: string }) => {
    const normalize = item.caminho.replace("/{{ projectName }}/", "/");
    if (pathname.includes(normalize)) {
      return true;
    }
  });

  return (
    <div className="col-span-5 row-span-24 w-full bg-foreground border-2 border-personalizeorange grid grid-rows-24 col-start-1 row-start-1">
      <div className="row-span-6 relative animate-fade animate-duration-[2500ms ] text-first bg-background/70 cursor-pointer flex justify-center items-center">
        Seria a logo
      </div>
      <div className="row-span-14 grid grid-rows-7 grid-cols-6">
        <div className="col-span-4 row-span-14 flex flex-col items-center justify-between py-4 col-start-2">
          {menuStructure.map((item, index) => (
            <button
              onClick={() => {
                handleClick(item);
              }}
              key={index}
              className={`text-background desktop:text-sm desktop:w-56 w-48 text-[12px] h-12 flex items-center justify-center  cursor-pointer border-2 border-personalizeorange rounded-full animate-fade-right ${
                delay[index]
              } animate-duration-2000 ${
                indexSelected === index
                  ? "bg-first text-white"
                  : "hover:bg-personalizeorange/20"
              }`}
            >
              <p className="">{item.title}</p>
            </button>
          ))}
        </div>

        <div className="col-span-1 row-span-14" />
      </div>
      <div className="row-span-4 relative flex items-center justify-center animate-fade animate-duration-2500 text-black bg-background/70 cursor-pointer gap-2">
        <button
          onClick={() => {
            setSubmenuAndSelected?.("/{{ projectName }}", ""); // Set state before navigation
            router.push("/{{ projectName }}"); // Redireciona para a página inicial
          }}
          className="bg-first text-white p-2 rounded-full"
        >
          home
        </button>
        <button className="bg-first text-white p-2 rounded-full" onClick={() => toogleSound && toogleSound()}>sound</button>
        <button className="bg-first text-white p-2 rounded-full" onClick={() => setPopUpShow(!popUpShow)}>help</button>
      </div>
      {popUpShow && (
        <Image
          src="/pop-up.png"
          alt="Grafismo"
          width={150}
          height={250}
          className="absolute bottom-0 left-0 animate-fade-left z-50"
          onClick={() => setPopUpShow(!popUpShow)}
        />
      )}
    </div>
  );
});

export default Menu;
