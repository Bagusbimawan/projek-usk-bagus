import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
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
      const siswa = await prisma.siswa.delete({
        where: {
          ID: id,
        },
      });
      res.status(200).send({
        message: "succes delete",
      });
    } catch (error) {
      res.status(500).send({
        message: "internal server error",
      });
    }
  }
}
