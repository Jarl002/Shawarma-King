"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "../cart";
import styles from "./checkout.module.css";

const fees = [
  { name: "Bærepose", amountInOre: 500 },
  { name: "Servicegebyr", amountInOre: 1035 },
];
const currency = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
  currencyDisplay: "narrowSymbol",
});

function price(amountInOre: number) {
  return currency.format(amountInOre / 100);
}

function clock(date: Date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

// "Hurtigst" is about 15 minutes from now; the next two choices are quarter hours
// at least 10 minutes later (as in Figma: 22:50, 23:00, 23:15).
function pickupSlots(now: Date) {
  const fastest = new Date(now.getTime() + 15 * 60_000);
  const next = new Date(fastest.getTime() + 10 * 60_000);
  next.setSeconds(0, 0);
  next.setMinutes(Math.ceil(next.getMinutes() / 15) * 15);
  const later = new Date(next.getTime() + 15 * 60_000);
  const minutesUntil = (date: Date) => Math.round((date.getTime() - now.getTime()) / 60_000);

  return [
    { label: `Hurtigst · ca. ${clock(fastest)}`, minutes: 15 },
    { label: clock(next), minutes: minutesUntil(next) },
    { label: clock(later), minutes: minutesUntil(later) },
  ];
}

export default function CheckoutForm() {
  const { items, count, total, cutlery, note, placeOrder } = useCart();
  const router = useRouter();
  const [now] = useState(() => new Date());
  const slots = pickupSlots(now);
  const [minutes, setMinutes] = useState(slots[0].minutes);

  if (items.length === 0) {
    return (
      <Link className={styles.emptyCard} href="/menu">
        <strong>Din kurv er tom</strong>
        <span>Tryk her for at vælge mad fra menuen</span>
      </Link>
    );
  }

  // Regn i hele øre, så gebyret på 10,35 kr. kan lægges præcist til varebeløbet.
  const totalInOre = total * 100 + fees.reduce((sum, fee) => sum + fee.amountInOre, 0);

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        placeOrder("Afhentning", minutes, totalInOre);
        router.push("/ventetid");
      }}
    >
      <div className={styles.segment} role="group" aria-label="Hvordan vil du have din mad?">
        <span className={styles.segmentActive} aria-current="true">Afhentning</span>
        <span className={styles.segmentSoon} aria-disabled="true">Levering · snart</span>
      </div>

      <fieldset className={styles.group}>
        <legend>Hvornår henter du?</legend>
        <div className={styles.times}>
          {slots.map((slot) => (
            <label key={slot.label} className={styles.time}>
              <input type="radio" name="pickupTime" checked={minutes === slot.minutes} onChange={() => setMinutes(slot.minutes)} />
              <span>{slot.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend>Hvem henter?</legend>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span>Navn</span>
            <input name="name" autoComplete="name" placeholder="Skriv dit navn" required />
          </label>
          <label className={styles.field}>
            <span>Telefon</span>
            <input name="phone" type="tel" autoComplete="tel" placeholder="Skriv dit telefonnummer" required />
          </label>
        </div>
        <p className={styles.small}>Vi kontakter dig kun, hvis der er noget med din bestilling.</p>
      </fieldset>

      <dl className={styles.summary} aria-label="Prisoversigt">
        <div>
          <dt><Link href="/kurv">{count} {count === 1 ? "vare" : "varer"}</Link></dt>
          <dd>{price(total * 100)}</dd>
        </div>
        {fees.map((fee) => (
          <div key={fee.name}>
            <dt>{fee.name}</dt>
            <dd>{price(fee.amountInOre)}</dd>
          </div>
        ))}
        <div className={styles.total}>
          <dt>I alt</dt>
          <dd>{price(totalInOre)}</dd>
        </div>
      </dl>

      <div className={styles.extras}>
        <p>{cutlery ? "Bestik er lagt i posen" : "Intet bestik valgt"}</p>
        <p>
          <Link href="/kurv">Besked: {note || "Ingen besked"}</Link>
        </p>
      </div>

      <div className={styles.actions}>
        <button className={styles.order} type="submit">
          <span>Bestil</span>
          <span>{price(totalInOre)}</span>
        </button>
      </div>
    </form>
  );
}
