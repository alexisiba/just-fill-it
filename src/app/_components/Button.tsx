import { ReactNode } from "react";
import { ButtonColor } from "../types";
import "../globals.css";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  color?: ButtonColor;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  label?: string;
}

export default function Button({
  color,
  icon,
  iconPosition = "left",
  label,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-sm cursor-pointer p-3 transition-colors mt-2 ${
        color ?? ButtonColor.primary
      } ${className ?? ""}`}
    >
      <span className="flex flex-row items-center justify-center gap-2 font-bold">
        {icon && iconPosition === "left" && icon}
        <span>{label}</span>
        {icon && iconPosition === "right" && icon}
      </span>
    </button>
  );
}
