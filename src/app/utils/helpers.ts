import { SUPPORTED_FILE_EXTENSIONS } from "../(landing-page)/_components/DragAndDrop/constants";

export const saveAs = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getSupportedFileExtensionsWithDots = () =>
  Object.values(SUPPORTED_FILE_EXTENSIONS).map((ext) => `.${ext}`);
