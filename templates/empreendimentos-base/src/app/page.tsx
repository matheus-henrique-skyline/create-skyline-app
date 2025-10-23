"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useContextDefault } from "@/context/Context";
import AnimatedText from "./animations/animatedText";

const Home: React.FC = () => {
  const router = useRouter();
  const context = useContextDefault();
  const setSubmenuAndSelected = context?.setSubmenuAndSelected;

  const handleClick = () => {
    setSubmenuAndSelected?.("/project-name", ""); // Set state before navigation
    router.push("/project-name"); // Redireciona para a página de localização
  };

  return (
    <div
      className="w-fulll h-screen bg-institucional overflow-hidden min-h-[800px] min-w-[1200px] flex justify-center items-center"
      onClick={handleClick}
    >
      <AnimatedText text="Crie sua primeira experiência" />
    </div>
  );
};

export default Home;
