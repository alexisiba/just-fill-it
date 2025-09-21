import Button from "@/app/_components/Button";
import Dialog from "@/app/_components/Dialog";
import Input from "@/app/_components/Input";
import { ButtonColor } from "@/app/types";
import { useFormik } from "formik";
import { ObjectSchema } from "yup";
import { getIdentifierLabel } from "./helpers";
import { FileData } from "@/app/_store/types/fileTypes";
import { useFileActions } from "@/app/_store/selectors/fileSelector";

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
  const handleFormSubmit = (values: Record<string, string>) => {
    setFileDataInitialValues(values);
    if (fileData.fileExtensions === "txt") {
      let newTextContent = fileData.textContent;
      for (const key in fileData.templateVariables) {
        newTextContent = newTextContent.replaceAll(
          fileData.templateVariables[key],
          values[key]
        );
      }
      const blob = new Blob([newTextContent], { type: "text/plain" });
      onSubmit(blob);
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
      {Object.keys(fileData?.templateVariables)?.map((identifier) => {
        const inputFormLabel = getIdentifierLabel(identifier);
        return (
          <div key={identifier} className="mb-4">
            <Input
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
