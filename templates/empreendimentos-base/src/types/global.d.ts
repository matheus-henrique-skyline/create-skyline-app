declare module "*.css";

// Extend the Window interface to include electronAPI
declare global {
  interface Window {
    electronAPI?: { on: () => void; send: () => void };
  }
}