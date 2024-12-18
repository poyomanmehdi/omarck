// 🎯 Hook de gestion du chat
// Salut Hocine ! Ce hook va te faciliter la vie pour gérer l'état du chat !

import { useState, useEffect, useCallback } from 'react';
import { Conversation, Message } from '../types/chat';
import { ChatService } from '../services/chatService';

// 🎭 Données de test (à remplacer par ton API Laravel)
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Prof. Martin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    lastMessage: 'Avez-vous terminé l\'exercice ?',
    unreadCount: 2,
    status: 'En ligne'
  },
  {
    id: '2',
    name: 'Mme Bernard',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Le prochain cours sera...',
    unreadCount: 0,
    status: 'Vu il y a 5h'
  }
];

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Bonjour, avez-vous des questions sur le dernier cours ?',
    senderId: 'other',
    timestamp: '10:30'
  },
  {
    id: '2',
    content: 'Oui, je n\'ai pas bien compris la partie sur les équations différentielles',
    senderId: 'me',
    timestamp: '10:32'
  }
];

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentChat, setCurrentChat] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const chatService = ChatService.getInstance();

  // 📥 Chargement initial des conversations
  useEffect(() => {
    const loadConversations = async () => {
      try {
        setIsLoading(true);
        // 🔥 TODO: Remplace par l'appel API
        // const response = await chatService.getConversations();
        await new Promise(resolve => setTimeout(resolve, 1000));
        setConversations(MOCK_CONVERSATIONS);
      } catch (error) {
        console.error('Erreur lors du chargement des conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  // 💬 Chargement des messages d'une conversation
  useEffect(() => {
    if (currentChat) {
      const loadMessages = async () => {
        try {
          // 🔥 TODO: Remplace par l'appel API
          // const response = await chatService.getMessages(currentChat.id);
          setMessages(MOCK_MESSAGES);
        } catch (error) {
          console.error('Erreur lors du chargement des messages:', error);
        }
      };

      loadMessages();
    }
  }, [currentChat]);

  // 🔍 Recherche dans les conversations
  const searchConversations = useCallback(async (query: string) => {
    try {
      setSearchQuery(query);
      if (query.trim()) {
        // 🔥 TODO: Remplace par l'appel API
        // const results = await chatService.searchConversations(query);
        const results = conversations.filter(conv => 
          conv.name.toLowerCase().includes(query.toLowerCase())
        );
        setConversations(results);
      } else {
        setConversations(MOCK_CONVERSATIONS);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  }, [conversations]);

  // 📤 Envoi d'un message
  const sendMessage = useCallback(async (content: string) => {
    if (!currentChat) return;

    try {
      // 🔥 TODO: Remplace par l'appel API
      // const response = await chatService.sendMessage(currentChat.id, content);
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        senderId: 'me',
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  }, [currentChat]);

  return {
    conversations,
    currentChat,
    messages,
    isLoading,
    searchQuery,
    sendMessage,
    searchConversations,
    selectConversation: setCurrentChat
  };
}