"use client";

import { useMemo } from "react";
import { useWallet } from "../../hooks/useWallet";
import styles from "./styles.module.css";

/**
 * A button to handle crypto wallet connections
 * Available wallets:
 * - Metamask
 * @param className
 * @return {JSX.Element} Button element
 */
export default function ButtonConnectWallet({
  className,
}: {
  className?: string;
}) {
  const { hasWallet, connectWallet, wallet } = useWallet();
  const buttonText = useMemo(() => {
    if (wallet) return "Connected";
    if (hasWallet) return "Connect Wallet";
    else hasWallet === undefined ? "" : "Install Wallet";
  }, [hasWallet, wallet]);

  // Route to MetaMask install page if no wallet is detected
  // Otherwise, connect to wallet
  function handleClick() {
    if (hasWallet === undefined) return;
    if (hasWallet === true) {
      connectWallet();
    } else {
      window.open("https://metamask.io/download", "_blank");
    }
  }

  return (
    <button
      disabled={wallet !== null}
      onClick={handleClick}
      className={styles.button + " " + className}
    >
      {buttonText}
    </button>
  );
}
