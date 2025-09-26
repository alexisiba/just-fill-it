import Link from "next/link";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="flex justify-center bg-white text-black border-t border-gray-400">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 p-8">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <span>Sigueme en:</span>
          <div className="flex flex-row itemx-center gap-2">
            <AiFillLinkedin className="text-2xl" />
            <AiFillGithub className="text-2xl" />
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <span>contacto@email.com</span>
        </div>
        <div>
          <Link className="underline" href="/privacy-policy">
            Política de privacidad
          </Link>
        </div>
      </div>
    </div>
  );
}
