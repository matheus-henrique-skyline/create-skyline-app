import fs from "fs";
import path from "path";
import sharp from "sharp";

const projectRoot: string = process.cwd();
const publicDir: string = path.join(projectRoot, "public");
const publicBackupDir: string = path.join(projectRoot, "public_backup");
const srcDir: string = path.join(projectRoot, "src");

const imageExts: string[] = [".png", ".jpg", ".jpeg"];
const codeExts: string[] = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".css",
  ".scss",
  ".json",
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function getFilesRecursively(dir: string, extFilter: string[]): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath, extFilter));
    } else if (extFilter.includes(path.extname(filePath).toLowerCase())) {
      results.push(filePath);
    }
  }
  return results;
}

function copyDirRecursively(src: string, dest: string): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursively(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// ─── Steps ──────────────────────────────────────────────────────────────────

function backupPublic(): void {
  if (!fs.existsSync(publicDir)) {
    console.error("❌ Pasta /public não encontrada. Abortando.");
    process.exit(1);
  }

  if (fs.existsSync(publicBackupDir)) {
    console.log(
      "⚠️  Backup já existe em /public_backup. Sobrescrevendo..."
    );
    fs.rmSync(publicBackupDir, { recursive: true, force: true });
  }

  console.log("📦 Criando backup em /public_backup...");
  copyDirRecursively(publicDir, publicBackupDir);
  console.log("✅ Backup concluído!\n");
}

async function convertImages(): Promise<void> {
  console.log("🔍 Buscando imagens em /public...");
  const images = getFilesRecursively(publicDir, imageExts);

  if (images.length === 0) {
    console.log("Nenhuma imagem .png ou .jpg encontrada em /public.");
    return;
  }

  for (const imgPath of images) {
    const parsedPath = path.parse(imgPath);
    const webpPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

    try {
      await sharp(imgPath).webp({ quality: 80 }).toFile(webpPath);
      fs.unlinkSync(imgPath);
      console.log(`  🖼️  ${parsedPath.base}  →  ${parsedPath.name}.webp`);
    } catch (err) {
      const error = err as Error;
      console.error(`  ❌ Erro ao converter ${imgPath}: ${error.message}`);
    }
  }
}

function updateReferencesInCode(): void {
  console.log("\n🔍 Atualizando referências em /src...");
  const codeFiles = getFilesRecursively(srcDir, codeExts);

  for (const filePath of codeFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    const regex = /\.(png|jpe?g)(["'`?])/gi;
    const newContent = content.replace(regex, ".webp$2");

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, "utf8");
      console.log(`  ✏️  ${path.relative(projectRoot, filePath)}`);
    }
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function run(): Promise<void> {
  console.log("═══════════════════════════════════════════");
  console.log("   🚀 Otimizador de Imagens – WebP        ");
  console.log("═══════════════════════════════════════════\n");

  backupPublic();

  console.log("⚙️  Convertendo imagens para WebP...");
  await convertImages();

  updateReferencesInCode();

  console.log("\n═══════════════════════════════════════════");
  console.log("   ✅ Conversão concluída com sucesso!     ");
  console.log("═══════════════════════════════════════════");
}

run();