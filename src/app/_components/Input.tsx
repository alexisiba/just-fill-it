import { ChangeEvent, FocusEvent } from "react";

interface InputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number | readonly string[];
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export default function Input({
  error,
  id,
  label,
  name,
  placeholder,
  required,
  value,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <div>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        placeholder={placeholder}
        required={required}
        className="rounded-md border border-gray-300 px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 mt-2"
        type="text"
        id={id}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {error ? <span className="text-(--error)">{error}</span> : null}
    </div>
  );
}
