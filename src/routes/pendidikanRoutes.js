import express from "express";

import authenticateToken from "../middlewares/authMiddleware.js";
import {
  getAllPendidikan,
  getPendidikanById,
  createPendidikan,
  updatePendidikan,
  deletePendidikan,
} from "../controllers/pendidikanController.js";

const router = express.Router();

router.get("/", authenticateToken, getAllPendidikan);

router.get("/:id", authenticateToken, getPendidikanById);

router.post("/", authenticateToken, createPendidikan);

router.put("/:id", authenticateToken, updatePendidikan);

router.delete("/:id", authenticateToken, deletePendidikan);

export default router;
