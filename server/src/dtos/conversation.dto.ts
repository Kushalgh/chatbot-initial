import { ObjectId } from "mongoose";

export interface ResponseDto {
  text: string;
  nextNodeId: ObjectId | null;
}

export interface ChatbotNodeDto {
  id?: string;
  question: string;
  responses: ResponseDto[];
}

export interface CreateChatbotNodeDto {
  question: string;
  responses: ResponseDto[];
}

export interface UpdateChatbotNodeDto {
  question?: string;
  responses?: ResponseDto[];
}

export interface TraverseNodeDto {
  nodeId: string;
  responseText: string;
}
