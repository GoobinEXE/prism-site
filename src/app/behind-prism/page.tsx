import type { Metadata } from "next";
import { BehindPrismView } from "./BehindPrismView";

export const metadata: Metadata = {
  title: "Behind Prism",
  description:
    "Marcelo Pessoa de Aguiar Lopes: trained in design, a game developer, and the person behind Prism and Dark Room. Story and CV.",
};

export default function BehindPrismPage() {
  return <BehindPrismView />;
}
