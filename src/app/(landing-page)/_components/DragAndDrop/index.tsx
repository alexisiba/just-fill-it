"use client";

import {
  useFile,
  useFileActions,
  useFileToDownload,
} from "@/app/_store/selectors/fileSelector";
import { isEmpty } from "lodash";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import DADFileDownload from "./DADFileDownload";
import DADFileUploaded from "./DADFileUploaded";
import DADInput from "./DADInput";
import { checkForFileErros } from "./helpers";
import { DragAndDropErrors } from "./types";

export default function DragAndDrop() {
  const file = useFile();
  const fileToDownload = useFileToDownload();
  const { addFile, resetAll } = useFileActions();
  const [errors, setErrors] = useState<DragAndDropErrors>({});
  const fileButtonRef = useRef<HTMLInputElement | null>(null);

  const handleDragAndDropContainerClick = () => fileButtonRef.current?.click();
  const handleFileUpload = (file: File) => {
    const errors = checkForFileErros(file);

    if (!isEmpty(errors)) {
      setErrors(errors);
      return;
    }

    addFile(file as File);
    setErrors({});
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] as File;
    handleFileUpload(file);
  };
  const handleDragOver = (event: DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
  };
  const handleDrop = (event: DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event?.dataTransfer?.files?.[0];
    handleFileUpload(file);
  };

  return (
    <div
      onClick={handleDragAndDropContainerClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`col-span-3 rounded-md p-2  transition-colors max-w-200 w-full max-h-100 h-full
        ${
          !file &&
          "bg-blue-100 hover:bg-blue-200 cursor-pointer shadow-[0_0_20px_1px] shadow-blue-300"
        }
        ${
          !isEmpty(errors) &&
          "bg-red-50 border-red-300 border-2 shadow-[0_0_20px_1px] shadow-red-300"
        }
        ${
          file &&
          "bg-green-50 border-green-300 border-2 shadow-[0_0_20px_1px] shadow-green-300"
        }
      `}
    >
      <div
        className={`border border-dashed rounded-md w-full h-full flex items-center justify-center
          ${!file && "border-black/30"}
          ${!isEmpty(errors) && "border-red-500"}
          ${file && "border-green-500"}
        `}
      >
        {!file ? (
          <DADInput
            errors={errors}
            ref={fileButtonRef}
            handleInputChange={handleInputChange}
          />
        ) : null}
        {file && !fileToDownload ? (
          <DADFileUploaded file={file} onDelete={() => resetAll()} />
        ) : null}
        {fileToDownload ? <DADFileDownload /> : null}
      </div>
    </div>
  );
}
