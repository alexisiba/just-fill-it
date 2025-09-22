import Button from "@/app/_components/Button";
import Dialog from "@/app/_components/Dialog";
import Input from "@/app/_components/Input";
import { ButtonColor } from "@/app/types";
import { useFormik } from "formik";
import { ObjectSchema } from "yup";
import {
  createNewDocxFile,
  createNewTxtFile,
  getIdentifierLabel,
} from "./helpers";
import { FileData } from "@/app/_store/types/fileTypes";
import { useFileActions } from "@/app/_store/selectors/fileSelector";
import { SUPPORTED_FILE_EXTENSIONS } from "./constants";
import { useEffect, useRef } from "react";

interface DADFormDialogProp {
  fileName: string;
  fileData: FileData;
  initialValues: Record<string, string>;
  isOpen: boolean;
  validationSchema: ObjectSchema<Record<string, string>>;
  onClose: () => void;
  onSubmit: (blobFile: Blob) => void;
}

export default function DADFormDialog({
  fileName,
  fileData,
  initialValues,
  isOpen,
  validationSchema,
  onClose,
  onSubmit,
}: DADFormDialogProp) {
  const { setFileDataInitialValues } = useFileActions();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleFormSubmit = async (values: Record<string, string>) => {
    const { fileExtension } = fileData;
    setFileDataInitialValues(values);
    if (fileExtension === SUPPORTED_FILE_EXTENSIONS.TXT) {
      const newFile = createNewTxtFile(fileData, values);
      onSubmit(newFile);
      return;
    }
    if (
      [SUPPORTED_FILE_EXTENSIONS.DOC, SUPPORTED_FILE_EXTENSIONS.DOCX].includes(
        fileExtension
      )
    ) {
      const newFile = await createNewDocxFile(fileData, values);
      onSubmit(newFile);
      return;
    }
    onSubmit(new Blob());
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  return (
    <Dialog
      title={fileName}
      subtitle="Completa los siguientes campos para generar tu documento"
      open={isOpen}
      onClose={onClose}
      footer={
        <div className="flex flex-row gap-4 justify-end">
          <Button
            color={ButtonColor.primary}
            label="Cancelar"
            onClick={onClose}
          />
          <Button
            color={ButtonColor.success}
            label="Aplicar Cambios"
            onClick={() => formik.submitForm()}
          />
        </div>
      }
    >
      {Object.keys(fileData?.initialValues)?.map((identifier, idx) => {
        const inputFormLabel = getIdentifierLabel(identifier);
        return (
          <div key={identifier} className="mb-4">
            <Input
              ref={idx === 0 ? inputRef : undefined}
              error={
                formik.touched[identifier]
                  ? formik.errors[identifier]
                  : undefined
              }
              required
              placeholder="Escribe Aquí..."
              label={inputFormLabel}
              id={identifier}
              name={identifier}
              onBlur={(event) => formik.handleBlur(event)}
              onChange={formik.handleChange}
              value={(formik.values as Record<string, string>)?.[identifier]}
            />
          </div>
        );
      })}
    </Dialog>
  );
}
