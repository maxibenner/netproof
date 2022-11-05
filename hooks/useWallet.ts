import { useState, useEffect } from "react";

// Check if user has MetaMask extension installed
export const useWallet = () => {
  const [hasWallet, setHasWallet] = useState<boolean>();
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") handleEthInit();
    else window.addEventListener("ethereum#initialized", handleEthInit);
  }, []);

  function handleEthInit() {
    if (window.ethereum) {
      setHasWallet(true);
    } else {
      setHasWallet(false);
      setWallet(null);
    }
  }

  // Prompt user to connect their metamask wallet
  async function connectWallet() {
    try {
      const wallet = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setHasWallet(true);
      setWallet(wallet);
      console.log("Wallet has been connected successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return { hasWallet: hasWallet, wallet: wallet, connectWallet: connectWallet };
};
