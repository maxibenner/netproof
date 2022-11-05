"use client";
import styles from "./styles.module.css";

export default function ContainerNFT() {
  return (
    <>
      <div className="title-bar">
        <div className="title-bar-text">Available NFTs</div>
      </div>
      <pre className={styles.containerInner}>
        <p>No wallet connected</p>
      </pre>
      <div className="status-bar">
        <p className="status-bar-field">Status:</p>
        <p id="indicator-status" className="status-bar-field">
          Not connected
        </p>
        <p className="status-bar-field">Wallet:</p>
        <p id="indicator-wallet" className="status-bar-field">
          N/A
        </p>
      </div>
    </>
  );
}
