export interface MessageDto {
  text: string;
  isUser: boolean;
  timestamp?: Date;
}

export interface ChatSessionDto {
  sessionId: string;
  messages: MessageDto[];
  context?: Map<string, string>;
}

export interface StartChatResponseDto {
  sessionId: string;
  message: MessageDto;
}

export interface SendMessageRequestDto {
  sessionId: string;
  nextNodeId: string;
  message: string;
}

export interface SendMessageResponseDto {
  message: MessageDto;
}

export interface WebhookRequestDto {
  sessionId: string;
  data: any;
}

export interface WebhookResponseDto {
  message: string;
}
