import type { Metadata } from "next";
import { ContactView } from "./ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have an idea or a project? Tell us about it.",
};

export default function ContactPage() {
  return <ContactView />;
}
