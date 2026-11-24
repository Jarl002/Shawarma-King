"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "../cart";
import LockScreen, { clock } from "./lock-screen";
import styles from "./waiting.module.css";

const steps = ["Bestilling modtaget", "Din mad laves nu", "Klar ved disken"];

export default function OrderStatus() {
  const { order } = useCart();
  const [now, setNow] = useState<number | null>(null);
  const [showLock, setShowLock] = useState(false);
  const closeLock = useCallback(() => setShowLock(false), []);

  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Prototype behaviour from Figma: the "your food is ready" notification appears after 5 seconds.
  useEffect(() => {
    if (!order) return;
    const timer = window.setTimeout(() => setShowLock(true), 5000);
    return () => window.clearTimeout(timer);
  }, [order]);

  if (!order) {
    return (
      <main className={styles.content}>
        <Link className={styles.emptyCard} href="/menu">
          <strong>Ingen aktiv bestilling</strong>
          <span>Tryk her for at vælge mad fra menuen</span>
        </Link>
      </main>
    );
  }

  // The steps follow the clock: received right away, cooking after a minute, ready at the estimated time.
  const current = now === null ? 0 : now >= order.readyAt ? 2 : now - order.placedAt >= 60_000 ? 1 : 0;
  const pickup = order.method === "Afhentning";

  return (
    <main className={styles.content}>
      <h1 className={styles.visuallyHidden}>Din bestilling er modtaget</h1>
      <div className={styles.card}>
        <div>
          <span>Klar ca.</span>
          <strong className={styles.time}>{clock(order.readyAt)}</strong>
        </div>
        <div className={styles.number}>
          <span>Ordrenummer</span>
          <strong>#{order.number}</strong>
        </div>
        <p>{pickup ? "Afhentning · Immervad 1E" : "Levering til den valgte adresse"}</p>
      </div>

      <p className={styles.lead}>Vi giver besked, når din mad er klar.</p>

      <h2 className={styles.stepsTitle}>Sådan laver vi din mad</h2>
      <ol className={styles.steps} aria-live="polite">
        {steps.map((step, index) => (
          <li key={step} data-state={index < current ? "done" : index === current ? "current" : "todo"} aria-current={index === current ? "step" : undefined}>
            {step}
          </li>
        ))}
      </ol>

      <p className={styles.note}>Tiden er et estimat. Vi giver besked, når maden er klar.</p>

      {showLock && now !== null && (
        <LockScreen now={now} orderNumber={order.number} pickupBy={clock(order.readyAt + 20 * 60_000)} onClose={closeLock} />
      )}
    </main>
  );
}
