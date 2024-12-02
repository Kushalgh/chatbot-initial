import mongoose, { Document, Schema } from "mongoose";

interface IMessage {
  text: string;
  isUser: boolean;
}

interface IChat extends Document {
  sessionId: string;
  messages: IMessage[];
  context: {
    currentScenario?: string;
    step?: string;
    tempData: Record<string, any>;
    currentNodeId: string;
  };
}

const messageSchema = new Schema<IMessage>({
  text: { type: String, required: true },
  isUser: { type: Boolean, required: true },
});

const chatSchema = new Schema<IChat>({
  sessionId: { type: String, required: true, unique: true },
  messages: [messageSchema],
  context: {
    currentScenario: String,
    step: String,
    tempData: { type: Map, of: Schema.Types.Mixed },
  },
});

const Chat = mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
