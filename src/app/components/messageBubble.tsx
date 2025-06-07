// components/MessageBubble.tsx
import { Bot, User } from 'lucide-react'; // Optional: for avatars

export interface Message {
  id: string | number;
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string; // Optional
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-end space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
          <Bot size={20} className="text-gray-600 dark:text-gray-300" />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow
                    ${isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                    }`}
      >
        <p className="text-sm">{message.text}</p>
        {message.timestamp && (
          <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'} text-right`}>
            {message.timestamp}
          </p>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
      )}
    </div>
  );
}