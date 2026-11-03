import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";

export const metadata: Metadata = {
  title: "CV",
  robots: { index: false },
};

export default function CurriculoPage() {
  return <LegacyRedirect href="/behind-prism#cv" labelKey="behindPrism" />;
}
