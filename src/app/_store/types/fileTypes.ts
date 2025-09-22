export interface FileData {
  file: File;
  fileExtension: string;
  fileName: string;
  initialValues: Record<string, string>;
  templateVariables: Record<string, string>;
  textContent: string;
}

export interface FileState {
  file: File | null;
  fileData: FileData | null;
  fileToDownload: Blob | null;
  actions: {
    addFile: (file: File) => void;
    removeFile: () => void;
    resetAll: () => void;
    setFileData: (fileData: FileData) => void;
    setFileDataInitialValues: (values: Record<string, string>) => void;
    setFileToDownload: (fileToDownload: Blob) => void;
  };
}
