import React from 'react';
import { getBreedById, catBreeds } from '@/data/catBreeds';
import { notFound } from 'next/navigation';
import BreedPageClient from '@/app/feeling-lucky/[id]/BreedPageClient';

// This function tells Next.js which routes to pre-render at build time
export function generateStaticParams() {
  return catBreeds.map((breed) => ({
    id: breed.id,
  }));
}

// Since we're having issues with the params.id in Next.js App Router,
// let's use a simpler approach by directly accessing the breeds
export default function BreedPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // Use a try-catch block to handle any potential errors
  try {
    // Get the breed ID from the URL segment
    const breedId = params?.id;
    
    // Find the breed directly from the catBreeds array
    const breed = catBreeds.find(b => b.id === breedId);
    
    if (!breed) {
      notFound();
    }
    
    // Get a random image for this breed
    const breedWithRandomImage = getBreedById(breedId);
    
    return <BreedPageClient breed={breedWithRandomImage || breed} />;
  } catch (error) {
    console.error('Error in BreedPage:', error);
    notFound();
  }
}
