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
import {
  getSupportedFileExtensionsWithDots,
  readFileAsBufferArryAsync,
} from "@/app/utils/helpers";

const getFormattedKey = (unformattedKey: string) =>
  unformattedKey.toLocaleLowerCase().replace(REGEX_SEPARATORS, "_");

export const checkIfExtensioIsSupported = (fileExtension: string) =>
  Object.values(SUPPORTED_FILE_EXTENSIONS).includes(fileExtension);

export const getFileSizeInMB = (file: File) =>
  (file.size / (1024 * 1024)).toFixed(2);

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

const getTemplateVariables = (variables: string[][]) => {
  return variables?.reduce((acc, variable) => {
    return { ...acc, [getFormattedKey(variable[1])]: variable[0] };
  }, {});
};

export const getInitialValuesFromVariables = (variables: string[][]) => {
  return variables?.reduce((acc, variable) => {
    return { ...acc, [getFormattedKey(variable[1])]: "" };
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
    file,
    fileExtension: file?.name?.split(".")?.pop()?.toLowerCase() || "",
    fileName: file.name,
    initialValues: getInitialValuesFromVariables(variables),
    templateVariables: getTemplateVariables(variables),
    textContent,
  };
};

const handleDocxFileData = async (file: File): Promise<FileData> => {
  const initialValues: Record<string, string> = {};
  const templateVariables: Record<string, string> = {};

  const fileContent = await readFileAsBufferArryAsync(file);
  const zip = new PizZip(fileContent as LoadData);
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

  Object.keys(tags).forEach((tag) => {
    initialValues[getFormattedKey(tag)] = "";
    templateVariables[getFormattedKey(tag)] = tag;
  });

  return {
    file,
    fileExtension: file?.name?.split(".")?.pop()?.toLowerCase() || "",
    fileName: file.name,
    initialValues,
    templateVariables,
    textContent: "",
  };
};

export const getFileData = async (file: File): Promise<FileData> => {
  const fileExt = file?.name?.split(".")?.pop()?.toLowerCase() || "";
  if (fileExt === SUPPORTED_FILE_EXTENSIONS.TXT) {
    return handleTxtFileData(file);
  }
  if (fileExt === SUPPORTED_FILE_EXTENSIONS.DOCX) {
    return handleDocxFileData(file);
  }

  return {
    file,
    fileExtension: "",
    fileName: "",
    initialValues: {},
    templateVariables: {},
    textContent: "",
  };
};

export const getIdentifierLabel = (identifier: string) =>
  capitalize(identifier.replace(REGEX_SEPARATORS, " "));

export const buildFormikValidationSchema = (
  fields: string[],
  t: (key: string) => string
) => {
  const schema: Record<string, AnySchema> = {};

  fields.forEach(
    (field) =>
      (schema[field] = string().required(
        `${getIdentifierLabel(field)} ${t("requiredField")}`
      ))
  );

  return object(schema);
};

export const createNewTxtFile = (
  fileData: FileData,
  newValues: Record<string, string>
) => {
  let newTextContent = fileData.textContent;
  for (const key in fileData.templateVariables) {
    newTextContent = newTextContent.replaceAll(
      fileData.templateVariables[key],
      newValues[key]
    );
  }

  return new Blob([newTextContent], { type: "text/plain" });
};

export const createNewDocxFile = async (
  fileData: FileData,
  newValues: Record<string, string>
) => {
  const fileContent = await readFileAsBufferArryAsync(fileData.file);
  const zip = new PizZip(fileContent as LoadData);
  const doc = new Docxtemplater(zip, {
    delimiters: {
      start: "{{",
      end: "}}",
    },
    paragraphLoop: true,
    linebreaks: true,
  });

  const formattedData: Record<string, string> = Object.keys(
    fileData.initialValues
  ).reduce(
    (acc, key) => ({
      ...acc,
      [fileData.templateVariables[key]]: newValues[key],
    }),
    {}
  );

  try {
    doc.render(formattedData);
  } catch (error) {
    console.error("Error al renderizar el documento:", error);
    throw error;
  }

  // Generar el archivo como blob
  const blob = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  return blob;
};
