"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";

export function ContactFab() {
  const pathname = usePathname();
  const { t } = useLocale();
  if (pathname === "/contact") return null;

  return (
    <Link
      href="/contact"
      className="contact-fab"
      aria-label={t.fab.aria}
      title={t.fab.title}
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
