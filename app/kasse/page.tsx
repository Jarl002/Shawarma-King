import type { Metadata } from "next";
import Link from "next/link";
import menuStyles from "../menu/menu.module.css";
import CheckoutForm from "./checkout-form";
import styles from "./checkout.module.css";

export const metadata: Metadata = { title: "Til kassen | Shawarma King Aarhus" };

export default function CheckoutPage() {
  return (
    <div className={menuStyles.screen}>
      <p className={menuStyles.menuNotice}>
        <span>Studieprojekt</span> · ingen tilknytning til Shawarma King
      </p>
      <header className={styles.topbar}>
        <Link className={styles.back} href="/kurv" aria-label="Tilbage til kurven">
          ←
        </Link>
        <h1>Til kassen</h1>
      </header>
      <main className={styles.content}>
        <CheckoutForm />
      </main>
    </div>
  );
}
