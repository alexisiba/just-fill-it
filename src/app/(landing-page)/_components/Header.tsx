import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function Header() {
  return (
    <header className="bg-white text-black flex flex-row justify-center">
      <div className="container p-8 flex flex-row items-center justify-between">
        <span className="font-bold text-3xl">JUST FILL IT!</span>
        <div className="flex flex-row gap-2">
          <AiFillLinkedin className="text-2xl" />
          <AiFillGithub className="text-2xl" />
        </div>
      </div>
    </header>
  );
}
