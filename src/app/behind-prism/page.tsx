import type { Metadata } from "next";
import { BehindPrismView } from "./BehindPrismView";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { personGraph } from "@/lib/structuredData";

export const metadata: Metadata = pageMeta({
  title: "Behind Prism",
  description:
    "Marcelo Pessoa de Aguiar Lopes: trained in design, a game developer, and the person behind Prism and Dark Room. Story and CV.",
  path: "/behind-prism",
});

export default function BehindPrismPage() {
  return (
    <>
      <JsonLd data={personGraph} />
      <BehindPrismView />
    </>
  );
}
