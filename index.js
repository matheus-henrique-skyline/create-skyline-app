#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 *
 * @param {string} src 
 * @param {string} dest 
 * @param {object} replacements 
 */
async function copyTemplate(src, dest, replacements) {
  const entries = await fs.readdir(src, { withFileTypes: true });
  await fs.mkdir(dest, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);

    let destName = entry.name;
    if (entry.name === 'project-name' && entry.isDirectory()) {
      destName = replacements.projectName;
    } else {
      Object.entries(replacements).forEach(([key, value]) => {
        destName = destName.replace(new RegExp(`{{ ${key} }}`, 'g'), String(value));
      });
    }

    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      await copyTemplate(srcPath, destPath, replacements);
    } else {
      const isTextFile = ['.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.json', '.md', '.txt', '.mjs', '.svg'].includes(path.extname(srcPath.toLowerCase()));

      if (isTextFile) {
        let content = await fs.readFile(srcPath, 'utf-8');
        Object.entries(replacements).forEach(([key, value]) => {
          content = content.replace(new RegExp(`{{ ${key} }}`, 'g'), String(value));
        });
        await fs.writeFile(destPath, content, 'utf-8');
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }
}

/**
 * @param {string} text
 * @returns {string}
 */
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  console.log(chalk.cyan("\n✨ Bem-vindo ao Create Skyline App ✨\n"));

  const answers = await inquirer.prompt([
    {
      name: "projectName",
      message: "Qual o nome do projeto?",
      default: "my-skyline-app",
      validate: (input) => {
        if (/^([a-z0-9]+(-[a-z0-9]+)*)$/.test(input)) return true;
        return "Project name must be in kebab-case (lowercase, alphanumeric, and dashes).";
      }
    },
    {
      name: "projectDescription",
      message: "Qual a descrição breve do projeto (para SEO/metadata)?",
      default: "Um novo empreendimento de luxo em São Paulo.",
    },
    {
      name: "primaryColor",
      message: "Cor primária (hex ou valor CSS):",
      default: "#1a73e8",
    },
    {
      name: "secondaryColor",
      message: "Cor secundária:",
      default: "#fbbc05",
    },
    {
      name: "submenuItems",
      message: "Quais serão os itens do menu? (separados por vírgula):",
      default: "Localização, Implantação, Imagens, Plantas, Ficha Técnica",
    },
    {
      name: "mapLat",
      message: "Latitude do mapa:",
      default: "-23.55052",
    },
    {
      name: "mapLng",
      message: "Longitude do mapa:",
      default: "-46.633308",
    },
  ]);

  const projectDir = path.join(process.cwd(), answers.projectName);
  const templateDir = path.join(__dirname, "templates", "empreendimentos-main");

  if (await fs.pathExists(projectDir)) {
    console.error(chalk.red(`\n❌ Erro: O diretório "${answers.projectName}" já existe.`));
    console.log(chalk.gray("   Por favor, escolha outro nome ou remova o diretório existente."));
    return;
  }

  const submenuItemsList = answers.submenuItems.split(",").map(s => s.trim()).filter(s => s.length > 0);

  const newMenuStructure = submenuItemsList.map(item => {
    const routeName = slugify(item);

    return {
      title: item,
      submenu: [""],
      caminho: `/${answers.projectName}/${routeName}`,
      submenuElements: [""],
    };
  });

  const menuStructureString = JSON.stringify(newMenuStructure, null, 2)

  const replacements = {
    projectName: answers.projectName,
    description: answers.projectDescription,
    primaryColor: answers.primaryColor,
    secondaryColor: answers.secondaryColor,
    submenuItems: JSON.stringify(submenuItemsList),
    mapLat: answers.mapLat,
    mapLng: answers.mapLng,
    menuStructure: menuStructureString,
  };

  console.log(chalk.gray("\n📁 Criando projeto a partir do template..."));
  await copyTemplate(templateDir, projectDir, replacements);

  // --- SEÇÃO DE LIMPEZA ---
  console.log(chalk.gray("⚙️  Limpando rotas padrão do template..."));

  const projectAppDir = path.join(projectDir, "src", "app", answers.projectName);
  const preservedDirs = ['components', 'utils'];

  try {
    const entries = await fs.readdir(projectAppDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !preservedDirs.includes(entry.name)) {
        await fs.remove(path.join(projectAppDir, entry.name));
        console.log(chalk.dim(`   -> Removida rota padrão: ${entry.name}/`));
      }
    }
  } catch (error) {
    console.warn(chalk.yellow(`Aviso: Não foi possível limpar os diretórios do template. ${error.message}`));
  }
  // --- FIM DA SEÇÃO DE LIMPEZA ---

  console.log(chalk.gray("⚙️  Criando novas páginas do submenu..."));

  for (const item of submenuItemsList) {
    const routeName = slugify(item); // e.g., "Ficha Técnica" -> "ficha-tecnica"
    const routeDir = path.join(projectAppDir, routeName);
    await fs.mkdir(routeDir, { recursive: true });

    // Sanitiza o nome do item para ser um nome de componente React válido
    const componentName = item.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "");

    // Cria um page.tsx básico para cada rota
    const pageContent = `
import React from 'react';

// Página para ${item}
export default function ${componentName}Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-[{{primaryColor}}]">Página: ${item}</h1>
      <p className="text-lg mt-4">Conteúdo da página ${item} vai aqui.</p>
    </main>
  );
}
`.trim().replace(/{{primaryColor}}/g, replacements.primaryColor); // Injete a cor diretamente

    await fs.writeFile(path.join(routeDir, "page.tsx"), pageContent, "utf-8");
    console.log(chalk.dim(`   -> Criada página em /${answers.projectName}/${routeName}/page.tsx`));
  }

  console.log(chalk.green("\n✅ Template base criado com sucesso!"));
  console.log(chalk.cyan(`\nPróximos passos:`));
  console.log(chalk.white(`   cd ${answers.projectName}`));
  console.log(chalk.white(`   npm install`));
  console.log(chalk.white(`   npm run dev\n`));
}

main().catch(err => {
  console.error(chalk.red("Erro ao criar o app:"), err);
});