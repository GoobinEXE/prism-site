import type { Metadata } from "next";
import { WorkView } from "./WorkView";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Mobile apps, desktop software, web apps and the Dark Room projects.",
};

export default function WorkPage() {
  return <WorkView />;
}
