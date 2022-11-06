"client use";

import styles from "./styles.module.css";

export default function ElementNFT({
  src,
  label,
  onClick,
}: {
  src: string;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className={styles.container} tabIndex={0}>
      <div className={styles.containerInner}>
        <div className={styles.imgContainer}>
          <img src={src} />
        </div>
      </div>
      <p>{label}</p>
    </div>
  );
}
