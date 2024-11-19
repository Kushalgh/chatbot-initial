import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { router as conversationRoutes } from "../src/routes/conversation.routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/conversation", conversationRoutes);

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
