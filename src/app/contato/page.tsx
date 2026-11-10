import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";
import { legacyMeta } from "@/lib/seo";

export const metadata: Metadata = legacyMeta("Contact", "/contact");

export default function ContatoPage() {
  return <LegacyRedirect href="/contact" labelKey="contact" />;
}
