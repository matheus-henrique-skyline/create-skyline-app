import React from "react";

const Template: React.FC = () => {
  return (
    <div className="w-full h-screen grid grid-cols-24 min-h-[800px] min-w-[1200px] bg-black text-white">
      <div className="col-span-5  flex justify-center items-center bg-red-700">
        Aqui seria o menu
      </div>
      <div className="col-span-19 grid grid-rows-24 grid-cols-19 overflow-hidden bg-red-50 ">
        <div className="row-span-24 col-span-1 bg-amber-300 flex justify-center items-center">Espaçamento</div>
        <div className="row-span-3 col-span-17 bg-amber-400 w-full flex justify-center items-center">Espaçamento superior</div>
        <div className="row-span-17 col-span-17 bg-amber-500 flex justify-center items-center">
          Conteudo
        </div>
        <div className="row-span-2 col-span-17 bg-amber-600 flex justify-center items-center">
          Espaçamento inferior
        </div>
        <div className="row-span-1 col-span-17 flex justify-evenly items-center gap-20 px-12 animate-fade-right animate-duration-[2500ms] font-[Questrial] bg-amber-700">
          Aqui seria o submenu
        </div>
      </div>
    </div>
  );
};

export default Template;
