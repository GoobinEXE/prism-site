import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";

export const metadata: Metadata = {
  title: "About",
  robots: { index: false },
};

export default function SobrePage() {
  return <LegacyRedirect href="/about" labelKey="about" />;
}
