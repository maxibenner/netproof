"use client";

import { useContext } from "react";
import { WalletContext } from "../../context/walletContext";
import { OpenseaAsset } from "../../types/OpenseaAsset";
import ElementNFT from "../ElementNFT";
import styles from "./styles.module.css";

export default function ContainerNFT() {
  const { account, assets, activeAsset, setActiveAsset } =
    useContext(WalletContext);

  return (
    <>
      {/* <div className="title-bar">
        <div className="title-bar-text">Available NFTs</div>
      </div> */}
      <pre className={styles.containerInner}>
        {assets.length === 0 ? (
          <p>No wallet connected</p>
        ) : (
          <div className={styles.assetContainer}>
            {assets.map((a: OpenseaAsset) =>
              a.image_preview_url ? (
                <ElementNFT
                  key={a.id}
                  label={a.name}
                  src={a.image_preview_url}
                  onClick={() => setActiveAsset(a)}
                />
              ) : null
            )}
          </div>
        )}
      </pre>
      <div className={"status-bar" + " " + styles.statusBarContainer}>
        <div className={styles.statusBarPair}>
          <p className="status-bar-field">Status:</p>
          <p id="indicator-status" className="status-bar-field">
            {account.length > 0 ? "Connected" : "Not connected"}
          </p>
        </div>
        <div className={styles.statusBarPair}>
          <p className="status-bar-field">Wallet:</p>
          <p id="indicator-wallet" className="status-bar-field">
            {account.length > 0 ? account[0] : "N/A"}
          </p>
        </div>
      </div>
    </>
  );
}
