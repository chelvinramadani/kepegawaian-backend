import "dotenv/config";

import bcrypt from "bcryptjs";

import prisma from "./src/lib/prisma.js";

const createAdmin = async () => {
  try {
    const username = "admin";
    const password = "admin123";
    const nama = "Administrator";
    const role = "admin";

    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      console.log("User admin sudah tersedia.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        nama,
        role,
      },
    });

    console.log("=================================");
    console.log("Admin berhasil dibuat");
    console.log("Username :", user.username);
    console.log("Password :", password);
    console.log("Role     :", user.role);
    console.log("=================================");
  } catch (error) {
    console.error("Gagal membuat admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();
