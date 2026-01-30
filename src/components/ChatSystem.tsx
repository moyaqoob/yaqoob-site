import React, { useRef, useEffect, useState } from 'react';
import type { ChatMessage } from '@/types/game';
import { Send, X } from 'lucide-react';

interface ChatSystemProps {
  messages: ChatMessage[];
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
  currentPlayerName: string;
}

const ChatSystem: React.FC<ChatSystemProps> = ({
  messages,
  isOpen,
  onClose,
  onSendMessage,
  currentPlayerName,
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isOpen) {
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => onClose()}
        className="fixed bottom-24 right-4 z-40 glass rounded-xl p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110"
      >
        <div className="relative">
          <span className="text-2xl">💬</span>
          {messages.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e94560] rounded-full text-xs flex items-center justify-center">
              {messages.length}
            </span>
          )}
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 z-50 w-96">
      <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xl">💬</span>
            <h3 className="font-bold text-white font-['Orbitron']">Chat</h3>
            <span className="text-xs text-gray-400">({messages.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-4xl mb-2">💭</p>
              <p>No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.playerName === currentPlayerName ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.playerName === currentPlayerName
                      ? 'bg-[#e94560] text-white rounded-br-sm'
                      : 'bg-white/10 text-white rounded-bl-sm'
                  }`}
                >
                  <p className="text-xs opacity-70 mb-1">
                    {msg.playerName} • {formatTime(msg.timestamp)}
                  </p>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#e94560] transition-colors"
              maxLength={200}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 bg-[#e94560] rounded-xl hover:bg-[#ff6b6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatSystem;
