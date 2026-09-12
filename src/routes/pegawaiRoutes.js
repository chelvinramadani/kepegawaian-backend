import express from "express";
import authenticateToken from "../middlewares/authMiddleware.js";

import {
  getAllPegawai,
  getPegawaiById,
  createPegawai,
  updatePegawai,
  deletePegawai,
} from "../controllers/pegawaiController.js";

const router = express.Router();

router.get("/", authenticateToken, getAllPegawai);

router.get("/:id", authenticateToken, getPegawaiById);

router.post("/", authenticateToken, createPegawai);

router.put("/:id", authenticateToken, updatePegawai);

router.delete("/:id", authenticateToken, deletePegawai);

export default router;
