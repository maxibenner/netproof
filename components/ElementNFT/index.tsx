"client use";

import styles from "./styles.module.css";

export default function ElementNFT({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  return (
    <div className={styles.container} tabIndex={0}>
      <div className={styles.containerInner}>
        <div className={styles.imgContainer}>
          <img src={src} />
        </div>
      </div>
      <p>{label}</p>
    </div>
  );
}
