import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(_req: NextApiRequest, res: NextApiResponse){
  res.status(200).json({ ok: true, app: process.env.APP_NAME || "app", ts: new Date().toISOString() });
}
