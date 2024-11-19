import { Router } from "express";
import { ChatbotNodeController } from "../controllers/conversation.controller";

export const router = Router();

router.get("/:id", ChatbotNodeController.getNodeById);
router.post("/create", ChatbotNodeController.createNode);
router.post("/traverse", ChatbotNodeController.traverseNode);
router.put("/:id", ChatbotNodeController.updateNode);
