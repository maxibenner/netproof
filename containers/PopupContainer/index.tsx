"use client";

import { useContext, useState } from "react";
import ImageInteractive from "../../components/ImageInteractive";
import Popup from "../../components/Popup";
import { WalletContext } from "../../context/walletContext";
import styles from "./styles.module.css";

export default function PopupContainer() {
  const { activeAsset } = useContext(WalletContext);
  const [embedCode, setEmbedCode] = useState<string>();

  // Visualisation options
  const [badge, setBadge] = useState(false);
  const [tilt, setTilt] = useState(true);

  function handleVizChange(e: any) {
    setBadge(e.target.name === "badge");
    setTilt(e.target.name === "tilt");
  }

  async function handleEmbedCodeGeneration() {
    const res = await fetch("http://localhost:3000/api/createVerifiedNFT");
    const data = await res.json();
    console.log(data)
    // let iframe = document.createElement("iframe");

    // iframe.src = "URL OF CONTENT YOU WANT TO PROVIDE";
    // iframe.width = "200";
    // iframe.height = "200";

    // setEmbedCode(iframe.outerHTML);
  }

  return (
    <div className={styles.container}>
      <Popup title={activeAsset?.name} className={styles.popup}>
        <div className={styles.inner}>
          <pre className={styles.imgWrapper}>
            <ImageInteractive
              withBadge={badge}
              withTilt={tilt}
              src={activeAsset?.image_preview_url}
            />
          </pre>

          <fieldset>
            <legend>Verification visuals</legend>
            <div className="field-row">
              <input
                id="radioBadge"
                type="radio"
                name="badge"
                checked={badge}
                onChange={handleVizChange}
              />
              <label htmlFor="radioBadge">Badge</label>
            </div>
            <div className="field-row">
              <input
                id="radioTilt"
                type="radio"
                name="tilt"
                checked={tilt}
                onChange={handleVizChange}
              />
              <label htmlFor="radioTilt">Gloss</label>
            </div>
          </fieldset>

          {embedCode && (
            <pre className={styles.embedCodeContainer}>
              <p>{embedCode}</p>
            </pre>
          )}
          <button onClick={handleEmbedCodeGeneration}>
            Generate embed code
          </button>
        </div>
      </Popup>
    </div>
  );
}
