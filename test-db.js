import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.ts";

const databaseUrl = new URL(process.env.DATABASE_URL);

const adapter = new PrismaMariaDb({
  host: databaseUrl.hostname,
  port: Number(databaseUrl.port) || 3306,
  user: decodeURIComponent(databaseUrl.username),
  password: decodeURIComponent(databaseUrl.password),
  database: databaseUrl.pathname.replace("/", ""),
  connectionLimit: 1,
});

const prisma = new PrismaClient({
  adapter,
});

try {
  console.log("Mencoba koneksi ke MySQL...");

  console.log({
    host: databaseUrl.hostname,
    port: databaseUrl.port || "3306",
    user: databaseUrl.username,
    database: databaseUrl.pathname.replace("/", ""),
  });

  await prisma.$queryRaw`SELECT 1`;

  console.log("✅ Koneksi MySQL berhasil!");

  await prisma.$disconnect();
} catch (error) {
  console.error("❌ Koneksi MySQL gagal:");
  console.error(error);

  await prisma.$disconnect();
}
