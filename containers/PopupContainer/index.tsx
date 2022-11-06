"use client";

import Popup from "../../components/Popup";
import styles from "./styles.module.css";
import { WalletContext } from "../../context/walletContext";
import { useContext, useState } from "react";
import Badge from "../../components/Badge";

export default function PopupContainer() {
  const { activeAsset } = useContext(WalletContext);

  // Visualisation options
  const [badge, setBadge] = useState(false);
  return (
    <div className={styles.container}>
      <Popup title={activeAsset?.name} className={styles.popup}>
        <div className={styles.inner}>
          <pre className={styles.imgWrapper}>
            <div className={styles.imgContainer}>
              {badge && <Badge className={styles.badge} />}
              <img
                className={styles.img}
                src={activeAsset?.image_preview_url}
              />
            </div>
          </pre>

          <fieldset>
            <legend>Verification visuals</legend>
            <div className="field-row">
              <input
                onChange={() => setBadge(!badge)}
                id="checkbox13"
                type="checkbox"
                name="fieldset-example2"
              />
              <label htmlFor="checkbox13">Badge</label>
            </div>
            <div className="field-row">
              <input id="checkbox14" type="checkbox" name="fieldset-example2" />
              <label htmlFor="checkbox14">Gloss</label>
            </div>
          </fieldset>

          <pre className={styles.embedCodeContainer}>
            <p className={styles.embedCode}>No embed code generated</p>
          </pre>
          <button>Generate embed code</button>
        </div>
      </Popup>
    </div>
  );
}
