"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./lock-screen.module.css";

type LockScreenProps = {
  now: number;
  orderNumber: number;
  pickupBy: string;
  onClose: () => void;
};

const weekday = new Intl.DateTimeFormat("da-DK", { weekday: "long" });
const month = new Intl.DateTimeFormat("da-DK", { month: "long" });

export function clock(time: number) {
  const date = new Date(time);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

// 07 Notifikation (Figma): a simulated phone lock screen with a push message that the food is ready.
export default function LockScreen({ now, orderNumber, pickupBy, onClose }: LockScreenProps) {
  const notification = useRef<HTMLAnchorElement>(null);
  const date = new Date(now);

  useEffect(() => {
    notification.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.lock} role="dialog" aria-modal="true" aria-label="Notifikation: din bestilling er klar">
      <Image className={styles.background} src="/lockscreen.webp" alt="" fill sizes="460px" />
      <button className={styles.dismiss} type="button" onClick={onClose} aria-label="Luk og gå tilbage til ventetiden" />

      <p className={styles.time} aria-hidden="true">{clock(now)}</p>
      <p className={styles.date} aria-hidden="true">
        {weekday.format(date)} {date.getDate()}. {month.format(date)}
      </p>

      <Link ref={notification} className={styles.notification} href="/bestilling-klar">
        <span className={styles.icon} aria-hidden="true">SK</span>
        <span className={styles.app}>Shawarma King</span>
        <span className={styles.when}>nu</span>
        <strong className={styles.title}>Din bestilling er klar ved disken</strong>
        <span className={styles.details}>Vis #{orderNumber} · Immervad 1E · hent inden {pickupBy}</span>
      </Link>
    </div>
  );
}
