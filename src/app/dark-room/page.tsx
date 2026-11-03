import type { Metadata } from "next";
import { DarkRoomView } from "./DarkRoomView";

export const metadata: Metadata = {
  title: { absolute: "Dark Room" },
  description:
    "Dark Room is Prism's in-house studio for games, diegetic systems and experimental software.",
};

export default function DarkRoomPage() {
  return <DarkRoomView />;
}
