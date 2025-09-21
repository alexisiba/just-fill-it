// store/index.ts
import { create } from "zustand";
import { createFileSlice } from "./slices/fileSlice";
import { FileState } from "./types/fileTypes";

type RootState = FileState;

export const useStore = create<RootState>((...args) => ({
  ...createFileSlice(...args),
}));

export type { RootState };
