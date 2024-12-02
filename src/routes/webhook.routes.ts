import express from "express";
import { handleAccountValidation } from "../controllers/webhook.controller";

const router = express.Router();

router.post("/account-validation", handleAccountValidation);

export default router;
