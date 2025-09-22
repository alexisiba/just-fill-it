import { ReactNode } from "react";
import { ButtonColor } from "../types";
import "../globals.css";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  color?: ButtonColor;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  label?: string;
}

export default function Button({
  className,
  color,
  disabled,
  icon,
  iconPosition = "left",
  label,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-sm cursor-pointer p-3 transition-colors mt-2 disabled:bg-gray-400/60 disabled:text-gray-500 ${
        color ?? ButtonColor.primary
      } ${className ?? ""}`}
    >
      <span className="flex flex-row items-center justify-center gap-2 font-bold">
        {icon && iconPosition === "left" && icon}
        {label ? <span>{label}</span> : null}
        {icon && iconPosition === "right" && icon}
      </span>
    </button>
  );
}
