import React from "react";

export default function Main() {
  return (
    <main className="container flex justify-center items-center mb-10  flex-col p-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-3 text-center">
        Llena formularios facil y rápido
      </h1>
      <div className="text-center max-w-150">
        <p className="mb-5">
          Sube tu plantilla, llena los campos del formulario y descarga tu
          documento listo para usar. Es así de fácil.
        </p>
        <p className="mb-2">
          Las variables en tu plantilla deben ir entre llaves dobles, por
          ejemplo:
        </p>
        <pre className="mb-5">
          <code className="px-3 py-1 rounded-sm bg-gray-200 whitespace-break-spaces">
            {"{{Nombre Completo}}"}
          </code>
        </pre>
      </div>
    </main>
  );
}
