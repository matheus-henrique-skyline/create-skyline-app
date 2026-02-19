"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useContextDefault } from "@/context/Context";
import menuStructure from "./utils/menuStructure";
import Image from "next/image";

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
    if (setSubmenuAndSelected) setSubmenuAndSelected("/{{ projectName }}", "");
  }, []);

  return (
    <div className="w-full h-full bg-third overflow-hidden relative flex justify-center items-center row-span-24 col-span-24 cursor-pointer">
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
            <h2 className="text-xl font-light text-fifth">{item.title}</h2>
          </div>
        ))}
      </div>
      <Image
        src="/skyline.svg"
        alt="Skyline Logo"
        width={150}
        height={150}
        className="absolute top-10 right-10"
      />
    </div>
  );
};

export default MenuPage;
