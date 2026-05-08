import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Sparkles, Mic, Trash2, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import { useChatStore } from '@/stores/chatStore';
import { useContentStore } from '@/stores/contentStore';
import { useLocalized, useT } from '@/lib/i18n';
import ChatMessage from './ChatMessage';

export default function ChatPanel() {
  const { messages, addMessage, isTyping, setIsTyping, clearChat, setIsOpen } = useChatStore();
  const { chatbot } = useContentStore();
  const L = useLocalized();
  const t = useT();
  const [input, setInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcome = L(chatbot.welcomeMessage, chatbot.welcomeMessage_ar);
      const suggestions = `You can ask questions related to:\n• Infrastructure\n• Smart Cities\n• GIS Data\n• Roads & Utilities\n• Environmental Layers\n• Urban Planning\n• Spatial Analytics\n• Government Infrastructure Services`;
      
      setIsTyping(true);
      setTimeout(() => {
        addMessage({
          role: 'assistant',
          content: `${welcome}\n\n${suggestions}`,
          type: 'text'
        });
        setIsTyping(false);
      }, 1000);
    }
  }, []);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    addMessage({ role: 'user', content: text });
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      processUserMessage(text);
    }, 1500);
  };

  const processUserMessage = (text: string) => {
    const query = text.toLowerCase();
    
    // Check for restricted keywords
    const isRestricted = chatbot.restrictedKeywords.some(keyword => query.includes(keyword));
    
    if (isRestricted) {
      addMessage({
        role: 'assistant',
        content: `This question is not related to BSDI infrastructure services.\n\nPlease ask relevant questions related to:\n• Bahrain infrastructure\n• GIS data\n• Spatial analytics\n• Urban planning\n• Utilities\n• Smart city systems`,
        type: 'warning'
      });
      setIsTyping(false);
      return;
    }

    // Keyword matching for professional responses
    let response = "";
    if (query.includes('road') || query.includes('highway') || query.includes('transport')) {
      response = "Bahrain's road infrastructure is managed through advanced GIS mapping. Currently, the BSDI portal provides detailed layers for primary highways, arterial roads, and future transportation planning zones.";
    } else if (query.includes('smart city') || query.includes('iot')) {
      response = "Bahrain is accelerating its Smart City initiatives by integrating IoT sensors with 3D geospatial twins. This allows real-time monitoring of urban utilities and environmental metrics.";
    } else if (query.includes('utility') || query.includes('water') || query.includes('electricity')) {
      response = "Utility networks, including water distribution and power grids, are a core component of the BSDI spatial database. We offer restricted access layers for government agencies to manage these critical assets.";
    } else if (query.includes('gis') || query.includes('data') || query.includes('layer')) {
      response = "The BSDI platform hosts over 150+ spatial data layers. These include topographic maps, administrative boundaries, and thematic data sets available for government and private sector integration.";
    } else {
      response = "As your BSDI assistant, I can confirm that we provide comprehensive geospatial data for Bahrain. Could you specify if you are interested in roads, utilities, environmental layers, or urban planning data?";
    }

    addMessage({
      role: 'assistant',
      content: response,
      type: 'text'
    });
    setIsTyping(false);
  };

  return (
    <div 
      className={`bg-white/90 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-black/5 dark:border-white/10 flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${
        isFullscreen 
          ? 'fixed inset-3 sm:inset-4 w-auto h-auto z-[9999]' 
          : 'w-[380px] h-[560px] max-h-[80vh]'
      }`}
    >
      {/* Header — Compact & Premium */}
      <div 
        className="px-5 py-3 flex items-center justify-between shrink-0"
        style={{ background: `linear-gradient(135deg, ${chatbot?.themeColor || '#003366'} 0%, #1a4f8a 100%)` }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
              <Bot size={20} className="text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-[#003366]" />
          </div>
          <div>
            <h3 className="text-white font-bold text-[13px] leading-tight">
              {L(chatbot.assistantName, chatbot.assistantName_ar)}
            </h3>
            <p className="text-white/50 text-[9px] uppercase font-bold tracking-[0.15em] mt-0.5">
              Online • Infrastructure AI
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
            title="Minimize"
          >
            <Minimize2 size={14} />
          </button>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
            title={isFullscreen ? "Restore" : "Expand"}
          >
            <Maximize2 size={14} />
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages — Clean scrolling */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 space-y-3 scroll-smooth"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,51,102,0.15) transparent' }}
      >
        {messages.length === 0 && !isTyping && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-10">
            <Sparkles size={40} className="mb-3 text-primary" />
            <p className="text-sm font-medium">Ask me anything about<br/>Bahrain Infrastructure</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shrink-0">
              <Bot size={18} />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-md">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-1.5 w-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-1.5 w-1.5 bg-primary/40 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips — Smooth horizontal scroll */}
      <div className="px-4 py-2.5 overflow-x-auto border-t border-black/5 dark:border-white/5" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-2 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
          {L(chatbot.suggestionChips, chatbot.suggestionChips_ar)?.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSend(chip)}
              className="snap-start whitespace-nowrap px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 border border-black/5 dark:border-white/10 text-[11px] font-bold text-primary/70 dark:text-blue-300/70 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input — Compact glass style */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-black/5 dark:border-white/5">
        <div className="relative group focus-within:ring-2 focus-within:ring-primary/20 rounded-2xl transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your question..."
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-3 pr-[84px] text-sm focus:outline-none transition-all resize-none h-[48px] min-h-[48px] max-h-[100px] placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            <button className="p-2 text-primary/25 hover:text-primary transition-colors" title="Voice input">
              <Mic size={16} />
            </button>
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={`p-2 rounded-xl transition-all ${
                input.trim() ? 'bg-primary text-white shadow-md hover:shadow-lg' : 'text-primary/15'
              }`}
            >
              {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] text-gray-400 dark:text-gray-600 font-medium px-1">
          <button onClick={clearChat} className="hover:text-accent transition-colors flex items-center gap-1">
            <Trash2 size={10} /> Clear
          </button>
          <span>⏎ Enter to send</span>
        </div>
      </div>
    </div>
  );
}
