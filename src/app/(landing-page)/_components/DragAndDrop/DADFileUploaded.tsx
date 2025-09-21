import Button from "@/app/_components/Button";
import {
  useFileActions,
  useFileData,
} from "@/app/_store/selectors/fileSelector";
import { ButtonColor } from "@/app/types";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { AiFillEdit, AiOutlineFileText, AiOutlineSwap } from "react-icons/ai";
import { ObjectSchema } from "yup";
import DADFormDialog from "./DADFormDialog";
import {
  buildFormikValidationSchema,
  getFileData,
  getFileSizeInMB,
} from "./helpers";

interface DADFileUploadedProps {
  file: File;
  onDelete: () => void;
}

export default function DADFileUploaded({
  file,
  onDelete,
}: DADFileUploadedProps) {
  const fileData = useFileData();
  const { setFileData, setFileToDownload, setFileDataInitialValues } =
    useFileActions();
  const [validationSchema, setValidationSchema] = useState<ObjectSchema<
    Record<string, string>
  > | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const handleGetFileData = useCallback(
    async (file: File) => {
      const data = await getFileData(file);
      if (!data) return;
      setFileDataInitialValues(data.initialValues || {});
      setValidationSchema(
        buildFormikValidationSchema(Object.keys(data.initialValues))
      );
      setFileData(data);
    },
    [setFileData, setFileDataInitialValues]
  );
  const handleOpenDialog = () => setIsFormDialogOpen(true);
  const handleCloseDialog = () => setIsFormDialogOpen(false);
  const handleFormSubmit = (file: Blob) => setFileToDownload(file);

  useEffect(() => {
    handleGetFileData(file);
  }, [file, handleGetFileData]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col items-center justify-center">
          <AiOutlineFileText className="text-6xl mb-2 text-blue-400" />
          <p className="text-lg text-center font-bold">{file.name}</p>
          <p className="text-sm text-center text-gray-600">
            ({getFileSizeInMB(file)} MB)
          </p>
          <p className="mt-2 font-light">El archivo se subio correctamente</p>
        </div>
      </div>
      <Button
        color={ButtonColor.success}
        icon={<AiFillEdit className="text-2xl" />}
        label="Llenar plantilla"
        onClick={handleOpenDialog}
        className="max-w-150 w-full"
      />
      <Button
        color={ButtonColor.primary}
        icon={<AiOutlineSwap className="text-2xl" />}
        label="Reemplazar archivo"
        onClick={onDelete}
        className="max-w-150 w-full"
      />
      {!isEmpty(fileData) ? (
        <DADFormDialog
          fileName={file.name}
          fileData={fileData}
          initialValues={fileData.initialValues}
          isOpen={isFormDialogOpen}
          validationSchema={
            validationSchema as ObjectSchema<Record<string, string>>
          }
          onClose={handleCloseDialog}
          onSubmit={handleFormSubmit}
        />
      ) : null}
    </div>
  );
}
