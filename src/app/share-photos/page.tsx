'use client';

import React, { useState } from 'react';
import UserPhotoCard from '@/components/UserPhotoCard';
import { getAllUserPhotos, addUserPhoto, likePhoto } from '@/data/userPhotos';

export default function SharePhotos() {
  const [photos, setPhotos] = useState(getAllUserPhotos());
  const [ownerName, setOwnerName] = useState('');
  const [catName, setCatName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!ownerName.trim() || !catName.trim() || !description.trim()) {
      setError('Please fill in all fields');
      setSuccessMessage('');
      return;
    }
    
    // In a real app, we would handle file upload here
    // For this demo, we'll just use a placeholder image URL
    const placeholderImageUrl = `/images/user-photos/placeholder-${Math.floor(Math.random() * 4) + 1}.jpg`;
    
    // Add the new photo
    const newPhoto = addUserPhoto(ownerName, catName, description, placeholderImageUrl);
    
    // Update the state
    setPhotos(getAllUserPhotos());
    
    // Reset the form and show success message
    setOwnerName('');
    setCatName('');
    setDescription('');
    setError('');
    setSuccessMessage('Your photo has been shared successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleLike = (id: string) => {
    likePhoto(id);
    setPhotos(getAllUserPhotos());
  };

  return (
    <div className="max-w-4xl mx-auto">
      <section className="py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Share Your Cat Photos</h1>
        <p className="text-lg mb-8">Show off your feline friends with our community</p>
      </section>

      {/* Upload Form */}
      <section className="mb-12">
        <div className="cat-card p-6">
          <h2 className="text-2xl font-bold mb-4">Upload a Photo</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="ownerName" className="block mb-2 font-bold">
                Your Name
              </label>
              <input
                type="text"
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="catName" className="block mb-2 font-bold">
                Cat's Name
              </label>
              <input
                type="text"
                id="catName"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your cat's name"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 font-bold">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
                placeholder="Tell us about your cat and this photo"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="photoUpload" className="block mb-2 font-bold">
                Photo
              </label>
              <div className="border border-dashed border-gray-300 rounded p-8 text-center">
                <p className="mb-2">In a real app, this would be a file upload component</p>
                <p className="text-sm text-gray-500">For this demo, we'll use a placeholder image</p>
              </div>
            </div>
            
            {error && (
              <div className="mb-4 text-red-500">
                {error}
              </div>
            )}
            
            {successMessage && (
              <div className="mb-4 text-green-600 font-bold">
                {successMessage}
              </div>
            )}
            
            <button type="submit" className="cat-button">
              Share Photo
            </button>
          </form>
        </div>
      </section>

      {/* Community Photos */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Community Cat Photos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {photos.map(photo => (
            <UserPhotoCard 
              key={photo.id} 
              photo={photo} 
              onLike={handleLike} 
            />
          ))}
        </div>
        
        {photos.length === 0 && (
          <div className="text-center py-12 cat-card">
            <p className="text-xl">No photos shared yet. Be the first to share your cat!</p>
          </div>
        )}
      </section>
    </div>
  );
}
