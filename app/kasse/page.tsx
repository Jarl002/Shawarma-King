import type { Metadata } from "next";
import Link from "next/link";
import menuStyles from "../menu/menu.module.css";
import CheckoutForm from "./checkout-form";
import styles from "./checkout.module.css";

export const metadata: Metadata = { title: "Til kassen | Shawarma King Aarhus" };

export default function CheckoutPage() {
  return (
    <div className={menuStyles.screen}>
      <header className={menuStyles.header}>
        <p>Studieprojekt · ingen tilknytning til Shawarma King</p>
        <Link href="/kurv">← Tilbage til kurven</Link>
      </header>
      <main className={styles.content}>
        <h1>Til kassen</h1>
        <CheckoutForm />
      </main>
    </div>
  );
}
