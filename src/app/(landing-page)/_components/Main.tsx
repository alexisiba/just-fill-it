import React from "react";

export default function Main() {
  return (
    <main className="container flex flex-1 justify-center items-center mb-20 flex flex-col items-center">
      <h1 className="text-4xl mb-2 font-bold mb-3">
        Carga, rellena y descarga tus plantillas en segundos
      </h1>
      <div className="text-center max-w-200">
        <p className="mb-5">
          Para que el formulario se genere correctamente los espacios a rellenar
          de tus plantillas deben de estar rodeadas por llaves dobles {"{{}}"}.
          Por ejemplo:
        </p>
        <pre className="mb-5">
          <code className="px-3 py-1 rounded-sm bg-gray-200">
            Yo {"{{Nombre Completo}}"} Estoy de acuerdo en...
          </code>
        </pre>
        <p>
          El texto que coloques dentro de estas llaves se utilizara para darle
          nombre a los elementos del formulario y que los puedas ubicar
          fácilmente para su llenado
        </p>
      </div>
    </main>
  );
}
