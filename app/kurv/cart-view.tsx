"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { itemKey, useCart } from "../cart";
import type { Product } from "../menu/data";
import styles from "./cart.module.css";

type CartViewProps = {
  images: Record<string, string | null>;
  suggestions: Product[];
};

export default function CartView({ images, suggestions }: CartViewProps) {
  const { items, total, addItem, changeQuantity, cutlery, setCutlery, note, setNote } = useCart();
  const [writingNote, setWritingNote] = useState(false);
  const empty = items.length === 0;

  return (
    <>
      <div className={styles.list}>
        {empty ? (
          <Link className={`${styles.card} ${styles.emptyCard}`} href="/menu">
            <strong>Din kurv er tom</strong>
            <span>Tryk her for at vælge mad fra menuen</span>
          </Link>
        ) : (
          <ul className={styles.lines}>
            {items.map((item) => {
              const key = itemKey(item);
              const label = [item.name, ...item.choices].join(", ");
              const image = images[item.productId];

              return (
                <li key={key} className={`${styles.card} ${styles.line}`} data-image={Boolean(image)}>
                  {image && (
                    <div className={styles.lineImage}>
                      <Image src={image} alt="" width={70} height={70} />
                    </div>
                  )}
                  <div className={styles.lineInfo}>
                    <h2>{item.name}</h2>
                    {item.choices.length > 0 && <p>{item.choices.join(" · ")}</p>}
                  </div>
                  <strong className={styles.linePrice}>{item.unitPrice * item.quantity} kr.</strong>
                  <Stepper
                    className={styles.lineStepper}
                    quantity={item.quantity}
                    label={label}
                    onRemove={() => changeQuantity(key, -1)}
                    onAdd={() => changeQuantity(key, 1)}
                  />
                </li>
              );
            })}
          </ul>
        )}

        <button className={`${styles.card} ${styles.option}`} type="button" aria-pressed={cutlery} onClick={() => setCutlery(!cutlery)}>
          <span className={styles.optionText}>
            <strong>Bestik</strong>
            <span>{cutlery ? "Bestik er lagt i posen" : "Intet bestik valgt"}</span>
          </span>
          <span className={styles.optionAction} aria-hidden="true">{cutlery ? "✓" : "+"}</span>
        </button>

        <div className={`${styles.card} ${styles.noteCard}`}>
          <button className={styles.option} type="button" aria-expanded={writingNote} onClick={() => setWritingNote(!writingNote)}>
            <span className={styles.optionText}>
              <strong>Besked til køkkenet</strong>
              <span className={styles.noteStatus}>{note || "Ingen besked"}</span>
            </span>
            <span className={styles.optionActionText}>{writingNote ? "Luk" : note ? "Ret" : "Skriv"}</span>
          </button>
          {writingNote && (
            <label className={styles.noteField}>
              <span className={styles.visuallyHidden}>Besked til køkkenet</span>
              <textarea
                value={note}
                maxLength={200}
                rows={3}
                placeholder="Fx ekstra stærk, ingen løg i den ene"
                onChange={(event) => setNote(event.target.value)}
                autoFocus
              />
            </label>
          )}
        </div>

        {suggestions.length > 0 && (
          <section aria-labelledby="passer-godt-til">
            <h2 id="passer-godt-til" className={styles.suggestionsTitle}>Passer godt til</h2>
            <div className={styles.suggestions}>
              {suggestions.map((product) => {
                const line = items.find((item) => item.productId === product.id && item.choices.length === 0);
                const quantity = line?.quantity ?? 0;

                return (
                  <div key={product.id} className={styles.suggestion}>
                    <div className={styles.suggestionImage}>
                      {product.image && <Image src={product.image} alt="" width={312} height={152} />}
                    </div>
                    <h3>{product.name}</h3>
                    <p>{product.price} kr. / stk.</p>
                    <Stepper
                      className={styles.suggestionStepper}
                      quantity={quantity}
                      label={product.name}
                      onRemove={() => line && changeQuantity(itemKey(line), -1)}
                      onAdd={() => addItem({ productId: product.id, name: product.name, choices: [], unitPrice: product.price, quantity: 1 })}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <div className={styles.checkout}>
        <p className={styles.total} aria-live="polite">
          <span>I alt</span>
          <strong>{total} kr.</strong>
        </p>
        <p className={styles.vat}>Priser inkl. moms</p>
        {empty ? (
          <span className={styles.checkoutButton} aria-disabled="true">Til kassen</span>
        ) : (
          <Link className={styles.checkoutButton} href="/kasse">Til kassen</Link>
        )}
      </div>
    </>
  );
}

type StepperProps = {
  className: string;
  quantity: number;
  label: string;
  onRemove: () => void;
  onAdd: () => void;
};

function Stepper({ className, quantity, label, onRemove, onAdd }: StepperProps) {
  return (
    <div className={`${styles.stepper} ${className}`} role="group" aria-label={`Antal for ${label}`}>
      <button type="button" onClick={onRemove} disabled={quantity === 0} aria-label={`Fjern én ${label}`}>−</button>
      <output>{quantity}</output>
      <button type="button" className={styles.plus} onClick={onAdd} aria-label={`Tilføj én ${label}`}>+</button>
    </div>
  );
}
