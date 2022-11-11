// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "./init";

type Data = {
  name: string;
};

export default function createVerifiedNFT(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  admin.app().firestore().collection("verifiedNFTs").add({ test: "test" });
  res.status(200).json({ name: "John Doe" });
}
