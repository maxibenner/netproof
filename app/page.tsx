import styles from "./styles.module.css";
import Image from "next/image";
import ContainerNFT from "../components/ContainerNFT";
import PopupContainer from "../containers/PopupContainer";

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
      <h4 className={styles.sub}>
        A digital service to verify and showcase NFTs on any web presence.
      </h4>
      <hr className={styles.divider} />
      <ContainerNFT />
      <PopupContainer />
    </>
  );
}
