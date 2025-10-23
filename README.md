# 🚀 Create Skyline App

Um *scaffolding tool* CLI (Command Line Interface) para inicializar rapidamente novos projetos de empreendimentos baseados no template padrão da Skyline. Esta ferramenta automatiza a configuração inicial, criação de rotas baseadas no menu e injeção de variáveis de ambiente e metadados.

## ✨ Funcionalidades

  * **Configuração Guiada:** Interface interativa via linha de comando (`inquirer`).
  * **Renomeação Automática:** Renomeia o diretório base do template (`project-name`) com o nome escolhido.
  * **Injeção de Config:** Injeta cores, coordenadas de mapa, metadados (SEO) e o menu principal em arquivos de configuração e layout.
  * **Geração Dinâmica de Rotas:** Cria automaticamente a estrutura de rotas (páginas) do Next.js com base nos itens de menu fornecidos, usando slugs padronizados.
  * **Geração de Menu Tipado:** Cria e preenche dinamicamente o arquivo de configuração do menu (`menuStructure.ts`), garantindo a tipagem correta no TypeScript.
  * **Limpeza de Template:** Remove rotas padrão e desnecessárias do template base.

## 📦 Instalação

Como este é um script local, ele provavelmente será executado de duas formas:

### Opção 1: Uso Direto (Recomendado para CLI)

Se você o publicou como um pacote npm:

```bash
# Via npx (sem instalação global)
npx create-skyline-app

# Ou, se for um comando global
npm install -g create-skyline-app
```

### Opção 2: Uso Local (Se mantido no repositório de ferramentas)

1.  Clone o repositório onde este script está.

2.  Certifique-se de que todas as dependências estejam instaladas:

    ```bash
    npm install inquirer fs-extra chalk
    ```

3.  Execute o script diretamente:

    ```bash
    node index.js
    ```

## 🛠️ Como Usar

Para iniciar um novo projeto, basta executar o comando de instalação no diretório onde você deseja criar a pasta do novo projeto.

O CLI fará uma série de perguntas:

1.  **Qual o nome do projeto?**
      * (Ex: `empreendimento-alpha`. Deve ser em *kebab-case*.)
2.  **Qual a descrição breve do projeto (para SEO/metadata)?**
      * (Usado na tag `<meta name="description">` do `RootLayout`.)
3.  **Cor primária (hex ou valor CSS):**
4.  **Cor secundária:**
5.  **Quais serão os itens do menu? (separados por vírgula):**
      * (Ex: `Localização, Implantação, Plantas, Ficha Técnica`)
6.  **Latitude do mapa:**
7.  **Longitude do mapa:**

### Exemplo de Fluxo

```bash
✨ Bem-vindo ao Create Skyline App ✨

Qual o nome do projeto? (my-skyline-app): meu-novo-projeto
Qual a descrição breve do projeto (para SEO/metadata)? (Um novo empreendimento...): O melhor empreendimento da região.
Cor primária (hex ou valor CSS): (#1a73e8): #008080
...

📁 Criando projeto a partir do template...
⚙️  Limpando rotas padrão do template...
   -> Removida rota padrão: about/
   -> Removida rota padrão: contact/
⚙️  Criando novas páginas do submenu...
   -> Criada página em /meu-novo-projeto/localizacao/page.tsx
   -> Criada página em /meu-novo-projeto/implantacao/page.tsx
...

✅ Template base criado com sucesso!

Próximos passos:
   cd meu-novo-projeto
   npm install
   npm run dev
```
## Proximos passos

Configure o restante do submenu em `src/app/utils/menuStructure.ts`, como os itens do submenu

## ⚙️ Estrutura do Template

O script assume a seguinte estrutura dentro do seu template base (`templates/empreendimentos-base`):

  * **Rotas:** O script limpa e recria rotas dentro de `src/app/{{projectName}}/*`.
  * **Metadados:** Arquivo `src/app/layout.tsx` deve ter os placeholders:
    ```typescript
    export const metadata: Metadata = {
      title: "{{projectName}}",
      description: "{{description}}",
    };
    ```
  * **Menu:** Arquivo de configuração de menu (e.g., `src/config/menuStructure.ts`) deve ter o placeholder tipado:
    ```typescript
    const generatedMenuStructure = ({{menuStructure}}) as MenuStructureType[];
    ```

## 🤝 Contribuições

Contribuições, sugestões e relatórios de bugs são bem-vindos\! Por favor, abra uma *issue* ou *pull request* no repositório.
