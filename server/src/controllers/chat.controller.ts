import { Request, Response, RequestHandler } from "express";
import Chat from "../models/chat.model";
import DecisionTreeNode from "../models/decision-tree.model";
import { v4 as uuidv4 } from "uuid";
import { StartChatResponseDto, SendMessageRequestDto } from "../dtos/chat.dto";
import { callWebhook } from "../services/webhook.service";

export const startChat: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const sessionId = uuidv4();
    const rootNode = await DecisionTreeNode.findOne({ parentId: null });

    if (!rootNode) {
      res.status(500).json({ error: "Decision tree not initialized" });
      return;
    }

    const newChat = new Chat({
      sessionId,
      messages: [
        {
          text: rootNode.text,
          isUser: false,
        },
      ],
      context: {
        currentNodeId: rootNode.id,
        tempData: {},
      },
    });

    await newChat.save();

    const response: StartChatResponseDto = {
      sessionId,
      message: newChat.messages[0],
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const sendMessage: RequestHandler<SendMessageRequestDto> = async (
  req: Request<{}, {}, SendMessageRequestDto>,
  res: Response
) => {
  try {
    const { sessionId, message, nextNodeId } = req.body;

    const chat = await Chat.findOne({ sessionId });

    if (!chat) {
      res.status(404).json({ error: "Chat session not found" });
      return;
    }

    const currentNode = await DecisionTreeNode.findOne({ id: nextNodeId });

    if (!currentNode) {
      res.status(500).json({ error: "Current node not found" });
      return;
    }

    let botResponse = currentNode.text;
    let webhookResponse = null;

    if (currentNode.webhookUrl) {
      try {
        webhookResponse = await callWebhook(currentNode.webhookUrl, {
          sessionId,
          message,
          context: chat.context,
        });

        if (webhookResponse.message) botResponse = webhookResponse.message;

        if (webhookResponse.context) {
          chat.context = { ...chat.context, ...webhookResponse.context };
        }
      } catch (error) {
        console.error("Webhook call failed:", error);
        botResponse =
          "I'm sorry, there was an error processing your request. Please try again later.";
      }
    }

    chat.messages.push({ text: message, isUser: true });
    chat.messages.push({ text: botResponse, isUser: false });

    chat.context.currentNodeId = nextNodeId;

    await chat.save();

    const response: Record<string, any> = {
      message: botResponse,
      childrens: currentNode.childrenIds,
      parentId: currentNode.parentId,
    };

    if (webhookResponse?.nextNodeId) {
      response.nextNodeId = webhookResponse.nextNodeId;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
