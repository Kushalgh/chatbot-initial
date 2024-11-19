import { Request, Response } from "express";
import { ChatbotNodeService } from "../services/conversation.service";
import {
  CreateChatbotNodeDto,
  UpdateChatbotNodeDto,
  TraverseNodeDto,
} from "../dtos/conversation.dto";

export const ChatbotNodeController = {
  async getNodeById(req: Request, res: Response) {
    try {
      const node = await ChatbotNodeService.getNodeById(req.params.id);
      if (!node) {
        res.status(404).json({ message: "Node not found" });
        return;
      }
      res.json(node);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  async createNode(req: Request, res: Response) {
    try {
      const nodeData: CreateChatbotNodeDto = req.body;
      const savedNode = await ChatbotNodeService.createNode(nodeData);
      res.status(201).json(savedNode);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  async traverseNode(req: Request, res: Response) {
    try {
      const traverseData: TraverseNodeDto = req.body;
      const nextNode = await ChatbotNodeService.traverseNode(traverseData);

      if (!nextNode) {
        res.json({ message: "End of conversation", nextNode: null });
        return;
      }

      res.json(nextNode);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  async updateNode(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData: UpdateChatbotNodeDto = req.body;
      const updatedNode = await ChatbotNodeService.updateNode(id, updateData);

      if (!updatedNode) {
        res.status(404).json({ message: "Node not found" });
        return;
      }

      res.json(updatedNode);
    } catch (error) {
      console.error("Error updating node:", error);
      res.status(500).json({ message: "Server error", error });
    }
  },
};
