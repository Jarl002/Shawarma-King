"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart";
import { clock } from "../ventetid/lock-screen";
import styles from "./ready.module.css";

function Notice() {
  return (
    <p className={styles.notice}>
      <span>Studieprojekt</span> · ingen tilknytning til Shawarma King
    </p>
  );
}

// 08 Din mad er klar (Figma)
export default function ReadyOrder() {
  const { order } = useCart();

  if (!order) {
    return (
      <div className={styles.screen}>
        <Notice />
        <main className={styles.content}>
          <Link className={styles.emptyCard} href="/menu">
            <strong>Ingen aktiv bestilling</strong>
            <span>Tryk her for at vælge mad fra menuen</span>
          </Link>
        </main>
      </div>
    );
  }

  const pickup = order.method === "Afhentning";
  // Same "hent inden" time as the notification: ready time + 20 minutes.
  const pickupBy = clock(order.readyAt + 20 * 60_000);

  return (
    <div className={styles.screen}>
      <Notice />
      <main className={styles.content}>
        <Link className={styles.brand} href="/">Shawarma King</Link>
        <Image
          className={styles.animation}
          src="/bestilling-kebab-40-transparent.gif"
          alt="Kokken serverer din mad"
          width={310}
          height={315}
          unoptimized
        />
        <h1>Din mad er klar.</h1>
        <p className={styles.lead}>Nyd den, mens den er varm.</p>
        <div className={styles.ticket}>
          <span>{pickup ? "Vis nummeret ved disken" : "Dit ordrenummer"}</span>
          <strong>#{order.number}</strong>
          <span>{pickup ? `Immervad 1E · hent inden ${pickupBy}` : "Levering til den valgte adresse"}</span>
        </div>
        <p className={styles.thanks}>Tak fordi du valgte Shawarma King. Vi ses igen.</p>
        {pickup && (
          <a
            className={styles.route}
            href="https://www.google.com/maps/search/?api=1&query=Immervad+1E+Aarhus"
            target="_blank"
            rel="noreferrer"
          >
            Find vej til Immervad 1E
          </a>
        )}
      </main>
    </div>
  );
}
