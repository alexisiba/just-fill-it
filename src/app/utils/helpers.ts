import { SUPPORTED_FILE_EXTENSIONS } from "../[lang]/(landing-page)/_components/DragAndDrop/constants";

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

export const readFileAsBufferArryAsync = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event?.target?.result as string);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

export const readFileAsTextAsync = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event?.target?.result as string);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsText(file);
  });
};
