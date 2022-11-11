// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/firebase";

type Data = {
  name: string;
};

export default async function createVerifiedNFT(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // await db.collection("users").doc("user1").set({ test: "test" });
  res.status(200).json({ name: "John Doe" });
}
