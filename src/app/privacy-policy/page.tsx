import React from "react";
import ExternalLink from "../_components/ExternalLink";

export default function page() {
  return (
    <div className="p-4 bg-white text-black">
      <h1 className="mb-2">Política de Privacidad</h1>
      <p className="mb-2">
        En <strong>Just Fill It!</strong> nos comprometemos a proteger la
        privacidad y la información de nuestros usuarios. La presente Política
        de Privacidad describe de manera clara y transparente cómo se gestionan
        los documentos y datos que se procesan a través de nuestra plataforma.
      </p>
      <nav className="mb-2">
        <ul>
          <li>
            <ExternalLink href="#procesamiento">
              1. Procesamiento de documentos
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="#conversion">
              2. Conversión de documentos a PDF
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="#uso">3. Uso de la información</ExternalLink>
          </li>
          <li>
            <ExternalLink href="#datos-personales">
              4. Datos personales
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="#seguridad">5. Seguridad</ExternalLink>
          </li>
          <li>
            <ExternalLink href="#derechos">
              6. Derechos del usuario
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="#open-source">
              7. Proyecto Open Source
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="#cambios">
              8. Cambios en la política
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="#contacto">Contacto</ExternalLink>
          </li>
        </ul>
      </nav>

      <section className="mb-2 scroll-mt-20" id="procesamiento">
        <h2>1. Procesamiento de documentos</h2>
        <p>
          Todos los documentos que los usuarios cargan en la plataforma se
          procesan{" "}
          <strong>
            exclusivamente de forma local en el navegador del usuario (lado del
            cliente)
          </strong>
          . Esto significa que, salvo en los casos expresamente señalados en
          esta política, el contenido de los documentos{" "}
          <strong>
            no se transmite, almacena ni procesa en nuestros servidores
          </strong>
          .
        </p>
      </section>

      <section className="mb-2 scroll-mt-20" id="conversion">
        <h2>2. Conversión de documentos a PDF</h2>
        <p>
          La única excepción al punto anterior ocurre cuando el usuario solicita
          la conversión de un archivo en formato <strong>.docx a .pdf</strong>.
          Para realizar este servicio, el documento es enviado temporalmente a
          nuestros servidores con el único fin de efectuar la conversión
          solicitada. Una vez completado el proceso, el archivo convertido se
          entrega al usuario y{" "}
          <strong>
            no se almacena, guarda ni conserva ninguna copia en nuestros
            sistemas
          </strong>
          .
        </p>
      </section>

      <section className="mb-2 scroll-mt-2" id="uso">
        <h2>3. Uso de la información</h2>
        <p>
          Los documentos subidos por los usuarios no son utilizados con fines
          distintos a los indicados en la presente política.{" "}
          <strong>No compartimos, vendemos ni cedemos</strong> a terceros los
          documentos ni la información que contengan. No realizamos análisis,
          indexación ni ningún otro tipo de procesamiento con fines de
          explotación comercial de los contenidos de los documentos.
        </p>
      </section>

      <section className="mb-2 scroll-mt-2" id="datos-personales">
        <h2>4. Datos personales</h2>
        <p>
          Nuestra plataforma no solicita ni conserva datos personales distintos
          de los que los propios usuarios decidan incluir en sus documentos o
          plantillas. La responsabilidad sobre el contenido de los documentos
          recae exclusivamente en el usuario que los carga.
        </p>
      </section>

      <section className="mb-2 scroll-mt-2" id="seguridad">
        <h2>5. Seguridad</h2>
        <p>
          Hemos implementado medidas técnicas y organizativas razonables para
          garantizar que los documentos procesados localmente en el navegador no
          sean accesibles por terceros ni transmitidos sin necesidad. En los
          casos de conversión a PDF, la transferencia del archivo se realiza
          mediante canales seguros, y el documento se elimina de forma
          automática una vez completado el servicio.
        </p>
      </section>

      <section className="mb-2 scroll-mt-2" id="derechos">
        <h2>6. Derechos del usuario</h2>
        <p>
          El usuario tiene derecho a solicitar información adicional,
          aclaraciones o ejercer cualquier derecho relacionado con la protección
          de datos conforme a la normativa aplicable. Para ello, podrá
          comunicarse con nosotros en cualquier momento a través del correo
          indicado en la sección de contacto.
        </p>
      </section>

      <section className="mb-2 scroll-mt-2" id="open-source">
        <h2>7. Proyecto de código abierto (Open Source)</h2>
        <p>
          Este proyecto es de carácter <strong>open source</strong>. El código
          fuente se encuentra disponible públicamente en GitHub en el siguiente
          enlace:{" "}
          <ExternalLink 
            href="https://github.com/alexisiba/just-fill-it"
            target="_blank"
            rel="noopener noreferrer">
            
            https://github.com/alexisiba/just-fill-it
          </ExternalLink>
          . Los usuarios que deseen contribuir con mejoras, correcciones o
          nuevas funcionalidades son bienvenidos a hacerlo mediante dicho
          repositorio. Las contribuciones se regirán por las licencias y
          lineamientos establecidos en el propio repositorio.
        </p>
      </section>

      <section className="mb-2 scroll-mt-2" id="cambios">
        <h2>8. Cambios en la política</h2>
        <p>
          Nos reservamos el derecho de actualizar o modificar la presente
          Política de Privacidad en cualquier momento. Cualquier cambio será
          publicado en esta misma página y, en caso de ser significativo, se
          informará a los usuarios de manera destacada.
        </p>
      </section>

      <section className="mb-2 scroll-mt-2" id="contacto">
        <h2>Contacto</h2>
        <p>
          Si necesita información adicional, desea realizar una consulta o
          ejercer derechos relacionados con sus datos, por favor contáctenos en:{" "}
          <a href="mailto:contacto@email.com">contacto@email.com</a>.
        </p>
      </section>
    </div>
  );
}
