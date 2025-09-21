import { useStore } from "..";

export const useFile = () => useStore((state) => state.file);
export const useFileData = () => useStore((state) => state.fileData);
export const useFileToDownload = () =>
  useStore((state) => state.fileToDownload);
export const useFileActions = () => useStore((state) => state.actions);
