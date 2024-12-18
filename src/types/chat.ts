export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unreadCount: number;
  status: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
}