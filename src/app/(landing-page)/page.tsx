import {
  MdCloudUpload,
  MdEditDocument,
  MdFileDownload,
  MdFileUpload,
} from "react-icons/md";
import Header from "./_components/Header";
import InstructionsListItem from "./_components/InstructionsListItem";
import Footer from "./_components/Footer";
import Main from "./_components/Main";
import DragAndDrop from "./_components/DragAndDrop";

export default function Home() {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <div className="flex flex-col justify-center items-center grow-1 bg-white text-black">
        <Main />
        <div className="container flex flex-2 justify-center">
          <div className="grid grid-cols-5 gap-4 w-full max-w-250 max-h-100 h-full">
            <ol className="list-decimal col-span-2 flex flex-col items-center justify-center">
              <InstructionsListItem
                icon={<MdFileUpload className="text-3xl ml-2" />}
                label="Sube tu archivo"
              />
              <InstructionsListItem
                icon={<MdEditDocument className="text-3xl ml-2" />}
                label="Llena el formulario"
              />
              <InstructionsListItem
                icon={<MdFileDownload className="text-3xl ml-2" />}
                label="Descarga tu documento"
              />
            </ol>
            <DragAndDrop />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
