"use client";

import styles from "./styles.module.css";
export default function Badge({ className }: { className?: string }) {
  return (
    <div className={`${styles.container} ${className}`}>
      <img className={styles.img} src="/assets/images/logo.png" />
    </div>
  );
}
