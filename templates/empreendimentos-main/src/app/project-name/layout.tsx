"use client";

import { usePathname } from "next/navigation";
import menuStructure from "./utils/menuStructure";
import Menu from "./components/Menu";
import Submenu from "./components/Submenu";

export default function Project({ children }: { children: React.ReactNode }) {
  const currenthPath = usePathname();
  const menuIndex = menuStructure.findIndex((item: { caminho: string }) => {
    const normalize = item.caminho.replace("/{{ projectName }}/", "/");
    if (currenthPath.includes(normalize)) {
      return currenthPath;
    }
  });
  return (
    <div className="w-full h-screen bg-background min-h-200 min-w-300 project-name grid grid-cols-24 grid-rows-24">
      {menuIndex !== -1 && (<Menu />)}
      {children}
      {menuIndex !== -1 && (<Submenu />)}

    </div>
  );
}
