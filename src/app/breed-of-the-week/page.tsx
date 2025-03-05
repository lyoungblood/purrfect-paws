import React from 'react';
import Link from 'next/link';
import { getBreedOfTheWeek } from '@/data/catBreeds';

export default function BreedOfTheWeek() {
  const breed = getBreedOfTheWeek();

  return (
    <div className="max-w-4xl mx-auto">
      <section className="py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Cat Breed of the Week</h1>
        <p className="text-lg mb-2">Featuring</p>
        <h2 className="text-3xl font-bold text-[#d68c45]">{breed.name}</h2>
      </section>

      <section className="mb-8">
        <div className="cat-card p-6">
          <div className="relative w-full mb-6 overflow-hidden rounded-lg flex justify-center">
            <img 
              src={breed.imageUrl} 
              alt={`${breed.name} cat`}
              className="max-h-[400px] max-w-full"
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

      <section className="text-center mb-8">
        <Link href="/gallery" className="cat-button">
          View Cat Gallery
        </Link>
      </section>

      <section className="bg-[#f2e2c4] rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold mb-4">Check Back Next Week</h3>
        <p className="text-lg">
          We feature a different cat breed each week. Come back to learn about more amazing cats!
        </p>
      </section>
    </div>
  );
}
