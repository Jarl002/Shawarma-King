"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "../../cart";
import type { Product } from "../data";
import { defaultIngredients, defaultSauces, ingredients, proteins, sauces } from "../options";
import styles from "./product.module.css";

export default function ProductForm({ product, drinks }: { product: Product; drinks: Product[] }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [protein, setProtein] = useState<(typeof proteins)[number]>("Kylling");
  const [selectedIngredients, setSelectedIngredients] = useState<readonly (typeof ingredients)[number][]>(defaultIngredients);
  const [selectedSauces, setSelectedSauces] = useState<readonly (typeof sauces)[number][]>(defaultSauces);
  const [extraProtein, setExtraProtein] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [withCombo, setWithCombo] = useState(false);
  const [drinkId, setDrinkId] = useState(drinks[0]?.id);
  const selectedDrink = drinks.find((drink) => drink.id === drinkId);
  const unitPrice = product.price + (extraProtein ? 39 : 0) + (withCombo ? 80 : 0);

  function addToCart() {
    const choices = product.customizable
      ? [
        protein,
        ...ingredients.filter((item) => selectedIngredients.includes(item)),
        ...ingredients.filter((item) => defaultIngredients.includes(item) && !selectedIngredients.includes(item)).map((item) => `uden ${item.toLowerCase()}`),
        ...sauces.filter((item) => selectedSauces.includes(item)),
        ...(selectedSauces.length === 0 ? ["Uden dressing og sauce"] : []),
      ]
      : [];
    if (extraProtein) choices.push("Ekstra protein");
    if (withCombo && selectedDrink) choices.push(`Pommes og ${selectedDrink.name}`);

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
            <legend>Grøntsager</legend>
            {ingredients.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(item)}
                  onChange={(event) => setSelectedIngredients((current) => event.target.checked
                    ? [...current, item]
                    : current.filter((value) => value !== item))}
                />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className={styles.options}>
            <legend>Dressing og sauce</legend>
            {sauces.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={selectedSauces.includes(item)}
                  onChange={(event) => setSelectedSauces((current) => event.target.checked
                    ? [...current, item]
                    : current.filter((value) => value !== item))}
                />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
          <label className={styles.extra}>
            <input type="checkbox" checked={extraProtein} onChange={(event) => setExtraProtein(event.target.checked)} />
            Ekstra protein <span>+39 kr.</span>
          </label>
          <label className={styles.extra}>
            <input type="checkbox" checked={withCombo} onChange={(event) => setWithCombo(event.target.checked)} />
            Med pommes og sodavand <span>+80 kr.</span>
          </label>
          {withCombo && drinks.length > 0 && (
            <fieldset className={styles.options}>
              <legend>Vælg drik</legend>
              {drinks.map((drink) => (
                <label key={drink.id}>
                  <input type="radio" name="drink" checked={drinkId === drink.id} onChange={() => setDrinkId(drink.id)} />
                  <span>{drink.name}</span>
                </label>
              ))}
            </fieldset>
          )}
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
