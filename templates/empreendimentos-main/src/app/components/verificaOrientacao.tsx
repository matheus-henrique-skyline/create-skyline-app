"use client";

// hooks/useOrientation.ts
import { useState, useEffect } from "react";

const useOrientation = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(true);

  useEffect(() => {
    // Função que atualiza o estado baseado na media query
    const updateOrientation = (e?: MediaQueryListEvent) => {
      // Se e estiver definido, usa o event; senão, consulta a condição atual
      const matches = e
        ? e.matches
        : window.matchMedia("(orientation: landscape)").matches;
      setIsLandscape(matches);
    };

    const mediaQuery = window.matchMedia("(orientation: landscape)");
    updateOrientation();

    // Adiciona o listener para mudanças de orientação
    mediaQuery.addEventListener("change", updateOrientation);

    // Remove o listener quando o componente for desmontado
    return () => {
      mediaQuery.removeEventListener("change", updateOrientation);
    };
  }, []);

  return isLandscape;
};

export default useOrientation;
