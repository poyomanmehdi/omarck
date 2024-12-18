import React from 'react';
import { ChatList } from '../components/chat/ChatList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { useChat } from '../hooks/useChat';

export function ChatPage() {
  const { 
    conversations,
    currentChat,
    messages,
    isLoading,
    searchQuery,
    sendMessage,
    searchConversations,
    selectConversation
  } = useChat();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Liste des conversations */}
      <aside className="w-80 border-r border-gray-100 h-[calc(100vh-4rem)]">
        <ChatList 
          conversations={conversations}
          currentChat={currentChat}
          onSelect={selectConversation}
          isLoading={isLoading}
          onSearch={searchConversations}
          searchQuery={searchQuery}
        />
      </aside>

      {/* Fenêtre de chat */}
      <main className="flex-1 h-[calc(100vh-4rem)]">
        {currentChat ? (
          <ChatWindow
            chat={currentChat}
            messages={messages}
            onSendMessage={sendMessage}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Bienvenue dans votre espace de chat
              </h3>
              <p className="text-gray-500">
                Sélectionnez une conversation pour commencer
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}