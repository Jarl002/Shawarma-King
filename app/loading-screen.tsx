import Image from "next/image";
import styles from "./loading.module.css";

// 10 Loading (Figma). With a label (e.g. "Indlæser menuen") it shows text next to the dots;
// without one it shows only the dots, and screen readers hear "Indlæser…".
export default function LoadingScreen({ label }: { label?: string }) {
  return (
    <div className={styles.screen}>
      <p className={styles.notice}>
        <span>Studieprojekt</span> · ingen tilknytning til Shawarma King
      </p>
      <main className={styles.content} role="status">
        <p className={styles.brand}>Shawarma King</p>
        <div className={styles.center}>
          <Image className={styles.animation} src="/kebab-original-transparent.gif" alt="" width={280} height={280} unoptimized />
          <h1>God smag er på vej</h1>
          <p className={styles.loading}>
            <span className={styles.dots} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            {label ?? <span className={styles.visuallyHidden}>Indlæser…</span>}
          </p>
        </div>
        <span className={styles.city}>Aarhus</span>
      </main>
    </div>
  );
}
