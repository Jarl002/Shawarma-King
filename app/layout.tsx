import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./cart";

export const metadata: Metadata = {
  title: "Shawarma King Aarhus",
  description: "Studieprojekt om et digitalt købsflow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="da">
      <body><CartProvider>{children}</CartProvider></body>
    </html>
  );
}
