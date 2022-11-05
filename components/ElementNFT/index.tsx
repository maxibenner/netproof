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
      <img width={100} height={100} src={src} />
      <p>{label}</p>
    </div>
  );
}
