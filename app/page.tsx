import styles from "./styles.module.css";
import Image from "next/image";
import ContainerNFT from "../components/ContainerNFT";
import Popup from "../components/Popup";

export default function Page() {
  return (
    <>
      <div className={styles.header}>
        <Image
          width="100"
          height="100"
          src="/assets/images/logo.png"
          alt="site logo"
        />
        <h1>Netproof</h1>
      </div>
      <h4>
        A digital service to verify and showcase NFTs on any web presence.
      </h4>
      <hr className={styles.divider} />
      <ContainerNFT />
      <Popup className={styles.popup}>
        <p>There's so much room for activities!</p>
      </Popup>
    </>
  );
}
