"use client";

import { useContext, useEffect } from "react";
import { WalletContext } from "../../context/walletContext";
import ElementNFT from "../ElementNFT";
import styles from "./styles.module.css";

export default function ContainerNFT() {
  const { account, assets } = useContext(WalletContext);

  useEffect(() => {
    console.log(assets);
  }, [assets]);

  return (
    <>
      {/* <div className="title-bar">
        <div className="title-bar-text">Available NFTs</div>
      </div> */}
      <div className={"status-bar" + " " + styles.statusBarContainer}>
        <p className="status-bar-field">Status:</p>
        <p id="indicator-status" className="status-bar-field">
          {account.length > 0 ? "Connected" : "Not connected"}
        </p>
        <p className="status-bar-field">Wallet:</p>
        <p id="indicator-wallet" className="status-bar-field">
          {account.length > 0 ? account[0] : "N/A"}
        </p>
      </div>
      <pre className={styles.containerInner}>
        {assets.length === 0 ? (
          <p>No wallet connected</p>
        ) : (
          <div className={styles.assetContainer}>
            {assets.map((a) =>
              a.image_preview_url ? (
                <ElementNFT
                  key={a.id}
                  label={a.name}
                  src={a.image_preview_url}
                />
              ) : null
            )}
          </div>
        )}
      </pre>
    </>
  );
}
