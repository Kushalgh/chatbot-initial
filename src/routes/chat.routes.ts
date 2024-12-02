import express from "express";
import { startChat, sendMessage } from "../controllers/chat.controller";

const router = express.Router();

router.post("/start", startChat);
router.post("/message", sendMessage);

export default router;
