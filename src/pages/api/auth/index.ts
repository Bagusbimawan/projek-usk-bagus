import { NextApiRequest, NextApiResponse } from "next";
const bycrypt = require("bcryptjs");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export  default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { Username, Password } = req.body;
    try {
      const login = await prisma.user.findFirst({
        where: {
          user: Username,
        },
      });

      if (!login) {
        return res.status(400).send({
          message: "user tidak ditemukan",
        });
      }

      const loginpassword =  await bycrypt.compare(Password, login.password);
      if (!loginpassword) {
        return res.status(400).send({
          message: "password salah",
        });
      }

      res.status(200).send({
        message: "berhasil login",
        data: login,
      });
    } catch (error) {
      res.send({
        message: "internal server error",
      });
    }
  }
}
