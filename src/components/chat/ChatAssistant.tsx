import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, Mic, Trash2, Maximize2, Copy, Check, Info } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useChatStore } from '@/stores/chatStore';
import { useContentStore } from '@/stores/contentStore';
import { useLocalized, useT } from '@/lib/i18n';
import ChatPanel from './ChatPanel';

export default function ChatAssistant() {
  const { isOpen, setIsOpen, messages, clearChat } = useChatStore();
  const { chatbot } = useContentStore();
  const L = useLocalized();
  const t = useT();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    // Show notification pulse on first visit or when enabled
    if (messages.length === 0 && chatbot.enabled) {
      setHasNewMessage(true);
    }
  }, [messages.length, chatbot.enabled]);

  if (!chatbot?.enabled || isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans" dir="ltr">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4"
          >
            <ChatPanel />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white/90 backdrop-blur-md text-primary text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-primary/10">
          {L(chatbot.assistantName, chatbot.assistantName_ar)}
        </div>

        {/* Pulse Notification */}
        {hasNewMessage && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
          </span>
        )}

        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasNewMessage(false);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={!isOpen ? {
            y: [0, -8, 0],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`h-14 w-14 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-300 ${
            isOpen ? 'bg-accent text-white' : 'bg-primary text-white'
          }`}
          style={{
            background: `linear-gradient(90deg, ${chatbot?.themeColor || '#003366'} 0%, #1a4f8a 100%)`,
            boxShadow: isOpen 
              ? '0 10px 30px rgba(227, 27, 35, 0.4)' 
              : `0 10px 30px rgba(0, 51, 102, 0.3)`
          }}
        >
          {/* Animated Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full animate-[shimmer_3s_infinite]" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="relative"
              >
                <Bot size={28} />
                <Sparkles size={14} className="absolute -top-1 -right-1 text-accent animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
