"use client";

import Image from "next/image";
import { useState } from "react";
import { products } from "./products";
import styles from "./menu.module.css";

const filters = ["Mest bestilt", "Durum", "Kebabmix"] as const;
type Filter = (typeof filters)[number];

export default function MenuProducts() {
  const [filter, setFilter] = useState<Filter>("Mest bestilt");
  // Oversigten viser alle retter. De øvrige filtre viser kun den valgte kategori.
  const visibleProducts = filter === "Mest bestilt"
    ? products
    : products.filter((product) => product.category === filter);

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filtrér menuen">
        {filters.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <ul className={styles.products}>
        {visibleProducts.map((product) => (
          <li className={styles.card} key={product.id}>
            <div className={styles.productInfo}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <strong>{product.price} kr.</strong>
              {"popular" in product && <span className={styles.badge}>Populær</span>}
            </div>
            <div className={styles.thumbnail}>
              <Image src={product.image} alt="" fill sizes="96px" />
              <button
                className={styles.add}
                type="button"
                aria-label={`Vælg ${product.name}`}
                disabled
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
