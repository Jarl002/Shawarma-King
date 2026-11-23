import Image from "next/image";
import styles from "./loading.module.css";

// App Router viser denne skærm, mens den næste side indlæses.
export default function Loading() {
  return (
    <main className={styles.screen} role="status">
      <p className={styles.brand}>Shawarma King</p>
      <Image className={styles.animation} src="/kebab-original-transparent.gif" alt="" width={280} height={280} unoptimized />
      <h1>God smag er på vej</h1>
      <p>Indlæser menuen…</p>
      <span className={styles.city}>Aarhus</span>
    </main>
  );
}
