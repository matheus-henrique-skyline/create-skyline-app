"use client";

import React from "react";
import Menu from "../components/Menu";
import Submenu from "../components/Submenu";
import { useContextDefault } from "@/context/Context";
import GoogleMap from "../../components/GoogleMaps";

const LocalizacaoPage: React.FC = () => {
  const context = useContextDefault();
  const submenu = context?.submenu;

  return (
    <div className="w-full h-screen bg-background grid grid-cols-24 min-h-[800px] min-w-[1200px] grid-rows-24">
      <Menu />
      <div className="col-span-19 row-span-22 grid grid-rows-24 grid-cols-19 overflow-hidden animate-fade animate-duration-[2000ms]">
        <div className="row-span-24 col-span-1" />
        <div className="row-span-3 col-span-17" />
        {submenu === "ultratour" && (
          <div
            className="row-span-17 col-span-17 relative w-full h-full
          animate-fade animate-duration-[1000ms]"
          >
            <iframe
              src="https://skylineip.s3.sa-east-1.amazonaws.com/Tour+Virtual/GPL/GPL+-+Hello/index.htm"
              className="w-full h-full rounded-lg"
              title="ultratour"
            />
          </div>
        )}
        {submenu === "mapa-2d" && (
          <div className="row-span-17 col-span-17 overflow-hidden">
            <GoogleMap />
          </div>
        )}
      </div>
      <Submenu />
    </div>
  );
};

export default LocalizacaoPage;
