"use client";

import React from "react";
import Menu from "../components/Menu";
import Image from "next/image";
import { useContextDefault } from "@/context/Context";

const ImagensPage: React.FC = () => {
  const context = useContextDefault();
  const setAbrirImagensTelaCheia = context?.setAbrirImagensTelaCheia;
  return (
    <div className="w-full h-full bg-background grid grid-cols-24 grid-rows-24 ">
      <Menu />
      <div className="col-span-19  row-span-20 row-start-2 overflow-hidden animate-fade animate-duration-[2000ms] relative">
        <div className="row-span-17 col-span-17 relative w-full h-full">
          <Image
            src="/skyline.png"
            alt="Skyline"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div
        className="row-span-2 col-span-17 col-start-7 bg-black text-white flex items-center justify-center text-2xl font-bold cursor-pointer"
        onClick={() =>
          setAbrirImagensTelaCheia?.({
            open: true,
            pathImage: "/skyline.png",
          })
        }
      >
        Abrir Tela Cheia
      </div>
    </div>
  );
};

export default ImagensPage;
