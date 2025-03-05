'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { GalleryPhoto, getAllPhotos } from '@/data/galleryPhotos';

interface PhotoCardProps {
  photo: GalleryPhoto;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [allPhotos, setAllPhotos] = useState<GalleryPhoto[]>([]);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [parallaxScale, setParallaxScale] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);
  const parallaxTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize all photos and find current photo index
  useEffect(() => {
    const photos = getAllPhotos();
    setAllPhotos(photos);
    const index = photos.findIndex(p => p.id === photo.id);
    setCurrentPhotoIndex(index >= 0 ? index : 0);
    
    // Preload adjacent images
    if (index > 0) {
      const prevImg = new window.Image();
      prevImg.src = photos[index - 1].imageUrl;
    }
    
    if (index < photos.length - 1) {
      const nextImg = new window.Image();
      nextImg.src = photos[index + 1].imageUrl;
    }
  }, [photo.id]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isFullscreen) return;
      
      switch (event.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          navigateToPrevious();
          break;
        case 'ArrowRight':
          navigateToNext();
          break;
      }
    };

    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when fullscreen is active
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restore scrolling when component unmounts or fullscreen is closed
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen, currentPhotoIndex, allPhotos.length]);

  // Start parallax effect when fullscreen is active
  useEffect(() => {
    if (isFullscreen && isAnimating && !isClosing) {
      startParallaxAnimation();
    } else {
      // Clear any existing parallax animation
      if (parallaxTimerRef.current) {
        clearTimeout(parallaxTimerRef.current);
        parallaxTimerRef.current = null;
      }
      setParallaxOffset({ x: 0, y: 0 });
      setParallaxScale(1);
    }

    return () => {
      if (parallaxTimerRef.current) {
        clearTimeout(parallaxTimerRef.current);
      }
    };
  }, [isFullscreen, isAnimating, isClosing]);

  // Preload the current fullscreen image
  useEffect(() => {
    if (allPhotos.length > 0) {
      const currentPhoto = allPhotos[currentPhotoIndex];
      const preloadImage = new window.Image();
      preloadImage.src = currentPhoto.imageUrl;
    }
  }, [currentPhotoIndex, allPhotos]);

  const startParallaxAnimation = useCallback(() => {
    // We don't reset the scale here anymore, that's handled in the navigation functions
    // to prevent visible zoom-out effect
    
    // Animate over 10 seconds
    const duration = 10000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Only zoom in, no movement in x and y directions
      const newScale = 1 + (progress * 0.25); // 1.0 to 1.25 scale (25% zoom)
      
      setParallaxOffset({ x: 0, y: 0 }); // No movement, only zoom
      setParallaxScale(newScale);
      
      if (progress < 1) {
        parallaxTimerRef.current = setTimeout(animate, 16); // ~60fps
      }
      // Once fully zoomed in, we keep that state until navigation
    };
    
    animate();
  }, []);

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
    }, 500); // Reduced from 1000ms to 500ms for faster closing
  };

  const navigateToNext = useCallback(() => {
    if (currentPhotoIndex < allPhotos.length - 1) {
      // Clear any existing animation
      if (parallaxTimerRef.current) {
        clearTimeout(parallaxTimerRef.current);
        parallaxTimerRef.current = null;
      }
      
      // Temporarily disable transition to prevent visible zoom-out
      const imageElement = imageRef.current;
      if (imageElement) {
        imageElement.style.transition = 'none';
      }
      
      // Reset scale without animation
      setParallaxScale(1);
      setParallaxOffset({ x: 0, y: 0 });
      
      // Change the image
      setCurrentPhotoIndex(prevIndex => prevIndex + 1);
      
      // Force a reflow to apply the changes immediately
      if (imageElement) {
        void imageElement.offsetHeight;
      }
      
      // Restore transition and start new animation
      setTimeout(() => {
        if (imageElement) {
          imageElement.style.transition = 'transform 3s ease-out';
        }
        startParallaxAnimation();
      }, 10);
      
      // Preload the next image if available
      if (currentPhotoIndex + 2 < allPhotos.length) {
        const nextImg = new window.Image();
        nextImg.src = allPhotos[currentPhotoIndex + 2].imageUrl;
      }
    }
  }, [currentPhotoIndex, allPhotos, startParallaxAnimation]);

  const navigateToPrevious = useCallback(() => {
    if (currentPhotoIndex > 0) {
      // Clear any existing animation
      if (parallaxTimerRef.current) {
        clearTimeout(parallaxTimerRef.current);
        parallaxTimerRef.current = null;
      }
      
      // Temporarily disable transition to prevent visible zoom-out
      const imageElement = imageRef.current;
      if (imageElement) {
        imageElement.style.transition = 'none';
      }
      
      // Reset scale without animation
      setParallaxScale(1);
      setParallaxOffset({ x: 0, y: 0 });
      
      // Change the image
      setCurrentPhotoIndex(prevIndex => prevIndex - 1);
      
      // Force a reflow to apply the changes immediately
      if (imageElement) {
        void imageElement.offsetHeight;
      }
      
      // Restore transition and start new animation
      setTimeout(() => {
        if (imageElement) {
          imageElement.style.transition = 'transform 3s ease-out';
        }
        startParallaxAnimation();
      }, 10);
      
      // Preload the previous image if available
      if (currentPhotoIndex - 2 >= 0) {
        const prevImg = new window.Image();
        prevImg.src = allPhotos[currentPhotoIndex - 2].imageUrl;
      }
    }
  }, [currentPhotoIndex, allPhotos, startParallaxAnimation]);

  const currentPhoto = allPhotos[currentPhotoIndex] || photo;

  return (
    <>
      <div 
        className="cat-card overflow-hidden cursor-pointer group" 
        onClick={openFullscreen}
      >
        <div className="relative w-full h-64 overflow-hidden">
          <Image 
            src={photo.imageUrl}
            alt={photo.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={photo.featured} // Prioritize loading for featured photos
          />
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold tracking-tight mb-2">{photo.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{photo.description}</p>
          <span className="inline-block bg-[#d68c45] text-white text-xs px-3 py-1 rounded-full font-medium">
            {photo.category}
          </span>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className={`fixed inset-0 bg-black ${isAnimating ? 'bg-opacity-95' : 'bg-opacity-0'} z-50 flex flex-col items-center justify-center p-4 transition-all duration-500 ease-in-out`}
          onClick={closeFullscreen}
          style={{ 
            backgroundColor: isClosing ? 'rgba(0, 0, 0, 0)' : undefined 
          }}
          tabIndex={0} // Add tabIndex to ensure the div can receive keyboard focus
          autoFocus // Automatically focus the div when it appears
          onKeyDown={(e) => {
            // Handle keyboard navigation directly in the onKeyDown event
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              navigateToPrevious();
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              navigateToNext();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              closeFullscreen();
            }
          }}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-[#d68c45] transition-colors z-[60]"
            onClick={(e) => {
              e.stopPropagation();
              closeFullscreen();
            }}
            aria-label="Close fullscreen view"
          >
            &times;
          </button>
          
          {/* Navigation buttons */}
          <button 
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-5xl font-light hover:text-[#d68c45] transition-colors z-[60] ${currentPhotoIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-80'}`}
            onClick={(e) => {
              e.stopPropagation();
              navigateToPrevious();
            }}
            disabled={currentPhotoIndex === 0}
            aria-label="Previous image"
          >
            &#10094;
          </button>
          
          <button 
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-5xl font-light hover:text-[#d68c45] transition-colors z-[60] ${currentPhotoIndex === allPhotos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-80'}`}
            onClick={(e) => {
              e.stopPropagation();
              navigateToNext();
            }}
            disabled={currentPhotoIndex === allPhotos.length - 1}
            aria-label="Next image"
          >
            &#10095;
          </button>
          
          {/* Image container with modern border */}
          <div 
            className={`relative w-full h-[70vh] max-w-6xl ${isAnimating ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-in-out overflow-hidden`}
            style={{ 
              opacity: isClosing ? '0' : undefined,
              borderRadius: '8px',
              boxShadow: '0 0 0 2px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 z-10"></div>
            
            <div className="relative w-full h-full overflow-hidden">
              <Image 
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                fill
                sizes="100vw"
                className="object-contain transition-transform duration-500"
                priority
                ref={imageRef}
                style={{
                  transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px) scale(${parallaxScale})`,
                  transition: 'transform 3s ease-out',
                  transformOrigin: 'center center'
                }}
              />
            </div>
          </div>
          
          {/* Image info */}
          <div 
            className={`text-white mt-6 text-center max-w-2xl ${isAnimating ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-in-out delay-200`}
            style={{ 
              opacity: isClosing ? '0' : undefined 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold tracking-tight mb-3">{currentPhoto.title}</h2>
            <p className="text-lg mb-3 text-gray-200">{currentPhoto.description}</p>
            <span className="inline-block bg-[#d68c45] text-white px-4 py-1 rounded-full font-medium">
              {currentPhoto.category}
            </span>
          </div>
          
          {/* Image counter */}
          <div 
            className={`absolute bottom-4 text-white text-sm ${isAnimating ? 'opacity-70' : 'opacity-0'} transition-opacity duration-500`}
          >
            {currentPhotoIndex + 1} / {allPhotos.length}
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCard;
