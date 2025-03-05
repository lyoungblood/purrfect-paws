'use client';

import React, { useState } from 'react';
import PhotoCard from '@/components/PhotoCard';
import { getAllPhotos, getPhotosByCategory } from '@/data/galleryPhotos';

export default function Gallery() {
  const allPhotos = getAllPhotos();
  const categories = [...new Set(allPhotos.map(photo => photo.category))];
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredPhotos = selectedCategory 
    ? getPhotosByCategory(selectedCategory)
    : allPhotos;

  return (
    <div>
      <section className="py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Cat Photo Gallery</h1>
        <p className="text-lg mb-8">Browse our collection of beautiful cat photos</p>
      </section>

      {/* Category Filter */}
      <section className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            className={`px-4 py-2 rounded-full ${
              selectedCategory === null 
                ? 'bg-[#d68c45] text-white' 
                : 'bg-[#f2e2c4] text-black'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Cats
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category 
                  ? 'bg-[#d68c45] text-white' 
                  : 'bg-[#f2e2c4] text-black'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map(photo => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
        
        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl">No photos found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
