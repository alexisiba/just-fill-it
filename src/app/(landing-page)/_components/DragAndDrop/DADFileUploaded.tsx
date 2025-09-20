import Button from "@/app/_components/Button";
import { ButtonColor } from "@/app/types";
import { capitalize, isEmpty } from "lodash";
import { useState } from "react";
import {
  AiFillCloseCircle,
  AiFillSignature,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineFileText,
} from "react-icons/ai";
import { REGEX_SEPARATORS } from "./constants";
import { getTemplateVariables } from "./helpers";
import { useFormik } from "formik";

interface DADFileUploadedProps {
  file: File;
  onDelete: () => void;
}

export default function DADFileUploaded({
  file,
  onDelete,
}: DADFileUploadedProps) {
  const [templateVariables, setTemplateVariables] = useState<string[][]>([]);
  const [formikInitialValues, setFormikInitialValues] = useState({});
  const handleGetTemplateVariables = async (file: File) => {
    const variables = await getTemplateVariables(file);
    console.log("🚀 ~ handleGetTemplateVariables ~ variables:", variables);
    const initialValues = variables?.reduce((acc, variable) => {
      const inputFormIdentifier = variable[1].replace(REGEX_SEPARATORS, "_");
      return { ...acc, [inputFormIdentifier]: "" };
    }, {});
    console.log(
      "🚀 ~ handleGetTemplateVariables ~ initialValues:",
      initialValues
    );
    setTemplateVariables(variables || []);
    setFormikInitialValues(initialValues || {});
  };

  const formik = useFormik({
    initialValues: formikInitialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row items-center gap-2">
        <div className="relative">
          <div
            className="absolute -top-3 -left-3 cursor-pointer bg-white rounded-full"
            onClick={onDelete}
          >
            <AiFillCloseCircle className="text-3xl text-red-500" />
          </div>
          <AiOutlineFileText className="text-6xl text-black mb-2" />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-lg text-center">{file.name}</p>
          <p className="text-sm text-center text-gray-600">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      </div>
      <Button
        color={ButtonColor.success}
        icon={<AiFillSignature className="text-2xl" />}
        label="Comenzar"
        onClick={() => handleGetTemplateVariables(file)}
      />
      {!isEmpty(templateVariables) ? (
        <div className="fixed h-dvh w-dvw bg-black/50 -top-0 -left-0 flex items-center justify-center">
          <div className="bg-white rounded-md min-w-150 min-h-50">
            <div className="p-6 ">
              <p className="font-semibold">Nombre del documento</p>
            </div>
            <div className="px-6 py-2">
              {templateVariables.map((variable) => {
                const inputFormIdentifier = variable[1].replace(
                  REGEX_SEPARATORS,
                  "_"
                );
                const inputFormLabel = capitalize(
                  variable[1].replace(REGEX_SEPARATORS, " ")
                );
                return (
                  <div key={inputFormIdentifier} className="mb-4">
                    <label htmlFor={inputFormIdentifier}>
                      {inputFormLabel}
                    </label>
                    <input
                      className="rounded border border-gray-400 px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                      type="text"
                      id={inputFormIdentifier}
                      name={inputFormIdentifier}
                      onChange={formik.handleChange}
                      value={
                        (formik.values as Record<string, string>)?.[
                          inputFormIdentifier
                        ]
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-4 px-6 pb-6 pt-2 flex flex-row justify-end border-t border-gray-400 gap-4">
              <Button
                color={ButtonColor.error}
                icon={<AiOutlineCloseCircle className="text-2xl" />}
                label="Cancelar"
                onClick={() => setTemplateVariables([])}
              />
              <Button
                color={ButtonColor.success}
                icon={<AiOutlineCheckCircle className="text-2xl" />}
                label="Confirmar"
                onClick={() => formik.submitForm()}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
