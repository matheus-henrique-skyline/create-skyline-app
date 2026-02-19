"use client";

import React from "react";
import Compare from "./Compare";
import { useContextDefault } from "@/context/Context";
import Image from "next/image";
const ImagensPage: React.FC = () => {
  const context = useContextDefault();
  const submenu = context?.submenu;
  return (
    <div className="col-span-19 overflow-hidden animate-fade animate-duration-2000 row-span-21 relative">
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
  );
};

export default ImagensPage;
