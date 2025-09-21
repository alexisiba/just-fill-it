import { StateCreator } from "zustand";
import { FileState } from "../types/fileTypes";

export const createFileSlice: StateCreator<FileState> = (set) => ({
  file: null,
  fileData: null,
  fileToDownload: null,
  actions: {
    addFile: (file) => set(() => ({ file })),
    removeFile: () =>
      set(() => ({
        file: null,
      })),
    resetAll: () =>
      set(() => ({
        file: null,
        fileData: null,
        fileToDownload: null,
      })),
    setFileData: (fileData) => set(() => ({ fileData })),
    setFileDataInitialValues: (values) =>
      set((state) => ({
        fileData: state?.fileData
          ? { ...state.fileData, initialValues: values }
          : null,
      })),
    setFileToDownload: (fileToDownload) => set(() => ({ fileToDownload })),
  },
});
