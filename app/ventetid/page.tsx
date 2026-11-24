import type { Metadata } from "next";
import Link from "next/link";
import menuStyles from "../menu/menu.module.css";
import OrderStatus from "./order-status";

export const metadata: Metadata = { title: "Ventetid | Shawarma King Aarhus" };

export default function WaitingPage() {
  return (
    <div className={menuStyles.screen}>
      <p className={menuStyles.menuNotice}>
        <span>Studieprojekt</span> · ingen tilknytning til Shawarma King
      </p>
      <header>
        <Link className={menuStyles.menuBrand} href="/">Shawarma King</Link>
      </header>
      <OrderStatus />
    </div>
  );
}
