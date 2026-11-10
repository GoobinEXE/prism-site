import type { Metadata } from "next";
import { DarkRoomView } from "./DarkRoomView";
import { pageMeta, shareImages } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { darkRoomGraph } from "@/lib/structuredData";

export const metadata: Metadata = pageMeta({
  title: "Dark Room",
  description:
    "Dark Room is Prism's in-house studio for games, diegetic systems and experimental software.",
  path: "/dark-room",
  absoluteTitle: true,
  image: shareImages.darkRoom,
});

export default function DarkRoomPage() {
  return (
    <>
      <JsonLd data={darkRoomGraph} />
      <DarkRoomView />
    </>
  );
}
