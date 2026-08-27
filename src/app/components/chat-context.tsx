"use client";
import React, { createContext, useContext, useState } from "react";
import Chatbot from "./chatbot";

interface ChatContextValue {
  open: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextValue>({
  open: false,
  openChat: () => {},
  closeChat: () => {},
});

export const useChat = () => useContext(ChatContext);

/**
 * Holds the chat panel's open state so the header can trigger it while the
 * panel itself renders once, at the root — it stays mounted so it can animate
 * both in and out.
 */
export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        open,
        openChat: () => setOpen(true),
        closeChat: () => setOpen(false),
      }}
    >
      {children}
      <Chatbot open={open} onClose={() => setOpen(false)} />
    </ChatContext.Provider>
  );
}
