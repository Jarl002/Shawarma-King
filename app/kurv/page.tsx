import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getCatalog } from "../menu/data";
import MenuErrorBoundary from "../menu/menu-error-boundary";
import menuStyles from "../menu/menu.module.css";
import CartView from "./cart-view";
import ResetButton from "./reset-button";
import styles from "./cart.module.css";

export const metadata: Metadata = { title: "Din bestilling | Shawarma King Aarhus" };

// Shown under "Passer godt til" (04 Din bestilling in Figma).
const suggestionIds = ["falafel-snack", "stor-pommes"];

export default function CartPage() {
  return (
    <div className={menuStyles.screen}>
      <p className={menuStyles.menuNotice}>
        <span>Studieprojekt</span> · ingen tilknytning til Shawarma King
      </p>
      <header className={styles.topbar}>
        <Link className={styles.back} href="/menu" aria-label="Tilbage til menuen">
          ←
        </Link>
        <h1>Din bestilling</h1>
        <ResetButton />
      </header>
      <main className={styles.content}>
        <MenuErrorBoundary title="Kurven kunne ikke hentes">
          <Suspense fallback={<div className={`${styles.card} ${menuStyles.skeleton}`} aria-busy="true" aria-label="Henter kurven" />}>
            <CartWithCatalog />
          </Suspense>
        </MenuErrorBoundary>
      </main>
    </div>
  );
}

async function CartWithCatalog() {
  const catalog = await getCatalog();
  // Like Figma: only main dishes show a photo in the cart; extras are listed without one.
  const images = Object.fromEntries(catalog.filter(({ customizable }) => customizable).map(({ id, image }) => [id, image]));
  const suggestions = suggestionIds
    .map((id) => catalog.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  return <CartView images={images} suggestions={suggestions} />;
}
