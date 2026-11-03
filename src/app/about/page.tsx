import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Prism: we take a big idea and split it into parts we can build one at a time.",
};

export default function AboutPage() {
  return <AboutView />;
}
