"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Bot, X } from "lucide-react";
import MessageBubble, { Message } from "./messageBubble";

interface ChatWindowProps {
  onClose: () => void;
  isclose: boolean;
}

export default function ChatWindow({ onClose, isclose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isWaiting, setIsWaiting] = useState(false); // <--- New state
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isWaiting]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const userMessageText = inputValue.trim();
    const userMessage: Message = {
      id: Date.now(),
      text: userMessageText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add user's message to the chat immediately
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsWaiting(true); // <--- Start waiting animation

    try {
      // Send the user's message to the API
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessageText, messages }),
      });

      const data = await response.json();

      // Add bot's response to the chat
      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.reply || "Sorry, I didn’t understand that.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message to Gemini API:", error);

      const errorMessage: Message = {
        id: Date.now() + 2,
        text: "There was an error connecting to the server. Please try again later.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsWaiting(false); // <--- Stop waiting animation
    }
  };

  return (
    <div
      className={`fixed bottom-20 right-6 w-[calc(100%-3rem)] max-w-md h-[70vh] max-h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700  transition-all duration-300 ${
        isclose ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Header */}
      <header className="bg-blue-600 dark:bg-blue-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot size={24} />
          <h2 className="text-lg font-semibold">Audie.bot</h2>
        </div>
        <button
          onClick={onClose}
          className="text-blue-200 hover:text-white focus:outline-none"
          aria-label="Close chat"
        >
          <X size={24} />
        </button>
      </header>

      {/* Message List */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing Indicator Bubble */}
        {isWaiting && (
          <div className="flex items-end space-x-2 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <Bot size={20} className="text-gray-600 dark:text-gray-300 animate-pulse" />
            </div>
            <div
              className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
              aria-live="polite"
            >
              <p className="text-sm italic animate-pulse">Audie.bot is typing...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} /> {/* For auto-scrolling */}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-750"
      >
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            aria-label="Chat message input"
            disabled={isWaiting} // optional: disable input while waiting
          />
          <button
            type="submit"
            className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-750 disabled:opacity-50"
            disabled={!inputValue.trim() || isWaiting} // disable send while waiting
            aria-label="Send message"
          >
            <SendHorizontal size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
