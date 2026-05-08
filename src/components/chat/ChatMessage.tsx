import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Copy, Check, Info, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    type?: 'text' | 'chips' | 'warning' | 'stats' | 'map';
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.role === 'assistant';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex w-full mb-6 ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex max-w-[85%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'} gap-3`}>
        {/* Avatar */}
        <div className={`shrink-0 h-9 w-9 rounded-xl flex items-center justify-center shadow-lg ${
          isAssistant ? 'bg-primary text-white' : 'bg-accent text-white'
        }`}>
          {isAssistant ? <Bot size={20} /> : <User size={20} />}
        </div>

        {/* Bubble */}
        <div className="flex flex-col gap-1">
          <div className={`relative px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isAssistant 
              ? 'bg-white/80 backdrop-blur-md text-primary border border-primary/5 rounded-tl-none' 
              : 'bg-primary text-white rounded-tr-none'
          }`}>
            {/* Confidence Label for Assistant */}
            {isAssistant && message.type !== 'warning' && (
              <div className="flex items-center gap-1 text-[10px] font-bold text-accent mb-2 uppercase tracking-wider">
                <ShieldCheck size={12} />
                Infrastructure Verified
              </div>
            )}

            {/* Content */}
            <div className="whitespace-pre-wrap font-medium">
              {message.content.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('•') ? 'pl-4 mb-1' : 'mb-2 last:mb-0'}>
                  {line}
                </p>
              ))}
            </div>

            {/* Actions for Assistant */}
            {isAssistant && (
              <button 
                onClick={copyToClipboard}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/5 rounded"
              >
                {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-primary/40" />}
              </button>
            )}
          </div>
          
          <span className={`text-[10px] opacity-50 font-medium ${isAssistant ? 'text-left ml-1' : 'text-right mr-1'}`}>
            {message.timestamp}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
