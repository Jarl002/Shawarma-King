import type { Metadata } from "next";
import ReadyOrder from "./ready-order";

export const metadata: Metadata = { title: "Din mad er klar | Shawarma King" };

export default function ReadyPage() {
  return <ReadyOrder />;
}
