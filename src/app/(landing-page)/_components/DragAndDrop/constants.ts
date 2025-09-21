export const SUPPORTED_FILE_EXTENSIONS = {
  DOC: "doc",
  DOCX: "docx",
  ODT: "odt",
  RTF: "rtf",
  TXT: "txt",
};
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const REGEX_TEMPLATE_VARIABLE = /{{(.*?)}}/g;
export const REGEX_SEPARATORS = /[-_.\s]+/g;
