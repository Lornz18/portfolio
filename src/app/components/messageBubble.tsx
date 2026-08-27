// components/MessageBubble.tsx
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
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-3 ${
          isUser
            ? "rounded-2xl rounded-br-md bg-accent text-background"
            : "rounded-2xl rounded-bl-md border border-line bg-surface-2 text-foreground"
        }`}
      >
        <p className="whitespace-pre-line text-sm leading-relaxed">
          {message.text}
        </p>
        {message.timestamp && (
          <p
            className={`label-sm mt-2 text-right ${
              isUser ? "text-background/60" : ""
            }`}
          >
            {message.timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
