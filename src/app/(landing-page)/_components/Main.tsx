import React from "react";

export default function Main() {
  return (
    <main className="container flex justify-center items-center mb-20 flex flex-col items-center">
      <h1 className="text-5xl mb-2 font-bold mb-3">
        Llena formularios facil y rápido
      </h1>
      <div className="text-center max-w-150 text-lg">
        <p className="mb-5">
          Sube tu plantilla, llena los campos del formulario y descarga tu
          documento listo para usar. Es así de fácil.
        </p>
        <p className="mb-2">
          Las variables en tu plantilla deben ir entre llaves dobles, por
          ejemplo:
        </p>
        <pre className="mb-5">
          <code className="px-3 py-1 rounded-sm bg-gray-200">
            Yo {"{{Nombre Completo}}"} Estoy de acuerdo en...
          </code>
        </pre>
      </div>
    </main>
  );
}
