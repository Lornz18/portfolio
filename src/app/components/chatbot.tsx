"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, X } from "lucide-react";
import MessageBubble, { Message } from "./messageBubble";

interface ChatWindowProps {
  open: boolean;
  onClose: () => void;
}

const suggestions = [
  "What services do you offer?",
  "Tell me about your projects",
  "How can I contact you?",
];

export default function ChatWindow({ open, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaiting]);

  // Focus the input on open, and let Escape dismiss the panel.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const sendMessage = async (text: string) => {
    const userMessageText = text.trim();
    if (userMessageText === "" || isWaiting) return;

    const stamp = () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    const userMessage: Message = {
      id: Date.now(),
      text: userMessageText,
      sender: "user",
      timestamp: stamp(),
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
        timestamp: stamp(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message to Gemini API:", error);

      const errorMessage: Message = {
        id: Date.now() + 2,
        text: "There was an error connecting to the server. Please try again later.",
        sender: "bot",
        timestamp: stamp(),
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
    <>
      {/* Softens the page behind the panel so it reads against the hero type */}
      <div
        aria-hidden
        onClick={onClose}
        className={`chat-backdrop ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-label="Chat with Audie's AI assistant"
        aria-hidden={!open}
        className={`chat-panel flex flex-col overflow-hidden rounded-[20px] border border-line bg-surface transition-all duration-500 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-8 opacity-0"
        }`}
      >
      {/* Header */}
      <header className="flex flex-none items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div className="flex flex-col gap-1.5">
          <p className="display text-base">audie.bot</p>
          <p className="label-sm flex items-center gap-2">
            <span className="dot" />
            AI assistant · online
          </p>
        </div>
        <button
          onClick={onClose}
          className="grid h-9 w-9 flex-none cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
          aria-label="Close chat"
        >
          <X size={17} />
        </button>
      </header>

      {/* Messages */}
      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && !isWaiting && (
          <div className="flex h-full flex-col justify-center gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-[15px] text-foreground">
                Hi — I&apos;m Audie&apos;s AI assistant.
              </p>
              <p className="text-sm leading-relaxed text-muted">
                Ask me anything about his work, skills, or services.
              </p>
            </div>

            <div className="flex flex-col">
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="group flex cursor-pointer items-baseline gap-3 border-t border-line py-3.5 text-left last:border-b"
                >
                  <span className="label flex-none">
                    ( {String(i + 1).padStart(2, "0")} )
                  </span>
                  <span className="text-sm text-muted transition-colors duration-300 group-hover:text-accent">
                    {s}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isWaiting && (
          <div className="flex justify-start">
            <div
              className="rounded-2xl rounded-bl-md border border-line bg-surface-2 px-4 py-3"
              aria-live="polite"
            >
              <div className="flex items-center gap-1.5">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex-none border-t border-line p-3"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-line bg-background px-4 py-3 text-sm text-foreground transition-colors duration-300 placeholder:text-dim focus:border-accent focus:outline-none"
            aria-label="Chat message input"
            disabled={isWaiting}
          />
          <button
            type="submit"
            className="grid h-11 w-11 flex-none cursor-pointer place-items-center rounded-full bg-accent text-background transition-transform duration-300 hover:scale-105 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            disabled={!inputValue.trim() || isWaiting}
            aria-label="Send message"
          >
            <ArrowUp size={18} />
          </button>
        </div>
        </form>
      </div>
    </>
  );
}
