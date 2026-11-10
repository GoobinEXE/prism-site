import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";
import { legacyMeta } from "@/lib/seo";

export const metadata: Metadata = legacyMeta("CV", "/behind-prism");

export default function CurriculoPage() {
  return <LegacyRedirect href="/behind-prism#cv" labelKey="behindPrism" />;
}
