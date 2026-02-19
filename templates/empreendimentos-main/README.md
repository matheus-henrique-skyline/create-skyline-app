# 🎭 Telas Interativas - Setor de Experiências

> 📌 Modelo base para o desenvolvimento de telas interativas do **Setor de Experiências** da **Skyline Produções e Inovação**.  
Criado por **Fernando Oliveira** para facilitar a criação de novas interfaces interativas.

---

## 🎯 Visão

🌟 **Inspirar decisões de compra no mercado imobiliário.**  

---

## 🚀 Tecnologias e Dependências

✔️ **Framework:** [Next.js](https://nextjs.org/)  
✔️ **Linguagem:** [TypeScript](https://www.typescriptlang.org/)  
✔️ **Estilização:** [TailwindCSS](https://tailwindcss.com/)  
✔️ **Componentes:** [Material UI](https://mui.com/)  
✔️ **Qualidade de Código:** [ESLint](https://eslint.org/)  

📌 **Plugins do Tailwind:**  
- [tailwind-animate](https://github.com/jamiebuilds/tailwindcss-animate)  
- [tailwind-animated](https://www.tailwindcss-animated.com/)  

---

## 🛠️ Configuração do Projeto

### 📦 Instale as dependências:
```sh
npm install
# ou
yarn install
```

### ▶️ Inicie o servidor:
```sh
npm run dev
# ou
yarn dev
```

🖥️ Acesse **[http://localhost:3000](http://localhost:3000)** no seu navegador.  

✍️ Comece editando `/src/app/page.tsx` — as alterações serão aplicadas automaticamente.  

---

## 🎨 Estilização

✨ O projeto usa **TailwindCSS** para estilização e **Material UI** para componentes.  
💡 Para modificar estilos globais, edite **`tailwind.config.js`**.  

📌 Documentação útil:  
- [📘 TailwindCSS](https://v2.tailwindcss.com/docs)  
- [🎨 Material UI](https://mui.com/)  
- [⚡ Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)  

---

## 🔤 Adicionando Fontes Personalizadas

1️⃣ Adicione os arquivos na pasta: `/src/app/fonts`  
2️⃣ No arquivo `/src/app/layout.tsx`, importe a fonte:  

```tsx
import localFont from 'next/font/local'

const Nexa = localFont({
  src: './fonts/font.ttf', // Caminho do arquivo da fonte
})
```

3️⃣ Agora, utilize a fonte dentro do `className` do **body**.

---

## 💡 Dicas Rápidas

✅ **Criando Páginas no Next.js:**  
Basta criar uma **pasta** dentro de `/app` com o nome da rota e um arquivo `page.tsx` dentro dela.  

✅ **Gerenciando Contextos:**  
Para adicionar novos contextos, utilize `/src/app/context/`. Se não precisar, remova os arquivos `context.tsx` e `index.tsx`.  

✅ **Adicionando Componentes:**  
Coloque novos componentes em `/src/app/components` e importe-os nos arquivos necessários.  

✅ **Imagens:**  
Coloque imagens na pasta `public/` e use o componente **Next.js `<Image/>`**:  
```tsx
<Image src="/pasta/imagem.png" alt="Descrição da imagem" />
```

✅ **Personalizando o Nome e Logo do App:**  
- **Nome:** Altere o `title` dentro de `metadata` no arquivo `/src/app/layout.tsx`.  
- **Logo:** Substitua o arquivo `favicon.ico` dentro de `/app`.  

✅ **VERSÂO 18 DO NODE**  
---

## 🌍 Saiba Mais

📖 [📘 Documentação do Next.js](https://nextjs.org/docs)  
📚 [🎓 Aprenda Next.js](https://nextjs.org/learn)  
🚀 [🔗 Repositório do Next.js no GitHub](https://github.com/vercel/next.js)  

---

## ☁️ Deploy na Vercel

A maneira mais fácil de fazer o deploy é utilizando a [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).  

📖 Consulte a [Documentação de Deployment](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.  

---

## ⚖️ Licença

📜 Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais informações.  

⚠️ **As aplicações criadas com este projeto não são de livre acesso. O uso dos arquivos deste repositório é restrito.**  

---

## 📜 Copyright

© 2025 **Skyline Produções e Inovação**. Todos os direitos reservados.  

🔒 **Este software é de uso exclusivo da empresa e não pode ser distribuído, modificado ou reproduzido sem permissão.**  

