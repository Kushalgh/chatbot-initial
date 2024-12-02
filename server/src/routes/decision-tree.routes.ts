import express from "express";
import {
  addNode,
  updateNode,
  deleteNode,
  handleAccountValidation,
} from "../controllers/decision-tree.controller";

const router = express.Router();

router.post("/node", addNode);
router.put("/node/:id", updateNode);
router.delete("/node/:id", deleteNode);
router.post("/validate-account", handleAccountValidation);

export default router;
