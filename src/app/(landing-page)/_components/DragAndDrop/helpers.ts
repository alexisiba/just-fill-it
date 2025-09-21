import { FileData } from "@/app/_store/types/fileTypes";
import Docxtemplater from "docxtemplater";
import InspectModule from "docxtemplater/js/inspect-module";
import { capitalize } from "lodash";
import PizZip, { LoadData } from "pizzip";
import { AnySchema, object, string } from "yup";
import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  REGEX_SEPARATORS,
  REGEX_TEMPLATE_VARIABLE,
  SUPPORTED_FILE_EXTENSIONS,
} from "./constants";
import { DragAndDropErrors } from "./types";
import { getSupportedFileExtensionsWithDots } from "@/app/utils/helpers";

export const checkIfExtensioIsSupported = (fileExtension: string) =>
  Object.values(SUPPORTED_FILE_EXTENSIONS).includes(fileExtension);

export const checkForFileErros = (file: File): DragAndDropErrors => {
  const errors: DragAndDropErrors = {};
  const fileExt = file?.name?.split(".")?.pop()?.toLowerCase() || "";
  if (file.size > MAX_FILE_SIZE_BYTES) {
    errors.fileSizeError = `El archivo excede el tamaño máximo de ${MAX_FILE_SIZE_MB} MB.`;
  }
  if (!checkIfExtensioIsSupported(fileExt)) {
    errors.fileTypeError = `Tipo de archivo no soportado. Tipos soportados: ${getSupportedFileExtensionsWithDots().join(
      ", "
    )}`;
  }

  return errors;
};

export const getFileSizeInMB = (file: File) =>
  (file.size / (1024 * 1024)).toFixed(2);

const getTemplateVariables = (variables: string[][]) => {
  return variables?.reduce((acc, variable) => {
    return { ...acc, [variable[1]]: variable[0] };
  }, {});
};

export const getInitialValuesFromVariables = (variables: string[][]) => {
  return variables?.reduce((acc, variable) => {
    return { ...acc, [variable[1]]: "" };
  }, {});
};

const handleTxtFileData = async (file: File): Promise<FileData> => {
  const textContent = await file.text();
  const variables: string[][] = [
    ...textContent
      .matchAll(REGEX_TEMPLATE_VARIABLE)
      .map((variable) => [
        variable[0],
        variable[1].replace(REGEX_SEPARATORS, "_"),
      ]),
  ];

  return {
    fileExtensions: file?.name?.split(".")?.pop()?.toLowerCase() || "",
    fileName: file.name,
    initialValues: getInitialValuesFromVariables(variables),
    templateVariables: getTemplateVariables(variables),
    textContent,
  };
};

const handleDocxFileData = async (file: File) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      if (!event.target) return;
      const content = event.target.result;
      const zip = new PizZip(content as LoadData);
      const iModule = new InspectModule();
      new Docxtemplater(zip, {
        delimiters: {
          start: "{{",
          end: "}}",
        },
        paragraphLoop: true,
        linebreaks: true,
        modules: [iModule],
      });

      const tags = iModule.getAllTags();
      console.log("🚀 ~ handleDocxFileData ~ foundTags:", tags);
    } catch (error) {
      console.error("Error al leer DOCX:", error);
    }
  };
  reader.readAsArrayBuffer(file);
};

export const getFileData = async (file: File): Promise<FileData> => {
  const fileExt = file?.name?.split(".")?.pop()?.toLowerCase() || "";
  if (fileExt === SUPPORTED_FILE_EXTENSIONS.TXT) {
    return handleTxtFileData(file);
  }
  if (
    fileExt === SUPPORTED_FILE_EXTENSIONS.DOC ||
    fileExt === SUPPORTED_FILE_EXTENSIONS.DOCX
  ) {
    handleDocxFileData(file);
    return {
      fileExtensions: "",
      fileName: "",
      initialValues: {},
      templateVariables: {},
      textContent: "",
    };
  }

  return {
    fileExtensions: "",
    fileName: "",
    initialValues: {},
    templateVariables: {},
    textContent: "",
  };
};

export const getIdentifierLabel = (identifier: string) =>
  capitalize(identifier.replace(REGEX_SEPARATORS, " "));

export const buildFormikValidationSchema = (fields: string[]) => {
  const schema: Record<string, AnySchema> = {};

  fields.forEach(
    (field) =>
      (schema[field] = string().required(
        `${getIdentifierLabel(field)} es un campo requerido`
      ))
  );

  return object(schema);
};
