"use client";

import { useCart } from "../cart";
import styles from "./cart.module.css";

export default function ResetButton() {
  const { items, cutlery, note, clearCart } = useCart();
  const empty = items.length === 0 && !cutlery && !note;

  return (
    <button className={styles.reset} type="button" onClick={clearCart} disabled={empty}>
      Nulstil
    </button>
  );
}
