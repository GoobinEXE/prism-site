import type { Metadata } from "next";
import { HomeView } from "./HomeView";
import { pageMeta, siteName } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: siteName,
  description:
    "Prism builds mobile apps, desktop software and web apps. Dark Room is home to the games and experimental projects.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return <HomeView />;
}
