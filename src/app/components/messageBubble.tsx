// components/MessageBubble.tsx
import { Bot, User } from "lucide-react";

export interface Message {
  id: string | number;
  text: string;
  sender: "user" | "bot";
  timestamp?: string;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex items-end gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 flex items-center justify-center">
          <Bot size={18} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-2.5 ${
          isUser
            ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl rounded-br-md shadow-lg shadow-blue-500/20"
            : "bg-white/5 border border-white/10 text-light rounded-2xl rounded-bl-md"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {message.text}
        </p>
        {message.timestamp && (
          <p
            className={`text-[10px] mt-1 text-right ${
              isUser ? "text-white/60" : "text-secondary/70"
            }`}
          >
            {message.timestamp}
          </p>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
          <User size={16} className="text-light" />
        </div>
      )}
    </div>
  );
}
