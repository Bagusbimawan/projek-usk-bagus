import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const absen = await prisma.absensi.findMany();
      res.status(200).send({
        message: "fetch succes absen",
        data: absen,
      });
    } catch (error) {
      console.error("Error fetching absensi:", error);
      res.status(500).send({
        message: "internal server error",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  } else if (req.method === "POST") {
    const { nis, keterangan, terlambat, point, sanksi } = req.body;
    try {
      const siswa = await prisma.siswa.findFirst({
        where: {
          Nis: nis,
        },
      });

      if (!siswa) {
        return res.status(400).send({
          message: "siswa tidak ditemukan",
        });
      }

      const absen = await prisma.absensi.create({
        data: {
          masuk: new Date(),
          keterangan,
          terlambat,
          point,
          sanksi,
          Idsiswa: siswa.ID,
          Nis: nis,
        },
      });

      res.status(200).send({
        message: "succes absensi create",
        data: absen,
      });
    } catch (error) {
      console.error("Error creating absensi:", error);
      res.status(500).send({
        message: "internal server error",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  } else if (req.method === "PUT") {
    const { id, keterangan, terlambat, point, sanksi } = req.body;
    try {
      const absen = await prisma.absensi.update({
        where: {
          ID: id,
        },
        data: {
          masuk: new Date(),
          keterangan,
          terlambat,
          point,
          sanksi,
        },
      });
      res.status(200).send({
        message: "update succes",
        data: absen,
      });
    } catch (error) {
      console.error("Error updating absensi:", error);
      res.status(500).send({
        message: "internal server error",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      const absen = await prisma.absensi.delete({
        where: {
          ID: id,
        },
      });
        
      res.status(200).send({
        message: "Delete Succes",
      });
    } catch (error) {
      console.error("Error deleting absensi:", error);
      res.status(500).send({
        message: "internal server error",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
}
