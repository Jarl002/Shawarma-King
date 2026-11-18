import type { Metadata } from "next";
import Link from "next/link";
import menuStyles from "../menu/menu.module.css";
import CartView from "./cart-view";

export const metadata: Metadata = { title: "Din bestilling | Shawarma King Aarhus" };

export default function CartPage() {
  return (
    <div className={menuStyles.screen}>
      <header className={menuStyles.header}>
        <p>Studieprojekt · ingen tilknytning til Shawarma King</p>
        <Link href="/menu">← Til menuen</Link>
      </header>
      <main className={menuStyles.content}>
        <h1>Din bestilling</h1>
        <CartView />
      </main>
    </div>
  );
}
