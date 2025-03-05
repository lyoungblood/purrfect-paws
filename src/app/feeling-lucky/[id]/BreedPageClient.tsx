'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CatBreed, catBreeds } from '@/data/catBreeds';

interface BreedPageClientProps {
  breed: CatBreed;
}

export default function BreedPageClient({ breed }: BreedPageClientProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{breed.name}</h1>
        <p className="text-lg">Learn all about this amazing cat breed</p>
      </section>

      <section className="mb-8">
        <div className="cat-card p-6">
          <div className="relative w-full mb-6 overflow-hidden rounded-lg flex justify-center">
            <Image 
              src={breed.imageUrl} 
              alt={`${breed.name} cat`}
              width={600}
              height={400}
              className="max-h-[400px] object-contain"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">About the {breed.name}</h3>
            <p className="text-lg leading-relaxed">{breed.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Characteristics</h3>
            <ul className="list-disc pl-6 space-y-2">
              {breed.characteristics.map((trait, index) => (
                <li key={index} className="text-lg">{trait}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Care Information</h3>
            <p className="text-lg leading-relaxed">{breed.careInfo}</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Fun Facts</h3>
            <ul className="list-disc pl-6 space-y-2">
              {breed.funFacts.map((fact, index) => (
                <li key={index} className="text-lg">{fact}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="flex justify-between mb-8">
        <Link href="/feeling-lucky" className="cat-button">
          Back to I'm Feeling Lucky
        </Link>
        <Link href="/gallery" className="cat-button">
          View Cat Gallery
        </Link>
      </section>

      <section className="bg-[#f2e2c4] rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4 text-center">Explore Other Cat Breeds</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {catBreeds
            .filter(b => b.id !== breed.id)
            .map(otherBreed => (
              <Link 
                key={otherBreed.id}
                href={`/feeling-lucky/${otherBreed.id}`}
                className="block p-4 bg-white rounded-lg hover:bg-[#d68c45] hover:text-white transition-colors"
              >
                <h4 className="font-bold">{otherBreed.name}</h4>
              </Link>
            ))
          }
        </div>
      </section>
    </div>
  );
}
