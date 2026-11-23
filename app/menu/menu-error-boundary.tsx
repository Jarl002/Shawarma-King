"use client";

import { catchError, type ErrorInfo } from "next/error";
import styles from "./menu.module.css";

function MenuErrorFallback({ title }: { title: string }, { retry }: ErrorInfo) {
  return (
    <div className={styles.error} role="alert">
      <h2>{title}</h2>
      <p>Det er os, ikke dig. Tjek din forbindelse, og prøv igen om et øjeblik.</p>
      <button type="button" onClick={() => retry()}>
        Prøv igen
      </button>
    </div>
  );
}

// Shown in place of the menu content if it cannot be loaded from Supabase.
export default catchError(MenuErrorFallback);
