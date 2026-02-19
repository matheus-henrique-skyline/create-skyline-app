"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useContextDefault } from "../context/Context";
import AnimatedText from "./animations/animatedText";
import Image from "next/image";

const Home: React.FC = () => {
  const router = useRouter();
  const context = useContextDefault();
  const setSubmenuAndSelected = context?.setSubmenuAndSelected;

  const handleClick = () => {
    setSubmenuAndSelected?.("/{{ projectName }}", ""); // Set state before navigation
    router.push("/{{ projectName }}"); // Redireciona para a página de localização
  };

  return (
    <div
      className="w-full h-screen bg-first overflow-hidden flex justify-center items-center"
      onClick={handleClick}
    >
      <AnimatedText text="Crie sua primeira experiência" className="text-white" />
      <Image
        src="/skyline.svg"
        alt="Skyline Logo"
        width={150}
        height={150}
        className="absolute top-10 right-10 opacity-100"
      />
    </div>
  );
};

export default Home;
