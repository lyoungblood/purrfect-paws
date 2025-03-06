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
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="py-0 md:py-1">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Welcome to Purrfect Paws
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            A website dedicated to cat lovers everywhere
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/gallery" className="cat-button">
              Browse Gallery
            </Link>
            <Link href="/message-board" className="cat-button">
              Join the Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* I'm Feeling Lucky Section */}
      <section>
        <div className="max-w-3xl mx-auto text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            I&apos;m Feeling Lucky
          </h2>
          <p className="text-lg text-gray-600">
            Discover a random cat breed each time
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <BreedCard breed={breedOfTheWeek} featured={true} />
        </div>
      </section>

      {/* Featured Photos Section */}
      <section>
        <div className="max-w-3xl mx-auto text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Featured Cat Photos
          </h2>
          <p className="text-lg text-gray-600">
            Check out these beautiful cats
          </p>
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
      <section className="bg-[#f8f5f0] rounded-2xl p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Share Your Cat Photos
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Got a cute cat? Share your photos with our community!
        </p>
        <Link href="/share-photos" className="cat-button">
          Upload Photos
        </Link>
      </section>
    </div>
  );
}
