"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Bot, X, Sparkles } from "lucide-react";
import MessageBubble, { Message } from "./messageBubble";

interface ChatWindowProps {
  onClose: () => void;
  isclose: boolean;
}

const suggestions = [
  "What services do you offer?",
  "Tell me about your projects",
  "How can I contact you?",
];

export default function ChatWindow({ onClose, isclose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isWaiting]);

  const sendMessage = async (text: string) => {
    const userMessageText = text.trim();
    if (userMessageText === "" || isWaiting) return;

    const userMessage: Message = {
      id: Date.now(),
      text: userMessageText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsWaiting(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessageText, messages }),
      });

      const data = await response.json();

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
      setIsWaiting(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div
      className={`fixed bottom-20 right-6 w-[calc(100%-3rem)] max-w-md h-[70vh] max-h-[600px] bg-[#0a0a0d]/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/20 flex flex-col overflow-hidden border border-white/10 transition-all duration-300 z-50 ${
        isclose ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Header */}
      <header className="relative p-4 flex items-center justify-between border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10 pointer-events-none" />
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-light leading-tight">
              Audie<span className="text-gradient">.bot</span>
            </h2>
            <p className="text-[11px] text-secondary flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              AI Assistant · Online
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:text-light hover:bg-white/10 transition-all duration-300"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </header>

      {/* Message List */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
        {/* Empty state with suggestions */}
        {messages.length === 0 && !isWaiting && (
          <div className="h-full flex flex-col items-center justify-center text-center gap-4 px-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
              <Sparkles size={26} className="text-sky-300" />
            </div>
            <div>
              <p className="text-light font-semibold">
                Hi! I&apos;m Audie&apos;s AI assistant.
              </p>
              <p className="text-secondary text-sm mt-1">
                Ask me anything about Audie&apos;s work, skills, or services.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full mt-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-sm text-secondary hover:text-light bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 rounded-full px-4 py-2.5 transition-all duration-300 cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing Indicator */}
        {isWaiting && (
          <div className="flex items-end gap-2 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div
              className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/5 border border-white/10"
              aria-live="polite"
            >
              <div className="flex items-center gap-1.5">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-white/10 p-3"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-light placeholder:text-secondary/60 focus:outline-none focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 transition-all"
            aria-label="Chat message input"
            disabled={isWaiting}
          />
          <button
            type="submit"
            className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
            disabled={!inputValue.trim() || isWaiting}
            aria-label="Send message"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
