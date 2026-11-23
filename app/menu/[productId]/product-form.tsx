"use client";

import Image from "next/image";
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

  const fillings = [
    ...ingredients.filter((item) => defaultIngredients.includes(item)).slice(0, 3).map((item) => ({ item, kind: "ingredient" as const })),
    { item: "Cremefraiche" as const, kind: "sauce" as const },
    ...ingredients.filter((item) => defaultIngredients.includes(item)).slice(3).map((item) => ({ item, kind: "ingredient" as const })),
    ...ingredients.filter((item) => !defaultIngredients.includes(item)).map((item) => ({ item, kind: "ingredient" as const })),
    ...sauces.filter((item) => item !== "Cremefraiche").map((item) => ({ item, kind: "sauce" as const })),
  ];

  function toggleFilling(item: string, kind: "ingredient" | "sauce") {
    if (kind === "ingredient") {
      const value = item as (typeof ingredients)[number];
      setSelectedIngredients((current) => current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value]);
    } else {
      const value = item as (typeof sauces)[number];
      setSelectedSauces((current) => current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value]);
    }
  }

  return (
    <form className={styles.form} onSubmit={(event) => { event.preventDefault(); addToCart(); }}>
      <div className={styles.titleRow}>
        <h1>{product.name}</h1>
        <p className={styles.price}>{product.price} kr.</p>
      </div>
      {product.customizable && <p className={styles.summary} aria-live="polite">{protein}</p>}

      {product.customizable && (
        <>
          <fieldset className={styles.group}>
            <legend>Protein</legend>
            <div className={styles.pills}>
              {proteins.map((item) => (
                <label key={item} className={styles.pill}>
                  <input type="radio" name="protein" checked={protein === item} onChange={() => setProtein(item)} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.group}>
            <legend>
              Fyld <span className={styles.hint}>Tryk for at fravælge</span>
            </legend>
            <div className={styles.fillings}>
              {fillings.map(({ item, kind }) => {
                const checked = kind === "ingredient"
                  ? selectedIngredients.includes(item as (typeof ingredients)[number])
                  : selectedSauces.includes(item as (typeof sauces)[number]);
                return (
                  <label key={item} className={styles.filling}>
                    <input type="checkbox" checked={checked} onChange={() => toggleFilling(item, kind)} />
                    <span>{checked && <span className={styles.check} aria-hidden="true">✓</span>}{item === "Cremefraiche" ? "Creme fraiche" : item}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <button type="button" className={styles.extra} aria-pressed={extraProtein} onClick={() => setExtraProtein(!extraProtein)}>
            <span>Ekstra protein</span>
            <span className={styles.extraPrice}>+39 kr.</span>
          </button>

          <button type="button" role="switch" aria-checked={withCombo} className={styles.combo} onClick={() => setWithCombo(!withCombo)}>
            <span className={styles.comboImages} aria-hidden="true">
              <Image src="/menu/combo-pommes.webp" alt="" width={64} height={64} />
              <Image src="/menu/combo-cola.webp" alt="" width={40} height={64} />
            </span>
            <span className={styles.comboText}>
              <strong>Med pommes og sodavand</strong>
              <span>+80 kr.</span>
            </span>
            <span className={styles.switch} aria-hidden="true" />
          </button>

          {withCombo && drinks.length > 0 && (
            <fieldset className={styles.group}>
              <legend>Vælg sodavand</legend>
              <div className={styles.pills}>
                {drinks.map((drink) => (
                  <label key={drink.id} className={styles.pill}>
                    <input type="radio" name="drink" checked={drinkId === drink.id} onChange={() => setDrinkId(drink.id)} />
                    <span>{drink.name}</span>
                  </label>
                ))}
              </div>
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
