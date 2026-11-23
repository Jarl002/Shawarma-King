"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "./data";
import { useCart } from "../cart";
import styles from "./menu.module.css";

export default function MenuProducts({ catalog }: { catalog: Product[] }) {
  const filters = ["Mest bestilt", "Durum", "Kebabmix", "Alle", ...new Set(catalog.map(({ category }) => category).filter((category) => category !== "Durum" && category !== "Kebabmix"))];
  const [filter, setFilter] = useState("Mest bestilt");
  const { count, total } = useCart();
  const visibleProducts = filter === "Mest bestilt"
    ? catalog.filter((product) => product.featured)
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
      {visibleProducts.length === 0 && (
        <p className={styles.empty} role="status">
          {catalog.length === 0 ? "Menuen er tom lige nu. Prøv igen om lidt." : "Der er ingen retter i denne kategori lige nu."}
        </p>
      )}
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
