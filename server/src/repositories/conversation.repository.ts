import {
  ChatbotNodeModel,
  ChatbotNode,
} from "../models/conversationNode.model";
import {
  CreateChatbotNodeDto,
  UpdateChatbotNodeDto,
} from "../dtos/conversation.dto";

export const ChatbotNodeRepository = {
  async findById(id: string): Promise<ChatbotNode | null> {
    return ChatbotNodeModel.findById(id);
  },

  async create(data: CreateChatbotNodeDto): Promise<ChatbotNode> {
    const newNode = new ChatbotNodeModel(data);
    return newNode.save();
  },

  async update(
    id: string,
    data: UpdateChatbotNodeDto
  ): Promise<ChatbotNode | null> {
    return ChatbotNodeModel.findByIdAndUpdate(id, data, { new: true });
  },
};
