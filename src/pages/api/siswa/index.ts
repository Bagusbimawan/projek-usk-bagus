import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { parse } from "path";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const siswa = await prisma.siswa.findMany();
      res.send({
        message: "succes fecth data",
        data: siswa,
      });
    } catch (error) {
      res.send({
        message: "internal server error",
      });
    }
  } else if (req.method === "POST") {
    const { Nis, Nama, Kelas, Jurusan } = req.body;
    try {
      const nis = await prisma.siswa.findFirst({
        where: {
          Nis,
        },
      });

      if (nis) {
        return res.status(400).send({
          message: "nis sudh ada ",
        });
      }
      const siswa = await prisma.siswa.create({
        data: {
          Nama,
          Kelas,
          Jurusan,
          Nis,
        },
      });

      res.status(200).send({
        message: "succes create data siswa",
        data: siswa,
      });
    } catch (error) {
      res.status(500).send({
        message: "internal server error",
      });
    }
  } else if (req.method === "PUT") {
    const { id, Nama, Kelas, Jurusan } = req.body;

    try {
      const siswa = await prisma.siswa.update({
        where: {
          ID: id,
        },
        data: {
          Nama,
          Kelas,
          Jurusan,
        },
      });

      res.status(200).send({
        message: "update succes data siswa",
        data: siswa,
      });
    } catch (error) {
      res.status(500).send({
        message: "internal server error",
      });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      // First check if the siswa exists
      const existingSiswa = await prisma.siswa.findUnique({
        where: {
          ID: parseInt(id),
        },
      });

      if (!existingSiswa) {
        return res.status(404).send({
          message: "Siswa not found",
        });
      }

      // await prisma.absensi.updateMany({
      //   where: {
      //     ID: parseInt(id),
      //   },
      //   data: {
      //     Idsiswa: null,
      //   },
      // });
      // Then delete the siswa record
      await prisma.siswa.delete({
        where: {
          ID: parseInt(id),
        },
      });

      res.status(200).send({
        message: "Success delete siswa and related absensi records",
      });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  }
}
