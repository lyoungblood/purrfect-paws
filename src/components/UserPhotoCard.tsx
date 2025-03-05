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
    <div className="cat-card overflow-hidden group">
      <div className="relative w-full h-64 overflow-hidden">
        {/* In a real app, we would have actual images */}
        <div className="w-full h-full bg-gradient-to-br from-[#d68c45] to-[#f8f5f0] flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <span className="text-white text-xl font-bold tracking-tight">{photo.catName}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold tracking-tight">{photo.catName}</h3>
          <span className="text-xs text-gray-500 font-medium">Shared by {photo.ownerName}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-5 leading-relaxed">{photo.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">{formatDate(photo.timestamp)}</span>
          
          <button 
            onClick={() => onLike(photo.id)}
            className="flex items-center gap-2 text-sm font-medium hover:text-[#d68c45] transition-colors py-1 px-2 rounded-full hover:bg-gray-100"
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
