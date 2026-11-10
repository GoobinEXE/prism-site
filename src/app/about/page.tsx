import type { Metadata } from "next";
import { AboutView } from "./AboutView";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Why Prism: a problem and an idea go in, and the same mind comes out with several solutions.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutView />;
}
