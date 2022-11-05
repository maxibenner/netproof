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
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={src} />
      </div>
      <p>{label}</p>
    </div>
  );
}
