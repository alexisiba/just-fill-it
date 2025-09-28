import React, { ChangeEvent, RefObject, useEffect, useRef } from "react";
import {
  AiFillFolderOpen,
  AiOutlineCloudUpload,
  AiOutlineWarning,
} from "react-icons/ai";
import { MAX_FILE_SIZE_MB } from "./constants";
import { DragAndDropErrors } from "./types";
import Button from "@/app/_components/Button";
import { ButtonColor } from "@/app/types";
import { getSupportedFileExtensionsWithDots } from "@/app/utils/helpers";
import { useTranslations } from "use-intl";

interface DADInputProps {
  errors?: DragAndDropErrors;
  ref: RefObject<HTMLInputElement | null>;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function DADInput({
  errors,
  ref,
  handleInputChange,
}: DADInputProps) {
  const dragAndDropZoneRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("pages");
  const buttonsT = useTranslations("buttons");
  const handleButtonClick = () => ref.current?.click();

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      if (
        !dragAndDropZoneRef.current ||
        !dragAndDropZoneRef.current?.contains(e.target as Node)
      ) {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = "none";
      }
    };

    window.addEventListener("dragover", handleDragOver);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
    };
  }, []);

  return (
    <div
      ref={dragAndDropZoneRef}
      className="flex flex-col items-center justify-center w-full h-full p-4"
    >
      <AiOutlineCloudUpload className="text-7xl text-gray-400" />
      <p>{t("dragAndDrop.dragYourFilesHere")}</p>
      <p>o</p>
      <Button
        label={buttonsT("searchFile")}
        icon={<AiFillFolderOpen className="text-2xl" />}
        color={ButtonColor.info}
        onClick={handleButtonClick}
      />
      <div className="flex flex-col items-center justify-center mt-5 text-center max-w-md">
        {errors?.fileSizeError ? (
          <span className="flex flex-row gap-1 items-start text-(--error)">
            <AiOutlineWarning className="mt-1" />
            {errors.fileSizeError}
          </span>
        ) : (
          <span>
            {t("main.maxFileSize")} <b>{MAX_FILE_SIZE_MB} MB</b>
          </span>
        )}
        {errors?.fileTypeError ? (
          <span className="flex flex-row gap-1 items-start text-(--error)">
            <AiOutlineWarning className="mt-1" />
            {errors.fileTypeError}
          </span>
        ) : (
          <span>
            {t("main.supportedFileTypes")}
            <b> {getSupportedFileExtensionsWithDots().join(", ")}</b>
          </span>
        )}
      </div>
      <input
        accept={getSupportedFileExtensionsWithDots().join(",")}
        ref={ref}
        id="file-upload"
        onChange={handleInputChange}
        type="file"
        style={{ display: "none" }}
      />
    </div>
  );
}
