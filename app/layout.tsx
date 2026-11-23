import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./cart";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Shawarma King Aarhus",
  description: "Studieprojekt om et digitalt købsflow.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="da">
      <body>
        <div className={styles.desktop}>
          <div className={styles.device}>
            <div className={styles.screen}>
              <CartProvider>{children}</CartProvider>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
