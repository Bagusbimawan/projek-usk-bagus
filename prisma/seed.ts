import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bycrypt = require("bcryptjs");
async function main() {
  try {
    const adminpassword = await bycrypt.hash("admin123", 10);
    const admin = await prisma.user.create({
      data: {
        admin_type: "admin",
        user: "admin",
        password: adminpassword,
      },
    });

    const userpassword =  await bycrypt.hash("user123", 10);
    const user = await prisma.user.create({
      data: {
        admin_type: "user",
        user: "user",
        password: userpassword,
      },
    });
  } catch (error) {
    console.log(error);
    
  }
}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    prisma.$disconnect;
  });
