import React from 'react';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
}

export function ChatMessage({ message, isOwn }: ChatMessageProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isOwn
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        }`}
      >
        <p>{message.content}</p>
        <span className={`text-xs mt-1 block ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}