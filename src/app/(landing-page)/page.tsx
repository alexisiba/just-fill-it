import DragAndDrop from "./_components/DragAndDrop";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Main from "./_components/Main";

export default function Home() {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <div className="flex flex-col justify-center items-center grow-1 bg-white text-black">
        <Main />
        <DragAndDrop />
      </div>
      <Footer />
    </div>
  );
}
