'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { GalleryPhoto } from '@/data/galleryPhotos';

interface PhotoCardProps {
  photo: GalleryPhoto;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Handle escape key press to close fullscreen view
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        closeFullscreen();
      }
    };

    if (isFullscreen) {
      window.addEventListener('keydown', handleEscKey);
      // Prevent scrolling when fullscreen is active
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
      // Restore scrolling when component unmounts or fullscreen is closed
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen]);

  // Preload the fullscreen image
  useEffect(() => {
    const preloadImage = document.createElement('img');
    preloadImage.src = photo.imageUrl;
  }, [photo.imageUrl]);

  const openFullscreen = () => {
    setIsClosing(false);
    setIsFullscreen(true);
    // Set animating state after a small delay to ensure the animation triggers
    setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };

  const closeFullscreen = () => {
    setIsClosing(true);
    setIsAnimating(false);
    setTimeout(() => {
      setIsFullscreen(false);
      setIsClosing(false);
    }, 1000); // Allow full 1 second for closing animation
  };

  return (
    <>
      <div 
        className="cat-card overflow-hidden cursor-pointer" 
        onClick={openFullscreen}
      >
        <div className="relative w-full h-64 overflow-hidden">
          <Image 
            src={photo.imageUrl}
            alt={photo.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{photo.title}</h3>
          <p className="text-sm mb-2">{photo.description}</p>
          <span className="inline-block bg-[#d68c45] text-white text-xs px-2 py-1 rounded">
            {photo.category}
          </span>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className={`fixed inset-0 bg-black ${isAnimating ? 'bg-opacity-90' : 'bg-opacity-0'} z-50 flex flex-col items-center justify-center p-4 transition-all duration-1000 ease-in-out`}
          onClick={closeFullscreen}
          style={{ 
            backgroundColor: isClosing ? 'rgba(0, 0, 0, 0)' : undefined 
          }}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-[#d68c45] transition-colors z-[60]"
            onClick={closeFullscreen}
            aria-label="Close fullscreen view"
          >
            &times;
          </button>
          
          <div 
            className={`relative w-full h-[70vh] max-w-6xl transform ${isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} transition-all duration-1000 ease-in-out`}
            style={{ 
              opacity: isClosing ? '0' : undefined,
              transform: isClosing ? 'scale(0.5)' : undefined
            }}
          >
            <Image 
              src={photo.imageUrl}
              alt={photo.title}
              fill
              sizes="100vw"
              className="object-contain"
              priority
              ref={imageRef}
            />
          </div>
          
          <div 
            className={`text-white mt-4 text-center max-w-2xl transform ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 ease-in-out delay-300`}
            style={{ 
              opacity: isClosing ? '0' : undefined 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-2">{photo.title}</h2>
            <p className="text-lg mb-2">{photo.description}</p>
            <span className="inline-block bg-[#d68c45] text-white px-3 py-1 rounded">
              {photo.category}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCard;
