import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  REGEX_TEMPLATE_VARIABLE,
  SUPPORTED_FILE_TYPES,
} from "./constants";
import { DragAndDropErrors } from "./types";

export const checkForFileErros = (file: File): DragAndDropErrors => {
  const errors: DragAndDropErrors = {};
  const fileExt = file?.name?.split(".")?.pop()?.toLowerCase() || "";
  console.log("🚀 ~ checkForFileErros ~ file?.type:", fileExt);
  if (file.size > MAX_FILE_SIZE_BYTES) {
    errors.fileSizeError = `El archivo excede el tamaño máximo de ${MAX_FILE_SIZE_MB} MB.`;
  }
  if (!SUPPORTED_FILE_TYPES.includes(`.${fileExt}`)) {
    errors.fileTypeError = `Tipo de archivo no soportado. Tipos soportados: ${SUPPORTED_FILE_TYPES.join(
      ", "
    )}`;
  }

  return errors;
};

export const getTemplateVariables = async (file: File) => {
  const fileType = file?.name?.split(".")?.pop()?.toLowerCase() || "";
  if (fileType === "txt") {
    const text = await file.text();
    return [...text.matchAll(REGEX_TEMPLATE_VARIABLE)];
  }
};
