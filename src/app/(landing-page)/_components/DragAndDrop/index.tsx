"use client";

import { isEmpty } from "lodash";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import DADInput from "./DADInput";
import { checkForFileErros } from "./helpers";
import { DragAndDropErrors } from "./types";
import DADFileUploaded from "./DADFileUploaded";

export default function DragAndDrop() {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<DragAndDropErrors>({});
  const fileButtonRef = useRef<HTMLInputElement | null>(null);

  const handleDragAndDropContainerClick = () => fileButtonRef.current?.click();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    setFile(file || null);
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
    const errors = checkForFileErros(file);

    if (!isEmpty(errors)) {
      setErrors(errors);
      return;
    }

    setFile(file || null);
    setErrors({});
  };

  return (
    <div
      onClick={handleDragAndDropContainerClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`col-span-3 rounded-md p-2 shadow-xl transition-colors 
        ${!file && "bg-blue-100 hover:bg-blue-200 cursor-pointer"}
        ${!isEmpty(errors) && "bg-red-50 border-red-500 border-2"}
        ${file && "bg-green-100 border-green-500 border-2"}
      `}
    >
      <div
        className={`border border-dashed border-2 rounded-md w-full h-full flex items-center justify-center
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
        ) : (
          <DADFileUploaded file={file} onDelete={() => setFile(null)} />
        )}
      </div>
    </div>
  );
}
