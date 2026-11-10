import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";
import { legacyMeta } from "@/lib/seo";

export const metadata: Metadata = legacyMeta("Work", "/work");

export default function SolucoesPage() {
  return <LegacyRedirect href="/work" labelKey="work" />;
}
