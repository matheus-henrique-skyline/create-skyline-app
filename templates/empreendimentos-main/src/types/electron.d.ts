// Extend the Window interface to include electronAPI
declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>;
      killApp: () => void;
    };
  }
}