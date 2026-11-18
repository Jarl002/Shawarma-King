import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.landing}>
      <header className={styles.header}>
        <span className={styles.brand}>Shawarma King</span>
        <button className={styles.orderButton} type="button" disabled lang="en">
          Order now
        </button>
        <details className={styles.navigation}>
          <summary aria-label="Navigation">
            <span aria-hidden="true" />
          </summary>
          <nav aria-label="Landingsside">
            <a href="#om-projektet">Om projektet</a>
          </nav>
        </details>
      </header>

      <main className={styles.content}>
        <div className={styles.intro}>
          <h1>Shawarma King<br />Aarhus</h1>
          <p className={styles.tagline} lang="en">
            The taste of the Middle East in the middle of Aarhus
          </p>
        </div>
        <Image
          className={styles.hero}
          src="/shawarma-pita.webp"
          alt="Pitabrød med shawarma, rødkål og salat, serveret med pommes frites"
          width={1200}
          height={900}
          sizes="(max-width: 460px) calc(100vw - 40px), 420px"
          preload
        />
        <p className={styles.description} lang="en">
          From slow-grilled, juicy shawarma to freshly baked pita and Turkish
          bread – every meal is prepared with care and flavor in focus.
        </p>
        <button className={styles.orderButton} type="button" disabled lang="en">
          Order now
        </button>
      </main>

      <footer className={styles.footer} id="om-projektet">
        Studieprojekt · ingen tilknytning til Shawarma King
      </footer>
    </div>
  );
}
