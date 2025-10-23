"use client";

import React from "react";
import Menu from "../components/Menu";
import Compare from "./Compare";
import Submenu from "../components/Submenu";
import { useContextDefault } from "@/context/Context";
import Image from "next/image";
const ImagensPage: React.FC = () => {
  const context = useContextDefault();
  const submenu = context?.submenu;
  return (
    <div className="w-full h-full grid grid-cols-24 grid-rows-24">
      <Menu />
      <div className="col-span-19 overflow-hidden animate-fade animate-duration-[2000ms] row-span-21 relative">
        {submenu === "implantacao" && (
          <Image
            src="/skyline.png"
            fill
            alt="Implantação"
            className="object-contain w-full h-full"
          />
        )}
        {submenu === "compare" && <Compare />}
      </div>
      <Submenu />
    </div>
  );
};

export default ImagensPage;
