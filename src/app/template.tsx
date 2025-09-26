import { ReactNode } from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
