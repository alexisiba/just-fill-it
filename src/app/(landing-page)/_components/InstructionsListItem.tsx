import React, { ReactNode } from "react";

interface InstructionsListItemProps {
  icon: ReactNode;
  label: string;
}

export default function InstructionsListItem({
  icon,
  label,
}: InstructionsListItemProps) {
  return (
    <li className="mb-10 last:mb-0 text-2xl font-(family-name:--shadows-into-light) font-bold">
      <p className="flex flex-row ">
        {label}
        {icon}
      </p>
    </li>
  );
}
