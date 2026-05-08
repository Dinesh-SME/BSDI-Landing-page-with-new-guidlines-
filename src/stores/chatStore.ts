import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  type?: 'text' | 'chips' | 'warning' | 'stats' | 'map';
  suggestions?: string[];
  metadata?: any;
}

interface ChatState {
  messages: Message[];
  isOpen: boolean;
  isTyping: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsTyping: (isTyping: boolean) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isOpen: false,
      isTyping: false,
      addMessage: (message) => set((state) => ({
        messages: [
          ...state.messages,
          {
            ...message,
            id: Math.random().toString(36).substring(7),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ],
      })),
      setIsOpen: (isOpen) => set({ isOpen }),
      setIsTyping: (isTyping) => set({ isTyping }),
      clearChat: () => set({ messages: [] }),
    }),
    {
      name: 'bsdi-chat-history',
    }
  )
);
