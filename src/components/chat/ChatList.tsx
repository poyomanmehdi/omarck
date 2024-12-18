import React from 'react';
import { Search } from 'lucide-react';
import { Conversation } from '../../types/chat';
import { ChatListItem } from './ChatListItem';
import { ChatListSkeleton } from './ChatListSkeleton';

interface ChatListProps {
  conversations: Conversation[];
  currentChat: Conversation | null;
  onSelect: (conversation: Conversation) => void;
  isLoading: boolean;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function ChatList({ 
  conversations, 
  currentChat, 
  onSelect, 
  isLoading,
  onSearch,
  searchQuery = ''
}: ChatListProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Rechercher une conversation..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <ChatListSkeleton />
        ) : conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Aucune conversation trouvée
          </div>
        ) : (
          conversations.map((conversation) => (
            <ChatListItem
              key={conversation.id}
              conversation={conversation}
              isActive={currentChat?.id === conversation.id}
              onClick={() => onSelect(conversation)}
            />
          ))
        )}
      </div>
    </div>
  );
}