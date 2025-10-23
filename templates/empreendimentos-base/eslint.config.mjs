import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "dist", // builds
      "main", // assets
    ],
  },
  // Extensões oficiais do Next e TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      /* --- Estilo e Consistência --- */
      "react-hooks/exhaustive-deps": "off",
      indent: ["error", 2], // indentação 2 espaços
      quotes: ["error", "double"], // forçar aspas duplas
      semi: ["error", "always"], // sempre ponto e vírgula
      "comma-dangle": ["error", "always-multiline"], // vírgula no final em objetos/arrays multilinha
      "object-curly-spacing": ["error", "always"], // espaço dentro de {}
      "array-bracket-spacing": ["error", "never"], // sem espaço dentro de []
      "no-multiple-empty-lines": ["error", { max: 1 }], // no máximo 1 linha em branco

      /* --- Boas práticas --- */
      "no-console": ["warn", { allow: ["warn", "error"] }], // console.log vira warning
      eqeqeq: ["error", "always"], // usar === ao invés de ==
      "prefer-const": "error", // const quando não muda
      "no-mixed-spaces-and-tabs": "error", // sem mistura de tab/space
      "no-duplicate-imports": "error", // evitar imports duplicados
      "no-var": "error", // proibir var

      /* --- React/Next --- */
      "react/jsx-uses-react": "off", // Next.js já gerencia React
      "react/react-in-jsx-scope": "off", // não precisa importar React
      "react/self-closing-comp": "error", // componentes sem children = <Comp />
    },
  },
];

export default eslintConfig;
