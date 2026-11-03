import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";

export const metadata: Metadata = {
  title: "Behind Prism",
  robots: { index: false },
};

export default function PorTrasDoPrismPage() {
  return <LegacyRedirect href="/behind-prism" labelKey="behindPrism" />;
}
