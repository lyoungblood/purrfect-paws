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
    <div className="cat-card p-4 md:p-6 mb-4">
      <div className="relative w-full mb-4 overflow-hidden rounded-lg flex justify-center" style={{ minHeight: '240px' }}>
        <Image 
          src={breed.imageUrl} 
          alt={`${breed.name} cat`}
          width={500}
          height={280}
          style={{ 
            maxHeight: '280px', 
            width: 'auto', 
            objectFit: 'contain' 
          }}
          className="transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">{breed.name}</h3>
      
      {featured ? (
        <>
          <p className="text-gray-600 mb-4 leading-relaxed">{breed.description.substring(0, 120)}...</p>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-3">Characteristics:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {breed.characteristics.slice(0, 3).map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4 bg-[#f8f5f0] p-3 rounded-lg">
            <h4 className="text-base font-semibold mb-1">Fun Fact:</h4>
            <p className="italic text-gray-600">{breed.funFacts[0]}</p>
          </div>
        </>
      ) : (
        <p className="text-gray-600 mb-4">{breed.description.substring(0, 80)}...</p>
      )}
      
      <Link 
        href={`/feeling-lucky/${breed.id}`}
        className="cat-button inline-block"
      >
        Learn More
      </Link>
    </div>
  );
};

export default BreedCard;
