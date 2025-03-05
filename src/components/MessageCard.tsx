import React from 'react';
import { Message } from '@/data/messages';

interface MessageCardProps {
  message: Message;
  onLike: (id: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onLike }) => {
  // Format the timestamp for display
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="cat-card p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg">{message.author}</h3>
        <span className="text-xs text-gray-600">{formatDate(message.timestamp)}</span>
      </div>
      
      <p className="mb-4">{message.content}</p>
      
      <div className="flex items-center">
        <button 
          onClick={() => onLike(message.id)}
          className="flex items-center gap-1 text-sm hover:text-[#d68c45] transition-colors"
        >
          <span>❤️</span>
          <span>{message.likes}</span>
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
