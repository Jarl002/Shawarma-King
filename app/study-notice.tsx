import styles from "./study-notice.module.css";

// Required by the exam: makes it clear on every screen that this is not the real Shawarma King.
export function StudyNotice({ className }: { className?: string }) {
  return (
    <p className={className ? `${styles.notice} ${className}` : styles.notice} lang="da">
      Studieprojekt · ingen tilknytning til Shawarma King
    </p>
  );
}
