import express from "express";

import authenticateToken from "../middlewares/authMiddleware.js";
import {
  getAllUnitKerja,
  getUnitKerjaById,
  createUnitKerja,
  updateUnitKerja,
  deleteUnitKerja,
} from "../controllers/unitKerjaController.js";

const router = express.Router();

router.get("/", authenticateToken, getAllUnitKerja);

router.get("/:id", authenticateToken, getUnitKerjaById);

router.post("/", authenticateToken, createUnitKerja);

router.put("/:id", authenticateToken, updateUnitKerja);

router.delete("/:id", authenticateToken, deleteUnitKerja);

export default router;
