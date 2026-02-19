import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { ContextDefault } from "../context/Context";
import ThemeRegistry from "./materialUITheme";
import { ContextSound } from "../context/ContextSound";

export const metadata: Metadata = {
  title: "Skyline",
  description:
    "Modelo de Replicação apoiado na Documentação feita para o setor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-background text-foreground font-bricolage min-h-200 min-w-300">
        <React.StrictMode>
          <ContextSound>
            <ContextDefault>
              <ThemeRegistry>{children}</ThemeRegistry>
              {/* pode-se colocar a barra lateral aqui, porque ela aparece em todas as telas, menos na rota '/' e na rota '/menu'*/}
            </ContextDefault>
          </ContextSound>
        </React.StrictMode>
      </body>
    </html>
  );
}
