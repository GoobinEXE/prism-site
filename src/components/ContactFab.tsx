"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ContactFab() {
  const pathname = usePathname();
  if (pathname === "/contato") return null;

  return (
    <Link
      href="/contato"
      className="contact-fab"
      aria-label="Abrir página de contato"
      title="Contato rápido"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    </Link>
  );
}
