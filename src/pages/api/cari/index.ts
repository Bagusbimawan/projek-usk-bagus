import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { Nis } = req.body;
    try {
      const absensi = await prisma.absensi.findFirst({
        where: {
          Nis: Nis,
        },
        include: {
          siswa: true,
        },
      });

      if (!absensi) {
        return res.status(404).json({ message: "absensi not found" });
      }
      res.status(200).json({ message: "succes search", data: absensi });
    } catch (error) {
      res.status(500).json({ message: "error search", error: error });
    }
  }
}
