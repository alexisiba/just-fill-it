import React from "react";
import { MdCloudUpload } from "react-icons/md";

export default function DragAndDrop() {
  return (
    <div className="col-span-3 bg-blue-100 rounded-md p-2 cursor-pointer shadow-xl hover:bg-blue-200 transition-colors">
      <div className="border border-black border-dashed rounded-md flex flex-col items-center justify-center text-base/10 w-full h-full">
        <MdCloudUpload className="text-7xl text-gray-400" />
        <p>Arrastra tu documento aquí</p>
        <p>o</p>
        <button>Buscar tu archivo</button>
      </div>
    </div>
  );
}
