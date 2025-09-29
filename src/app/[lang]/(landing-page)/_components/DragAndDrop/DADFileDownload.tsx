import Button from "@/app/_components/Button";
import {
  useFileActions,
  useFileData,
  useFileToDownload,
} from "@/app/_store/selectors/fileSelector";
import { FileData } from "@/app/_store/types/fileTypes";
import { ButtonColor } from "@/app/types";
import { readFileAsTextAsync, saveAs } from "@/app/utils/helpers";
import jsPDF from "jspdf";
import { isEmpty } from "lodash";
import { useState } from "react";
import {
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineFilePdf,
  AiOutlineHome,
  AiOutlineLoading,
} from "react-icons/ai";
import { SUPPORTED_FILE_EXTENSIONS } from "./constants";
import DADFormDialog from "./DADFormDialog";
import { buildFormikValidationSchema } from "./helpers";
import { useTranslations } from "next-intl";

export default function DADFileDownload() {
  const [isLoading, setIsLoading] = useState(false);
  const fileData = useFileData();
  const fileToDownload = useFileToDownload();
  const { resetAll, setFileToDownload } = useFileActions();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const t = useTranslations("pages");
  const buttonsT = useTranslations("buttons");
  const schemasT = useTranslations("schemas");
  const alertsT = useTranslations("alerts");

  const handleDownload = () =>
    saveAs(fileToDownload as Blob, fileData?.fileName as string);
  const handleOpenDialog = () => setIsFormDialogOpen(true);
  const handleCloseDialog = () => setIsFormDialogOpen(false);
  const handleFormSubmit = (file: Blob) => {
    setFileToDownload(file);
    handleCloseDialog();
  };

  const downloadPdfFile = async () => {
    const formData = new FormData();
    formData.append("file", fileToDownload as Blob, fileData?.fileName);
    const res = await fetch("/api/convert", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const blob = await res.blob();
      saveAs(blob, fileData?.fileName as string);
    } else {
      alert(alertsT("error.downloadPdfError"));
    }
  };

  const downloadTxtToPdfFile = async () => {
    const fileContent = await readFileAsTextAsync(fileToDownload as Blob);
    const doc = new jsPDF();
    const lines = (fileContent?.split("\n") ?? []) as string[];
    let y = 10;

    lines.forEach((line) => {
      doc.text(line, 10, y);
      y += 10;
      // Agregar nueva página si se llega al final
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save(fileData?.fileName.replace(/\.docx$/i, ".pdf"));
  };

  const handlePdfFileDownload = async () => {
    setIsLoading(true);

    switch (fileData?.fileExtension) {
      case SUPPORTED_FILE_EXTENSIONS.TXT:
        downloadTxtToPdfFile();
        break;
      case SUPPORTED_FILE_EXTENSIONS.DOCX:
      case SUPPORTED_FILE_EXTENSIONS.ODT:
        await downloadPdfFile();
        break;

      default:
        break; // Do nothing
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h3 className="text-3xl max-w-100 text-center font-bold">
        {t("dragAndDrop.yourFileIsReady")}
      </h3>
      <p className="max-w-100 text-center">
        {t("dragAndDrop.yourFileHasBeenUpdated")}
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Button
            disabled={isLoading}
            color={ButtonColor.info}
            icon={<AiOutlineDownload className="text-2xl" />}
            className="w-full"
            label={buttonsT("downloadDocument")}
            onClick={handleDownload}
          />
          <Button
            disabled={isLoading}
            color={ButtonColor.success}
            icon={
              isLoading ? (
                <AiOutlineLoading className="text-2xl animate-spin" />
              ) : (
                <AiOutlineFilePdf className="text-2xl" />
              )
            }
            onClick={handlePdfFileDownload}
          />
        </div>
        <div className="flex flex-row gap-4">
          <Button
            disabled={isLoading}
            icon={<AiOutlineEdit className="text-2xl" />}
            label={buttonsT("editDocument")}
            onClick={handleOpenDialog}
          />
          <Button
            disabled={isLoading}
            icon={<AiOutlineHome className="text-2xl" />}
            label={buttonsT("startOver")}
            onClick={resetAll}
          />
        </div>
      </div>
      {!isEmpty(fileData) ? (
        <DADFormDialog
          fileName={fileData?.fileName as string}
          fileData={fileData as FileData}
          initialValues={fileData?.initialValues as Record<string, string>}
          isOpen={isFormDialogOpen}
          validationSchema={buildFormikValidationSchema(
            Object.keys(fileData?.initialValues as Record<string, string>),
            schemasT
          )}
          onClose={handleCloseDialog}
          onSubmit={handleFormSubmit}
        />
      ) : null}
    </div>
  );
}
