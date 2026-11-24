import Image from "next/image";
import Link from "next/link";
import styles from "./busy.module.css";

// 09 Travlt / Pause (Figma): shown instead of ordering when the restaurant has paused orders in Supabase.
export default function BusyNotice() {
  return (
    <div className={styles.busy}>
      <Image className={styles.hero} src="/travlt-hero.webp" alt="" width={700} height={280} sizes="(max-width: 460px) calc(100vw - 40px), 420px" />
      <h1 className={styles.title}>
        Vi har travlt
        <br />
        ved grillen
      </h1>
      <p className={styles.text}>
        Lige nu tager vi ikke imod nye bestillinger.
        <br />
        Du kan forudbestille til senere.
      </p>
      <div className={styles.paused} role="status">
        <span className={styles.icon} aria-hidden="true">!</span>
        <span>
          <strong>Bestilling sat på pause</strong>
          <span>Vi viser ingen tid, vi ikke kender.</span>
        </span>
      </div>
      <button className={styles.primary} type="button" disabled aria-describedby="forudbestil-snart">
        Forudbestil til senere
      </button>
      <p id="forudbestil-snart" className={styles.soon}>Forudbestilling kommer snart.</p>
      <Link className={styles.secondary} href="/">Til forsiden</Link>
    </div>
  );
}
