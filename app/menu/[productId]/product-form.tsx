"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "../../cart";
import { getProduct, ingredients, proteins } from "../products";
import styles from "./product.module.css";

type Product = NonNullable<ReturnType<typeof getProduct>>;

export default function ProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [protein, setProtein] = useState<(typeof proteins)[number]>("Kylling");
  const [excluded, setExcluded] = useState<(typeof ingredients)[number][]>([]);
  const [extraProtein, setExtraProtein] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const unitPrice = product.price + (extraProtein ? 39 : 0);

  function addToCart() {
    const choices = product.customizable
      ? [protein, ...ingredients.filter((item) => excluded.includes(item)).map((item) => `uden ${item.toLowerCase()}`)]
      : [];
    if (extraProtein) choices.push("Ekstra protein");

    addItem({ productId: product.id, name: product.name, choices, unitPrice, quantity });
    router.push("/menu");
  }

  return (
    <form className={styles.form} onSubmit={(event) => { event.preventDefault(); addToCart(); }}>
      {product.customizable && (
        <>
          <fieldset className={styles.options}>
            <legend>Protein</legend>
            {proteins.map((item) => (
              <label key={item}>
                <input type="radio" name="protein" checked={protein === item} onChange={() => setProtein(item)} />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className={styles.options}>
            <legend>Fyld</legend>
            {ingredients.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={!excluded.includes(item)}
                  onChange={(event) => setExcluded(event.target.checked
                    ? excluded.filter((value) => value !== item)
                    : [...excluded, item])}
                />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
          <label className={styles.extra}>
            <input type="checkbox" checked={extraProtein} onChange={(event) => setExtraProtein(event.target.checked)} />
            Ekstra protein <span>+39 kr.</span>
          </label>
        </>
      )}
      <div className={styles.actions}>
        <div className={styles.quantity} aria-label="Antal" role="group">
          <button type="button" aria-label="Fjern én" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>−</button>
          <output>{quantity}</output>
          <button type="button" aria-label="Tilføj én" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button type="submit" className={styles.add}>
          Tilføj <span aria-live="polite">{unitPrice * quantity} kr.</span>
        </button>
      </div>
    </form>
  );
}
