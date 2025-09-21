import Button from "@/app/_components/Button";
import {
  useFileActions,
  useFileData,
  useFileToDownload,
} from "@/app/_store/selectors/fileSelector";
import { ButtonColor } from "@/app/types";
import { saveAs } from "@/app/utils/helpers";
import {
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineHome,
} from "react-icons/ai";
import DADFormDialog from "./DADFormDialog";
import { FileData } from "@/app/_store/types/fileTypes";
import { useEffect, useState } from "react";
import { buildFormikValidationSchema } from "./helpers";
import { isEmpty } from "lodash";

export default function DADFileDownload() {
  const fileData = useFileData();
  const fileToDownload = useFileToDownload();
  const { resetAll, setFileToDownload } = useFileActions();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const handleDownload = () =>
    saveAs(fileToDownload as Blob, fileData?.fileName as string);
  const handleOpenDialog = () => setIsFormDialogOpen(true);
  const handleCloseDialog = () => setIsFormDialogOpen(false);
  const handleFormSubmit = (file: Blob) => {
    setFileToDownload(file);
    handleCloseDialog();
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h3 className="text-3xl max-w-100 text-center font-bold">
        Tu documento esta listo!
      </h3>
      <p className="max-w-100 text-center">
        Tu archivo ha sido actualizado correctamente y esta listo para descargar
      </p>
      <div className="flex flex-col gap-2">
        <Button
          color={ButtonColor.info}
          icon={<AiOutlineDownload className="text-2xl" />}
          className="w-full"
          label="Descargar documento"
          onClick={handleDownload}
        />
        <div className="flex flex-row gap-4">
          <Button
            icon={<AiOutlineEdit className="text-2xl" />}
            label="Editar documento"
            onClick={handleOpenDialog}
          />
          <Button
            icon={<AiOutlineHome className="text-2xl" />}
            label="Comenzar de nuevo"
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
            Object.keys(fileData?.initialValues as Record<string, string>)
          )}
          onClose={handleCloseDialog}
          onSubmit={handleFormSubmit}
        />
      ) : null}
    </div>
  );
}
