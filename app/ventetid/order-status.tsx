"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { itemKey, useCart } from "../cart";
import styles from "./waiting.module.css";

const steps = [
  "Bestilling modtaget",
  "Kødet skæres frisk af spyddet",
  "Brødet varmes og rulles",
  "Klar ved disken",
];

export default function OrderStatus() {
  const { order } = useCart();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!order) {
    return (
      <main className={styles.content}>
        <h1>Ingen aktiv bestilling</h1>
        <Link href="/menu">Se menuen</Link>
      </main>
    );
  }

  const minutesLeft = Math.max(0, Math.ceil((order.readyAt - (now ?? order.readyAt)) / 60_000));
  const readyTime = new Intl.DateTimeFormat("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Copenhagen",
  }).format(order.readyAt);

  return (
    <main className={styles.content}>
      <h1 className={styles.title}>Din bestilling er modtaget</h1>
      <div className={styles.ticket}>
        <div><span>Klar ca.</span><strong>{readyTime}</strong></div>
        <div><span>Ordrenummer</span><strong>#{order.number}</strong></div>
        <p>{order.method} · {order.method === "Afhentning" ? "Immervad 1E" : "Til den valgte adresse"}</p>
      </div>
      <p className={styles.remaining} role="timer">
        {now === null ? "Beregner ventetid…" : minutesLeft > 0 ? `ca. ${minutesLeft} minutter tilbage` : "Det forventede tidspunkt er nået"}
      </p>
      <h2>Sådan laver vi din mad</h2>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li key={step} className={index === 0 ? styles.received : undefined}>
            <span aria-hidden="true">{index === 0 ? "✹" : "◇"}</span>
            {step}
          </li>
        ))}
      </ol>
      <p className={styles.note}>Tiden er et estimat. Denne studiedemo viser en simuleret bestilling.</p>
      <details className={styles.summary}>
        <summary>Se din bestilling</summary>
        <ul>
          {order.items.map((item) => (
            <li key={itemKey(item)}>
              {item.quantity} × {item.name}
              {item.choices.length > 0 && <small>{item.choices.join(" · ")}</small>}
            </li>
          ))}
        </ul>
        <strong>I alt {(order.totalInOre / 100).toLocaleString("da-DK", { minimumFractionDigits: 2 })} kr.</strong>
      </details>
    </main>
  );
}
