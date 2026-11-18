import type { Metadata } from "next";
import { BrandManualView } from "./BrandManualView";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Brand Manual",
  description:
    "Complete Prism and Dark Room brand manual: logos, icon scales, protection zones, typography, chromatic system, color psychology, and QA.",
  path: "/brand-manual",
});

export default function BrandManualPage() {
  return <BrandManualView />;
}
