import mongoose, { Schema, Document, model } from "mongoose";
import { ChatbotNodeDto } from "../dtos/conversation.dto";

export interface ChatbotNode extends ChatbotNodeDto {}

const chatbotNodeSchema = new Schema<ChatbotNode>({
  question: { type: String, required: true },
  responses: [
    {
      text: { type: String, required: true },
      nextNodeId: {
        type: Schema.Types.ObjectId,
        ref: "ChatbotNode",
        default: null,
      },
    },
  ],
});

export const ChatbotNodeModel = model<ChatbotNode>(
  "ChatbotNode",
  chatbotNodeSchema
);
