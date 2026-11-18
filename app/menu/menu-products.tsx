"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { catalog, products } from "./products";
import { useCart } from "../cart";
import styles from "./menu.module.css";

const filters = ["Mest bestilt", "Durum", "Kebabmix", "Alle", ...new Set(catalog.map(({ category }) => category).filter((category) => category !== "Durum" && category !== "Kebabmix"))];

export default function MenuProducts() {
  const [filter, setFilter] = useState("Mest bestilt");
  const { count, total } = useCart();
  const visibleProducts = filter === "Mest bestilt"
    ? catalog.slice(0, products.length)
    : catalog.filter((product) => filter === "Alle" || product.category === filter);

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
            <Link className={styles.cardLink} href={`/menu/${product.id}`}>
              <div className={styles.productInfo}>
                <h2>{product.name}</h2>
                {product.description && <p>{product.description}</p>}
                <strong>{product.price} kr.</strong>
                {product.popular && <span className={styles.badge}>Populær</span>}
              </div>
              <div className={styles.thumbnail}>
                {product.image && <Image src={product.image} alt="" fill sizes="96px" />}
                <span className={styles.add} aria-hidden="true">+</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/kurv" className={styles.cartSummary}>
        <span aria-live="polite">Se bestilling · {count}</span><span>{total} kr.</span>
      </Link>
    </>
  );
}
