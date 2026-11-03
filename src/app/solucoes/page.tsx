import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";

export const metadata: Metadata = {
  title: "Work",
  robots: { index: false },
};

export default function SolucoesPage() {
  return <LegacyRedirect href="/work" labelKey="work" />;
}
