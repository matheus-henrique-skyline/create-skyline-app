import type { Config } from "tailwindcss";
import tailwindAnimated from "tailwindcss-animated";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        first: "var(--first)",
        second: "var(--second)",
        third: "var(--third)",
        quart: "var(--quart)",
        fifth: "var(--fifth)",
      },
      gridTemplateColumns: {
        "24": "repeat(24, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        "24": "repeat(24, minmax(0, 1fr))",
      },
      fontFamily: {
        bricolage: ["bricolage"],
      },
      screens: {
        desktopmini: { min: "901px", max: "1535px" }, // telas de 901px até 1535px
        tablet: { min: "601px", max: "900px" }, // tablets (601px até 900px)
        mobile: { max: "600px" }, // telas menores que 601px
        fullhd: { min: "1536px", max: "2000px" }, // exatamente Full HD até antes do 4K
        fourk: { min: "2001px" }, // telas 4K ou maiores
      },
    },
  },
  plugins: [tailwindAnimated],
} satisfies Config;
