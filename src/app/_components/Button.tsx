import { ReactNode } from "react";
import { ButtonColor } from "../types";
import "../globals.css";

interface ButtonProps {
  onClick: () => void;
  color?: ButtonColor;
  icon?: ReactNode;
  label?: string;
}

export default function Button({ color, icon, label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-sm cursor-pointer text-white p-3 ${
        color ?? ButtonColor.primary
      } transition-colors mt-2`}
    >
      <span className="flex flex-row items-center justify-center gap-2 font-bold">
        <span>{label}</span>
        {icon}
      </span>
    </button>
  );
}
