// components/ChatFab.tsx
'use client';

import { MessageCircle, X } from 'lucide-react';

interface ChatFabProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatFab({ isOpen, onClick }: ChatFabProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out
                  ${isOpen 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-blue-600 hover:bg-blue-700'} 
                  text-white focus:outline-none focus:ring-2 focus:ring-offset-2 
                  ${isOpen ? 'focus:ring-red-400' : 'focus:ring-blue-400'}`}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
    </button>
  );
}