import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/firebase";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import toHex from "../../utils/toHex";

type Data = {
  message: string | null;
  data: any;
};

export default async function getData(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const walletAddress = req.query.walletAddress;
    const signature = req.query.signature;
    if (
      !walletAddress ||
      !signature ||
      typeof walletAddress !== "string" ||
      typeof signature !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Missing wallet address or signature", data: null });
    }

    // Get the nonce for this address
    const userDocRef = db.collection("users").doc(walletAddress);
    const userDoc = await userDocRef.get();
    if (userDoc.exists) {
      const existingNonce = userDoc.data()?.nonce;
      // Recover the address of the account used to create the given Ethereum signature.
      const recoveredAddress = recoverPersonalSignature({
        data: `0x${toHex(existingNonce)}`,
        signature: signature,
      });
      // See if that matches the address the user is claiming the signature is from
      if (recoveredAddress === walletAddress) {
        // The signature was verified - update the nonce to prevent replay attacks
        // update nonce
        await userDocRef.update({
          nonce: Math.floor(Math.random() * 1000000000).toString(),
        });
        // Return user data
        res.status(200).json({
          message: "Successfully verified and retrieved user data",
          data: userDoc.data(),
        });
      } else {
        // The signature could not be verified
        return res
          .status(401)
          .json({ message: "Ownership could not be verified", data: null });
      }
    } else {
      console.log("User doc does not exist");
      return res.status(500).json({ message: "Server error", data: null });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", data: null });
  }
}
