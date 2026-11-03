import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";

export const metadata: Metadata = {
  title: "Contact",
  robots: { index: false },
};

export default function ContatoPage() {
  return <LegacyRedirect href="/contact" labelKey="contact" />;
}
