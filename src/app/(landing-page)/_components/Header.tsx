import { APP_NAME } from "@/app/constants";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white text-black flex flex-row justify-center shadow-md bg-opacity-90 sticky top-0">
      <div className="container p-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Next.js logo"
            width={50}
            height={50}
            priority
          />
          <span className="font-bold text-3xl">{APP_NAME}</span>
        </div>
        <div className="flex flex-row gap-4">
          <a
            href="https://linkedin.com/in/alexisiba"
            target="_blank"
            className="font-bold text-gray-700 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/alexisiba"
            target="_blank"
            className="font-bold text-gray-700 hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
