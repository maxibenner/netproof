"use client";

import { createContext, useState, useEffect } from "react";
import { OpenseaAsset } from "../types/OpenseaAsset";
import { fetchOpenseaAssets } from "../utils/getAssets";
import { db } from "../lib/firebase";
import toHex from "../utils/toHex";

export const WalletContext = createContext<WalletContextType>(null!);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [hasWallet, setHasWallet] = useState<boolean>();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
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

      // Check if this wallet is registered with firebase
      // If not, register it
      const res = await fetch(
        "http://localhost:3000/api/getNonce?walletAddress=" + account[0]
      );
      const nonceResponse = await res.json();

      if (nonceResponse.nonce) {
        // Sign nonce
        const signature = await signData(nonceResponse.nonce);

        if (signature) {
          const userData = await fetch(
            "http://localhost:3000/api/getData?walletAddress=" +
              account[0] +
              "&signature=" +
              signature
          );
          const dataResponse = await userData.json();
          console.log(dataResponse);
        }
      }

      setSelectedAccount(window.ethereum.selectedAccount);
      setHasWallet(true);

      const { assets } = await fetchOpenseaAssets(account[0]);
      setAssets(assets);
      console.log("Wallet has been connected successfully");
    } catch (error) {
      console.log(error);
    }
  }

  // Sign
  async function signData(data: string) {
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [`0x${toHex(data)}`, window.ethereum.selectedAddress],
    });

    return signature;
  }

  return (
    <WalletContext.Provider
      value={{
        hasWallet,
        selectedAccount,
        connectWallet,
        assets,
        activeAsset,
        setActiveAsset,
        signData,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export type WalletContextType = {
  hasWallet: boolean | undefined;
  selectedAccount: string | null;
  assets: any[];
  connectWallet: () => void;
  activeAsset: OpenseaAsset | null;
  setActiveAsset: (asset: OpenseaAsset | null) => void;
  signData: (data: string) => void;
};
