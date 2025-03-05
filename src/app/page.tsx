import React from 'react';
import Link from 'next/link';
import BreedCard from '@/components/BreedCard';
import PhotoCard from '@/components/PhotoCard';
import { getBreedOfTheWeek } from '@/data/catBreeds';
import { getFeaturedPhotos } from '@/data/galleryPhotos';

export default function Home() {
  const breedOfTheWeek = getBreedOfTheWeek();
  const featuredPhotos = getFeaturedPhotos();

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Purrfect Paws</h1>
        <p className="text-xl mb-8">A website dedicated to cat lovers everywhere</p>
        <div className="flex justify-center gap-4">
          <Link href="/gallery" className="cat-button">
            Browse Gallery
          </Link>
          <Link href="/message-board" className="cat-button">
            Join the Conversation
          </Link>
        </div>
      </section>

      {/* Cat Breed of the Week Section */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Cat Breed of the Week</h2>
          <p className="text-lg">Learn about a different cat breed each week</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <BreedCard breed={breedOfTheWeek} featured={true} />
        </div>
      </section>

      {/* Featured Photos Section */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Featured Cat Photos</h2>
          <p className="text-lg">Check out these beautiful cats</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPhotos.map(photo => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/gallery" className="cat-button">
            View All Photos
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-[#f2e2c4] rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Share Your Cat Photos</h2>
        <p className="text-lg mb-6">
          Got a cute cat? Share your photos with our community!
        </p>
        <Link href="/share-photos" className="cat-button">
          Upload Photos
        </Link>
      </section>
    </div>
  );
}
