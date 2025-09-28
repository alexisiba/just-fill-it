import DragAndDrop from "./_components/DragAndDrop";
import Main from "./_components/Main";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center grow-1 bg-white text-black">
      <Main />
      <DragAndDrop />
    </div>
  );
}
