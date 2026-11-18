"use client";

import Link from "next/link";
import { itemKey, useCart } from "../cart";
import menuStyles from "../menu/menu.module.css";
import styles from "./cart.module.css";

export default function CartView() {
  const { items, total, changeQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <>
        <p>Din kurv er tom.</p>
        <Link className={menuStyles.cartSummary} href="/menu">Se menuen</Link>
      </>
    );
  }

  return (
    <>
      <button className={styles.reset} type="button" onClick={clearCart}>Nulstil</button>
      <ul className={menuStyles.products}>
        {items.map((item) => {
          const key = itemKey(item);
          const choiceLabel = [item.name, ...item.choices].join(", ");

          return (
            <li key={key} className={styles.line}>
              <div>
                <h2>{item.name}</h2>
                {item.choices.length > 0 && <p>{item.choices.join(" · ")}</p>}
                <strong>{item.unitPrice * item.quantity} kr.</strong>
              </div>
              <div className={styles.quantity} role="group" aria-label={`Antal for ${choiceLabel}`}>
                <button type="button" onClick={() => changeQuantity(key, -1)} aria-label={`Fjern én ${choiceLabel}`}>−</button>
                <output>{item.quantity}</output>
                <button type="button" onClick={() => changeQuantity(key, 1)} aria-label={`Tilføj én ${choiceLabel}`}>+</button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className={styles.total} aria-live="polite">I alt <strong>{total} kr.</strong></p>
    </>
  );
}
