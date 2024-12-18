import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import { Conversation, Message } from '../../types/chat';
import { ChatMessage } from './ChatMessage';

interface ChatWindowProps {
  chat: Conversation;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatWindow({ chat, messages, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* En-tête */}
      <header className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-medium text-gray-900">{chat.name}</h3>
          <p className="text-sm text-gray-500">{chat.status}</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwn={message.senderId === 'me'}
          />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-blue-500 transition-colors">
            <Mic className="w-6 h-6" />
          </button>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Écrivez votre message..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="text-blue-500 hover:text-blue-600 transition-colors disabled:opacity-50"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}