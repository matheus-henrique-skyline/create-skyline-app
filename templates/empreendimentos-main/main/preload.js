const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  killApp: () => ipcRenderer.invoke("kill-application"),
  ping: () => ipcRenderer.invoke("ping-electron"),
});