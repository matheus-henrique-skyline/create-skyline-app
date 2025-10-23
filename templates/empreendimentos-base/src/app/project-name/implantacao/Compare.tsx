"use client";

import React, { memo, useState } from "react";
import Image from "next/image";

const press = "opacity-50";
// const notPress = "bg-[#F7EDDC] text-[#B29A83]"

const botoesCompare = [
  { text: "98 M²", legenda1: "FINAL 01", legenda2: "PADRÃO" },
  { text: "98 M²", legenda1: "FINAL 01", legenda2: "PERSONALIZADO" },
  { text: "37 M²", legenda1: "FINAL 02", legenda2: "PADRÃO" },
  { text: "37 M²", legenda1: "FINAL 02", legenda2: "PERSONALIZADO" },
  { text: "59 M²", legenda1: "FINAL 03", legenda2: "PADRÃO" },
  { text: "59 M²", legenda1: "FINAL 03", legenda2: "PERSONALIZADO" },
  { text: "98 M²", legenda1: "FINAL 04", legenda2: "PADRÃO" },
  { text: "98 M²", legenda1: "FINAL 04", legenda2: "PERSONALIZADO" },
  { text: "83 M²", legenda1: "FINAL 05", legenda2: "PADRÃO" },
  { text: "83 M²", legenda1: "FINAL 05", legenda2: "PERSONALIZADO" },
  { text: "59 M²", legenda1: "FINAL 06", legenda2: "PADRÃO" },
  { text: "59 M²", legenda1: "FINAL 06", legenda2: "PERSONALIZADO" },
  { text: "37 M²", legenda1: "FINAL 07", legenda2: "PADRÃO" },
  { text: "37 M²", legenda1: "FINAL 07", legenda2: "PERSONALIZADO" },
  { text: "83 M²", legenda1: "FINAL 08", legenda2: "PADRÃO" },
  { text: "83 M²", legenda1: "FINAL 08", legenda2: "PERSONALIZADO" },
];

const Compare: React.FC = memo(function Compare() {
  const [pressaValidate, setpressValidate] = useState({
    pressOne: false,
    pressTwo: false,
  });
  const [pressFirst, setPressFirst] = useState(0);
  const [pressSecond, setPressSecond] = useState(0);
  const [compareOne, setCompareOne] = useState("/projeto/compare/mais.svg");
  const [compareTwo, setCompareTwo] = useState("/projeto/compare/mais.svg");
  const handlePress = (index: number) => {
    //validate if the press plant is already the comparision, if it is, take of the compare and unselected them
    if (pressFirst === index) {
      setpressValidate({ pressOne: false, pressTwo: pressaValidate.pressTwo });
      setPressFirst(0);
      setCompareOne("/projeto/compare/mais.svg");
      return;
    }
    if (pressSecond === index) {
      setpressValidate({ pressOne: pressaValidate.pressOne, pressTwo: false });
      setPressSecond(0);
      setCompareTwo("/projeto/compare/mais.svg");
      return;
    }
    if (
      pressaValidate.pressOne === false &&
      pressaValidate.pressTwo === false
    ) {
      setpressValidate({ pressOne: true, pressTwo: false });
      setPressFirst(index);
      setCompareOne(`/projeto/compare/plantas-full-${index}.png`);
    }
    if (pressaValidate.pressOne === true && pressaValidate.pressTwo === false) {
      setpressValidate({ pressOne: true, pressTwo: true });
      setPressSecond(index);
      setCompareTwo(`/projeto/compare/plantas-full-${index}.png`);
    }
    if (pressaValidate.pressOne === true && pressaValidate.pressTwo === true) {
      setpressValidate({ pressOne: true, pressTwo: false });
      setPressFirst(index);
      setCompareOne(`/projeto/compare/plantas-full-${index}.png`);
      setCompareTwo("/projeto/compare/mais.svg");
      setPressSecond(0);
    }
  };
  return (
    <div className="col-span-11 desktopmini:col-span-10 desktop:col-span-9 w-full h-full grid grid-rows-12 gap-8 p-12 animate-fade animate-duration-[1000ms] overflow-hidden text-white">
      <div className="row-span-8 flex w-full h-full gap-x-12 bg-[#ECEADA] rounded-3xl p-8">
        <div className="w-full h-full shadow-2xl rounded-3xl flex justify-center items-center border-2 border-background border-sha">
          {compareOne === "/projeto/compare/mais.svg" ? (
            <Image
              src={compareOne}
              width={80}
              height={25}
              alt="sinal de mais"
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={compareOne}
                fill
                alt="sinal de mais"
                className="object-contain animate-jump-in animate-duration-[1000ms]"
              />
            </div>
          )}
        </div>
        <div className="w-full h-full shadow-2xl rounded-3xl flex justify-center items-center border-2 border-background">
          {compareTwo === "/projeto/compare/mais.svg" ? (
            <Image
              src={compareTwo}
              width={80}
              height={25}
              alt="sinal de mais"
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={compareTwo}
                fill
                alt="sinal de mais"
                className="object-contain animate-jump animate-duration-[1000ms]"
              />
            </div>
          )}
        </div>
      </div>
      <div className="row-span-4 flex gap-4 overflow-x-auto custom-scrollbar p-2">
        {botoesCompare.map((botao, index) => {
          return (
            <div
              key={index + botao.text}
              className={`
              ${pressSecond === index + 1 && press}
              ${pressFirst === index + 1 && press}
              col-span-1 shadow-2xl min-w-56 bg-background gap-y-4 rounded-3xl flex flex-col justify-center items-center cursor-pointer p-8`}
              onClick={() => handlePress(index + 1)}
            >
              <div className="relative w-full h-full desktop:block  hidden">
                <Image
                  src={`/projeto/compare/plantas-mini-${index + 1}.png`}
                  className="object-contain p-2 bg-[#D2CFBE] rounded-3xl"
                  fill
                  alt={`Planta ${index + 1}`}
                />
              </div>
              <div className="flex text-[13px] justify-between items-center w-full">
                <h2 className="font-extrabold  text-2xl text-foreground">
                  {botao.text}
                </h2>
                <div className="flex flex-col items-end text-[#E07C40]">
                  <p>{botao.legenda1}</p>
                  <p className="text-[9px]"> {botao.legenda2}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Compare;