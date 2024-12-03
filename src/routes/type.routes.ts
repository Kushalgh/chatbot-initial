import express from "express";
import {
  createType,
  getAllTypes,
  getTypeById,
  updateType,
  deleteType,
} from "../controllers/type.controller";

const router = express.Router();

router.post("/types", createType);
router.get("/types", getAllTypes);
router.get("/types/:id", getTypeById);
router.put("/types/:id", updateType);
router.delete("/types/:id", deleteType);

export default router;
