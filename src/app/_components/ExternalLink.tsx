import { ReactNode } from "react";

interface ExternalLinkProps {
  children: ReactNode;
  href: string;
  rel?: string;
  target?: "_blank" | "_parent" | "self" | "_top";
}

export default function ExternalLink({
  children,
  href,
  rel,
  target,
}: ExternalLinkProps) {
  return (
    <a
      className="text-blue-600 hover:underline visited:text-purple-900"
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
