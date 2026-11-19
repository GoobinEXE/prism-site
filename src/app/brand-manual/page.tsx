import type { Metadata } from "next";
import { BrandManualView } from "./BrandManualView";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { brandManualGraph } from "@/lib/structuredData";

export const metadata: Metadata = pageMeta({
  title: "Brand Manual",
  description:
    "How the Prism and Dark Room brands work: logos, colors, type and usage rules. Read online or download the PDF.",
  path: "/brand-manual",
});

export default function BrandManualPage() {
  return (
    <>
      <JsonLd data={brandManualGraph} />
      <BrandManualView />
    </>
  );
}
