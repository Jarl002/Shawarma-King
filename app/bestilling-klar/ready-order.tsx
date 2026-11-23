"use client";

import Link from "next/link";
import { useCart } from "../cart";
import styles from "./ready.module.css";

export default function ReadyOrder() {
  const { order } = useCart();

  if (!order) {
    return (
      <main className={styles.screen}>
        <h1>Ingen aktiv bestilling</h1>
        <Link href="/menu">Se menuen</Link>
      </main>
    );
  }

  const pickup = order.method === "Afhentning";

  return (
    <main className={styles.screen}>
      <p className={styles.brand}>Shawarma King</p>
      <div className={styles.space} />
      <h1>Din mad er klar.</h1>
      <p>Nyd den, mens den er varm.</p>
      <div className={styles.ticket}>
        <span>{pickup ? "Vis nummeret ved disken" : "Dit ordrenummer"}</span>
        <strong>#{order.number}</strong>
        <span>{pickup ? "Afhentning · Immervad 1E" : "Levering til den valgte adresse"}</span>
      </div>
      <p className={styles.thanks}>Tak fordi du valgte Shawarma King. Vi ses igen.</p>
      {pickup && (
        <a className={styles.link} href="https://www.google.com/maps/search/?api=1&query=Immervad+1E+Aarhus" target="_blank" rel="noreferrer">
          Find vej til Immervad 1E
        </a>
      )}
      <Link className={styles.link} href="/ventetid">Se bestillingen igen</Link>
      <Link href="/menu">Til menuen</Link>
      <p className={styles.demo}>Studiedemo · simuleret bestilling</p>
    </main>
  );
}
