import React from 'react';
import { Conversation } from '../../types/chat';

interface ChatListItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export function ChatListItem({ conversation, isActive, onClick }: ChatListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-200
        ${isActive ? 'bg-blue-50' : ''}`}
    >
      <img
        src={conversation.avatar}
        alt={conversation.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      
      <div className="flex-1 text-left">
        <h4 className="font-medium text-gray-900">{conversation.name}</h4>
        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
      </div>

      {conversation.unreadCount > 0 && (
        <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
          {conversation.unreadCount}
        </span>
      )}
    </button>
  );
}