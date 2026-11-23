"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { itemKey, useCart } from "../cart";
import styles from "./checkout.module.css";

const fulfillmentMethods = ["Afhentning", "Levering"] as const;
const pickupSlots = ["Hurtigst · ca. 15 min.", "Om ca. 30 min.", "Om ca. 45 min."] as const;
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

export default function CheckoutForm() {
  const { items, total, placeOrder } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState<(typeof fulfillmentMethods)[number]>("Afhentning");
  const [minutes, setMinutes] = useState(15);
  const pickup = method === "Afhentning";

  if (items.length === 0) {
    return (
      <>
        <p>Din kurv er tom.</p>
        <Link className={styles.action} href="/menu">Se menuen</Link>
      </>
    );
  }

  // Regn i hele øre, så gebyret på 10,35 kr. kan lægges præcist til varebeløbet.
  const totalInOre = total * 100 + fees.reduce((sum, fee) => sum + fee.amountInOre, 0);

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        placeOrder(method, minutes, totalInOre);
        router.push("/ventetid");
      }}
    >
      <fieldset className={styles.options}>
        <legend>Hvordan vil du have din mad?</legend>
        {fulfillmentMethods.map((option) => (
          <label key={option}>
            <input type="radio" name="method" checked={method === option} onChange={() => setMethod(option)} />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>

      {pickup && (
        <fieldset className={styles.options}>
          <legend>Hvornår henter du?</legend>
          {pickupSlots.map((slot, index) => (
            <label key={slot}>
              <input type="radio" name="pickupTime" value={slot} checked={minutes === (index + 1) * 15} onChange={() => setMinutes((index + 1) * 15)} />
              <span>{slot}</span>
            </label>
          ))}
        </fieldset>
      )}

      <fieldset className={styles.contact}>
        <legend>{pickup ? "Hvem henter?" : "Hvor skal vi levere?"}</legend>
        <label>
          Navn
          <input name="name" autoComplete="name" placeholder="Fx Jarl" required />
        </label>
        <label>
          Telefon
          <input name="phone" type="tel" autoComplete="tel" placeholder="+45 12 34 56 78" required />
        </label>
        {!pickup && (
          <label>
            Adresse
            <input name="address" autoComplete="street-address" required />
          </label>
        )}
      </fieldset>

      <dl className={styles.summary} aria-label="Prisoversigt">
        {items.map((item) => (
          <div key={itemKey(item)}>
            <dt>
              {item.quantity} × {item.name}
              {item.choices.length > 0 && <small>{item.choices.join(" · ")}</small>}
            </dt>
            <dd>{price(item.unitPrice * item.quantity * 100)}</dd>
          </div>
        ))}
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

      <button className={styles.action} type="submit">
        Bestil <span>{price(totalInOre)}</span>
      </button>
      <p className={styles.notice}>Studiedemo · Bestillingen simuleres lokalt.</p>
    </form>
  );
}
