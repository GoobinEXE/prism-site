import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";
import { legacyMeta } from "@/lib/seo";

export const metadata: Metadata = legacyMeta("Behind Prism", "/behind-prism");

export default function PorTrasDoPrismPage() {
  return <LegacyRedirect href="/behind-prism" labelKey="behindPrism" />;
}
