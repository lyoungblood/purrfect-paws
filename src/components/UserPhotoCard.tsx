import React from 'react';
import { UserPhoto } from '@/data/userPhotos';

interface UserPhotoCardProps {
  photo: UserPhoto;
  onLike: (id: string) => void;
}

const UserPhotoCard: React.FC<UserPhotoCardProps> = ({ photo, onLike }) => {
  // Format the timestamp for display
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="cat-card overflow-hidden">
      <div className="relative w-full h-64 overflow-hidden">
        {/* In a real app, we would have actual images */}
        <div className="w-full h-full bg-[#a0a0a0] flex items-center justify-center">
          <span className="text-white text-lg font-bold">{photo.catName}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{photo.catName}</h3>
          <span className="text-xs text-gray-600">Shared by {photo.ownerName}</span>
        </div>
        
        <p className="text-sm mb-4">{photo.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">{formatDate(photo.timestamp)}</span>
          
          <button 
            onClick={() => onLike(photo.id)}
            className="flex items-center gap-1 text-sm hover:text-[#d68c45] transition-colors"
          >
            <span>❤️</span>
            <span>{photo.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPhotoCard;
