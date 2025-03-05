import React from 'react';
import { getBreedById, catBreeds } from '@/data/catBreeds';
import { notFound } from 'next/navigation';
import BreedPageClient from './BreedPageClient';

// This function tells Next.js which routes to pre-render at build time
export function generateStaticParams() {
  return catBreeds.map((breed) => ({
    id: breed.id,
  }));
}

export default function BreedPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const breed = getBreedById(params.id);
  
  if (!breed) {
    notFound();
  }

  return <BreedPageClient breed={breed} />;
}
