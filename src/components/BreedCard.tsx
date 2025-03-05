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
    <div className="cat-card p-4 mb-6">
      <div className="relative w-full mb-4 overflow-hidden rounded-lg flex justify-center" style={{ minHeight: '250px' }}>
        <Image 
          src={breed.imageUrl} 
          alt={`${breed.name} cat`}
          width={400}
          height={300}
          style={{ 
            maxHeight: '300px', 
            width: 'auto', 
            objectFit: 'contain' 
          }}
        />
      </div>
      
      <h3 className="text-2xl font-bold mb-2">{breed.name}</h3>
      
      {featured ? (
        <>
          <p className="mb-4">{breed.description.substring(0, 150)}...</p>
          
          <div className="mb-4">
            <h4 className="font-bold mb-2">Characteristics:</h4>
            <ul className="list-disc pl-5">
              {breed.characteristics.slice(0, 3).map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-bold mb-2">Fun Fact:</h4>
            <p className="italic">{breed.funFacts[0]}</p>
          </div>
        </>
      ) : (
        <p className="mb-4">{breed.description.substring(0, 100)}...</p>
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
