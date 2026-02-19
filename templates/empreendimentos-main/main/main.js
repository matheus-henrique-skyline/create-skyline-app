// main.mjs
import { app, BrowserWindow, protocol, ipcMain } from "electron";
import { createReadStream, statSync, existsSync } from "fs";
import serve from "electron-serve";
import  path, { extname, join } from "path";
import mime from "mime";
import { fileURLToPath } from "url";
import updater from "electron-updater";

const { autoUpdater } = updater;

// Autoplay
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

// __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// electron-serve para o Next export (app://-)
const appServe = app.isPackaged
  ? serve({ directory: path.join(__dirname, "../out") })
  : null;

// Registre os esquemas ANTES do ready (requerido)
protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
      corsEnabled: true,
    },
  },
  {
    // novo esquema só para mídia, evita conflito com electron-serve
    scheme: "media",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
      corsEnabled: true,
    },
  },
]);

// Helper para descobrir a pasta dos vídeos em dev vs build
function getVideosBaseDir() {
  if (app.isPackaged) {
    // coloque seus vídeos em resources/videos (use asarUnpack)
    return join(process.resourcesPath, "videos");
  }
  // em dev, pode usar ../public/videos ou outra pasta local
  return join(__dirname, "../public/videos");
}

// Registre o protocolo DEPOIS do ready
async function registerMediaProtocol() {
  const videosDir = getVideosBaseDir();

  protocol.registerStreamProtocol("media", (request, callback) => {
    try {
      const url = new URL(request.url); // ex.: media://videos/meu.mp4
      // normaliza e impede path traversal
      const safePath = join(videosDir, decodeURIComponent(url.pathname.replace(/^\//, "")));

      if (!existsSync(safePath)) {
        return callback({ statusCode: 404, data: createReadStream("/dev/null") });
      }

      const { size } = statSync(safePath);
      const range = request.headers.Range || request.headers.range;
      const contentType = mime.getType(extname(safePath)) || "application/octet-stream";

      if (range) {
        const [startStr, endStr] = String(range).replace(/bytes=/, "").split("-");
        const start = parseInt(startStr, 10);
        const end = endStr ? parseInt(endStr, 10) : size - 1;

        if (isNaN(start) || start < 0 || start >= size) {
          return callback({
            statusCode: 416,
            headers: { "Content-Range": `bytes */${size}` },
            data: createReadStream("/dev/null"),
          });
        }

        const stream = createReadStream(safePath, { start, end });
        const chunkSize = end - start + 1;

        callback({
          statusCode: 206,
          headers: {
            "Content-Type": contentType,
            "Accept-Ranges": "bytes",
            "Content-Range": `bytes ${start}-${end}/${size}`,
            "Content-Length": String(chunkSize),
            "Cross-Origin-Resource-Policy": "same-origin",
          },
          data: stream,
        });
      } else {
        const stream = createReadStream(safePath);
        callback({
          statusCode: 200,
          headers: {
            "Content-Type": contentType,
            "Content-Length": String(size),
            "Accept-Ranges": "bytes",
            "Cross-Origin-Resource-Policy": "same-origin",
          },
          data: stream,
        });
      }
    } catch (err) {
      // fallback seguro
      callback({ statusCode: 500, data: createReadStream("/dev/null") });
      console.log(err);
    }
  });
}

// Janela
async function createWindow() {
  const win = new BrowserWindow({
    width: 3840,
    height: 2160,
    fullscreen: true,
    webPreferences: {
      contextIsolation: true,
      autoplayPolicy: "no-user-gesture-required",
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: true,
    },
  });

  if (app.isPackaged) {
    await appServe(win);
    // sua UI exportada em app://-
    await win.loadURL("app://-");
  } else {
    await win.loadURL("http://localhost:3000");
    win.webContents.on("did-fail-load", () => {
      win.webContents.reloadIgnoringCache();
    });
  }
  win.isAlwaysOnTop();
}

function killApplication() {
  // Fecha todas as janelas e encerra o app
  app.quit();

  // Se quiser ser mais agressivo (tipo desligar o HAL 9000):
  // app.exit(0);
}

function pingElectron() {
  return {
    runningInElectron: true,
    isPackaged: app.isPackaged,
  };
}

ipcMain.handle("ping-electron", () => {
  return pingElectron();
});

ipcMain.handle("kill-application", () => {
  return killApplication();
});

app.whenReady().then(async () => {
  // registre o protocolo de mídia AGORA (depois do ready)
  await registerMediaProtocol();

  // cria a janela e carrega a UI
  await createWindow();

  // Auto-update (intervalo reduzido é saudável, 1 min é muito curto)
  autoUpdater.checkForUpdatesAndNotify();
  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify();
  }, 1 * 60 * 1000); // 1 min

  autoUpdater.on("update-downloaded", () => {
    autoUpdater.quitAndInstall();
  });
});

// macOS lifecycle
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});