import { AiOutlineClose } from "react-icons/ai";

interface DialogProps {
  open: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  subtitle?: string;
  title?: string;
  onClose?: () => void;
}

export default function Dialog({
  footer,
  children,
  open,
  subtitle,
  title,
  onClose,
}: DialogProps) {
  return (
    <div
      className={`fixed h-dvh w-dvw bg-black/50 -top-0 -left-0 flex items-center justify-center transition transition-duration-300 transition-ease-in-out ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-white rounded-md min-w-150 min-h-50 relative">
        <div
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </div>
        <div className="mb-6 px-8 pt-8">
          {title ? <p className="text-3xl font-bold">{title}</p> : null}
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <div className="px-8 mb-4">{children}</div>
        {footer ? (
          <div className="mt-4 px-6 pb-6 pt-2 justify-end border-t border-gray-300 gap-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
