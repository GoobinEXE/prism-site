import type { Metadata } from "next";
import { ContactView } from "./ContactView";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Have an idea or a project? Tell us about it.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactView />;
}
