import React from 'react';
import Image from 'next/image';
import { CatBreed } from '@/data/catBreeds';
import Link from 'next/link';

interface BreedCardProps {
  breed: CatBreed;
  featured?: boolean;
}

const BreedCard: React.FC<BreedCardProps> = ({ breed, featured = false }) => {
  return (
    <div className="cat-card p-6 md:p-8 mb-6">
      <div className="relative w-full mb-6 overflow-hidden rounded-lg flex justify-center" style={{ minHeight: '300px' }}>
        <Image 
          src={breed.imageUrl} 
          alt={`${breed.name} cat`}
          width={500}
          height={350}
          style={{ 
            maxHeight: '350px', 
            width: 'auto', 
            objectFit: 'contain' 
          }}
          className="transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{breed.name}</h3>
      
      {featured ? (
        <>
          <p className="text-gray-600 mb-6 leading-relaxed">{breed.description.substring(0, 150)}...</p>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Characteristics:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {breed.characteristics.slice(0, 3).map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6 bg-[#f8f5f0] p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Fun Fact:</h4>
            <p className="italic text-gray-600">{breed.funFacts[0]}</p>
          </div>
        </>
      ) : (
        <p className="text-gray-600 mb-6">{breed.description.substring(0, 100)}...</p>
      )}
      
      <Link 
        href={`/breed-of-the-week/${breed.id}`}
        className="cat-button inline-block"
      >
        Learn More
      </Link>
    </div>
  );
};

export default BreedCard;
