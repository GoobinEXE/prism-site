import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Prism: a problem and an idea go in, and the same mind comes out with several solutions.",
};

export default function AboutPage() {
  return <AboutView />;
}
