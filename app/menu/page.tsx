import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MenuProducts from "./menu-products";
import styles from "./menu.module.css";

export const metadata: Metadata = {
  title: "Menu | Shawarma King Aarhus",
};

export default function MenuPage() {
  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <p>Studieprojekt · ingen tilknytning til Shawarma King</p>
        <Link href="/">Shawarma King</Link>
      </header>

      <main className={styles.content}>
        <Image
          src="/shawarma-pita.webp"
          alt=""
          width={1200}
          height={900}
          sizes="(max-width: 460px) calc(100vw - 40px), 420px"
          className={styles.hero}
        />
        <h1>Smagen af Mellemøsten midt i Aarhus</h1>
        <p className={styles.status}>Åben · klar til afhentning om ca. 15 min</p>
        <MenuProducts />
      </main>
    </div>
  );
}
