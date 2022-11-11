"use client";

import { useContext, useMemo } from "react";
import styles from "./styles.module.css";
import { WalletContext } from "../../context/walletContext";

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
  const { hasWallet, connectWallet, selectedAccount } =
    useContext(WalletContext);
  const status = useMemo(() => {
    // Initializing
    if (hasWallet === undefined) return "";
    // No wallet installed
    else if (!hasWallet) return "Install Wallet";
    // Wallet installed
    else {
      // Not connected
      if (!selectedAccount) return "Sign in with Wallet";
      // Connected
      else return "Connected";
    }
  }, [hasWallet, selectedAccount]);

  // Route to MetaMask install page if no wallet is detected
  // Otherwise, connect to wallet
  function handleClick() {
    if (status === "Sign in with Wallet") connectWallet();
    else if (status === "Install Wallet")
      window.open("https://metamask.io/download", "_blank");
    else console.log("Button has not yet been initialized");
  }

  return (
    <button
      disabled={status === "Connected"}
      onClick={handleClick}
      className={styles.button + " " + className}
    >
      {status}
    </button>
  );
}
