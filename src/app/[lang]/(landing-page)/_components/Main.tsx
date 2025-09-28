import { useTranslations } from "next-intl";

export default function Main() {
  const t = useTranslations("pages");
  return (
    <main className="container flex justify-center items-center mb-10  flex-col p-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-3 text-center">
        {t("main.fillForms")}
      </h1>
      <div className="text-center max-w-150">
        <p className="mb-5">{t("main.uploadYourTemplates")}</p>
        <p className="mb-2">{t("main.setVariables")}</p>
        <pre className="mb-5">
          <code className="px-3 py-1 rounded-sm bg-gray-200 whitespace-break-spaces">
            {`{{${t("main.exampleVariable")}}}`}
          </code>
        </pre>
      </div>
    </main>
  );
}
