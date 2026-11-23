import type { Metadata } from "next";
import Link from "next/link";
import menuStyles from "../menu/menu.module.css";
import OrderStatus from "./order-status";

export const metadata: Metadata = { title: "Ventetid | Shawarma King Aarhus" };

export default function WaitingPage() {
  return (
    <div className={menuStyles.screen}>
      <header className={menuStyles.header}>
        <p>Studieprojekt · ingen tilknytning til Shawarma King</p>
        <Link href="/menu">Shawarma King</Link>
      </header>
      <OrderStatus />
    </div>
  );
}
