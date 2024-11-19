import { ChatbotNodeRepository } from "../repositories/conversation.repository";
import { ChatbotNode } from "../models/conversationNode.model";
import {
  CreateChatbotNodeDto,
  UpdateChatbotNodeDto,
  TraverseNodeDto,
} from "../dtos/conversation.dto";

export const ChatbotNodeService = {
  async getNodeById(id: string): Promise<ChatbotNode | null> {
    return ChatbotNodeRepository.findById(id);
  },

  async createNode(data: CreateChatbotNodeDto): Promise<ChatbotNode> {
    return ChatbotNodeRepository.create(data);
  },

  async updateNode(
    id: string,
    data: UpdateChatbotNodeDto
  ): Promise<ChatbotNode | null> {
    return ChatbotNodeRepository.update(id, data);
  },

  async traverseNode(
    traverseData: TraverseNodeDto
  ): Promise<ChatbotNode | null> {
    const currentNode = await ChatbotNodeRepository.findById(
      traverseData.nodeId
    );
    if (!currentNode) return null;

    const nextResponse = currentNode.responses.find(
      (response) => response.text === traverseData.responseText
    );

    if (!nextResponse || !nextResponse.nextNodeId) return null;

    return ChatbotNodeRepository.findById(nextResponse.nextNodeId.toString());
  },
};
