import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="flex flex-row justify-center">
      <div className="container flex flex-row justify-between p-8">
        <div className="flex flex-row items-center gap-2">
          <span >Sigueme en:</span>
          <AiFillLinkedin className="text-2xl" />
          <AiFillGithub className="text-2xl" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <span>contacto@email.com</span>
        </div>
        <div>
            <span>Política de privacidad</span>
        </div>
      </div>
    </div>
  );
}
