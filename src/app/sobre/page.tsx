import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";
import { legacyMeta } from "@/lib/seo";

export const metadata: Metadata = legacyMeta("About", "/about");

export default function SobrePage() {
  return <LegacyRedirect href="/about" labelKey="about" />;
}
