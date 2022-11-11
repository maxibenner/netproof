import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/firebase";

type Data = {
  nonce: string | null;
  message: string | null;
};

export default async function getNonce(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const walletAddress = req.query.walletAddress;

    // Check if wallet address (user id) has been provided
    if (!walletAddress || typeof walletAddress !== "string") {
      return res
        .status(400)
        .json({ message: "No wallet address provided", nonce: null });
    }
    // Get the user doc for provided wallet address
    const userDoc = await db.collection("users").doc(walletAddress).get();
    if (userDoc.exists) {
      // User doc esists, return nonce
      const existingNonce = userDoc.data()?.nonce;
      return res.status(200).json({
        nonce: existingNonce,
        message: "Nonce retrieved from existing user",
      });
    } else {
      // User document does not exist, create it first
      const generatedNonce = Math.floor(Math.random() * 1000000000).toString();

      // Associate the nonce with that user
      await db.collection("users").doc(walletAddress).set({
        walletAddress: walletAddress,
        nonce: generatedNonce,
      });
      return res.status(200).json({
        nonce: generatedNonce,
        message: "Nonce retrieved from newly created user",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ nonce: null, message: "Server error" });
  }
}
