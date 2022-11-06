"use client";

import { createContext, useState, useEffect } from "react";
import { OpenseaAsset } from "../types/OpenseaAsset";
import { fetchOpenseaAssets } from "../utils/getAssets";

export const WalletContext = createContext<WalletContextType>(null!);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [hasWallet, setHasWallet] = useState<boolean>();
  const [account, setAccount] = useState<string[]>([]);
  const [assets, setAssets] = useState<OpenseaAsset[]>([]);
  const [activeAsset, setActiveAsset] = useState<OpenseaAsset | null>(null);

  useEffect(() => {
    if (window.ethereum) setHasWallet(true);
    else {
      setHasWallet(false);
      window.addEventListener("ethereum#initialized", () => setHasWallet(true));
    }
  }, []);

  // Prompt user to connect their MetaMask wallet
  async function connectWallet() {
    if (!hasWallet)
      return console.log(
        "Could not connect wallet because no wallet is installed"
      );

    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);
      setHasWallet(true);

      const { assets } = await fetchOpenseaAssets(account[0]);
      setAssets(assets);
      console.log("Wallet has been connected successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <WalletContext.Provider
      value={{
        hasWallet,
        account,
        connectWallet,
        assets,
        activeAsset,
        setActiveAsset,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export type WalletContextType = {
  hasWallet: boolean | undefined;
  account: string[];
  assets: any[];
  connectWallet: () => void;
  activeAsset: OpenseaAsset | null;
  setActiveAsset: (asset: OpenseaAsset | null) => void;
};
