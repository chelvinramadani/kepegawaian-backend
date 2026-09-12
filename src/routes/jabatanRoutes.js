import express from "express";
import authenticateToken from "../middlewares/authMiddleware.js";

import {
  getAllJabatan,
  getJabatanById,
  createJabatan,
  updateJabatan,
  deleteJabatan,
} from "../controllers/jabatanController.js";

const router = express.Router();

router.get("/", authenticateToken, getAllJabatan);

router.get("/:id", authenticateToken, getJabatanById);

router.post("/", authenticateToken, createJabatan);

router.put("/:id", authenticateToken, updateJabatan);

router.delete("/:id", authenticateToken, deleteJabatan);

export default router;
