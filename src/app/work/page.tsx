import type { Metadata } from "next";
import { WorkView } from "./WorkView";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description:
    "Mobile apps, desktop software, web apps and the Dark Room projects.",
  path: "/work",
});

export default function WorkPage() {
  return <WorkView />;
}
