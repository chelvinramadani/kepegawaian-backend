import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import pegawaiRoutes from "./routes/pegawaiRoutes.js";
import jabatanRoutes from "./routes/jabatanRoutes.js";
import unitKerjaRoutes from "./routes/unitKerjaRoutes.js";
import pendidikanRoutes from "./routes/pendidikanRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;

// ========================
// Middleware
// ========================

app.use(cors());
app.use(express.json());

// ========================
// Root
// ========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SIMPEG API berjalan",
  });
});

// ========================
// API Routes
// ========================
app.use("/api/auth", authRoutes);

app.use("/api/pegawai", pegawaiRoutes);

app.use("/api/jabatan", jabatanRoutes);

app.use("/api/unit-kerja", unitKerjaRoutes);

app.use("/api/pendidikan", pendidikanRoutes);

app.use("/api/dashboard", dashboardRoutes);

// ========================
// 404
// ========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// ========================
// Error Handler
// ========================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

// ========================
// Start Server
// ========================

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`SIMPEG API`);
  console.log(`Server : http://localhost:${PORT}`);
  console.log(`=================================`);
});
