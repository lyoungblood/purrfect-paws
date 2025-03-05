export interface CatBreed {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  careInfo: string;
  funFacts: string[];
  imageUrl: string;
}

export const catBreeds: CatBreed[] = [
  {
    id: "bombay",
    name: "Bombay",
    description: "The Bombay cat is a breed of domestic cat developed in the United States in the 1950s. The Bombay was created through selective breeding of Burmese and black American Shorthair cats to produce a cat that resembled a miniature black panther.",
    characteristics: [
      "Sleek, shiny black coat",
      "Copper or gold eyes",
      "Muscular, medium-sized body",
      "Playful and affectionate personality",
      "Highly social and intelligent"
    ],
    careInfo: "Bombay cats are generally low-maintenance. Their short, fine coat requires minimal grooming - a weekly brushing is usually sufficient. They are indoor cats that enjoy interactive play and mental stimulation. Regular veterinary check-ups, a balanced diet, and fresh water are essential for their health.",
    funFacts: [
      "Bombay cats are often called 'parlor panthers' due to their resemblance to black panthers",
      "Despite their exotic appearance, they don't have any wild blood",
      "They tend to be warmer to the touch than other cat breeds",
      "Bombays often enjoy walking on a leash with proper training"
    ],
    imageUrl: "/images/bombay.jpg"
  },
  {
    id: "bengal",
    name: "Bengal",
    description: "The Bengal cat is a domesticated cat breed created from hybrids of domestic cats and the Asian leopard cat. Bengals have a wild appearance with their distinctive spotted or marbled coat patterns, but they are known for their friendly and active temperament.",
    characteristics: [
      "Distinctive spotted or marbled coat",
      "Athletic, muscular build",
      "Highly active and playful",
      "Intelligent and trainable",
      "Loves water and climbing"
    ],
    careInfo: "Bengal cats are active and require plenty of exercise and mental stimulation. Interactive toys, climbing trees, and puzzle feeders are excellent for keeping them engaged. Their short coat needs minimal grooming, but they appreciate regular brushing. A high-quality diet rich in protein is important for their muscular build.",
    funFacts: [
      "Bengals often enjoy playing in water and may join you in the shower",
      "They are one of the few cat breeds that can learn to fetch",
      "Their coat has a unique 'glitter' effect that makes it appear to sparkle in sunlight",
      "Bengals are known for their distinctive 'chirping' vocalizations"
    ],
    imageUrl: "/images/bengal.jpg"
  },
  {
    id: "russian-blue",
    name: "Russian Blue",
    description: "The Russian Blue is a cat breed with a silver-blue coat and green eyes. They are known for their shy but playful nature and their intelligence. Russian Blues are believed to have originated in the port of Arkhangelsk, Russia, and were brought to Europe by sailors in the 1860s.",
    characteristics: [
      "Dense, plush double coat in silver-blue",
      "Emerald green eyes",
      "Elegant, fine-boned body",
      "Reserved with strangers but affectionate with family",
      "Quiet and gentle temperament"
    ],
    careInfo: "Russian Blues are generally healthy cats with few breed-specific issues. Their dense double coat sheds minimally but benefits from weekly brushing. They are fastidious about cleanliness and appreciate a clean litter box. Russian Blues tend to be particular about their diet and prefer routine feeding schedules.",
    funFacts: [
      "Russian Blues are considered hypoallergenic as they produce less of the Fel d 1 protein that causes allergies",
      "They are known for their 'smile' - the slight upward turn at the corners of their mouth",
      "Russian Blues were favorite pets of Russian Czars",
      "They have an excellent memory and can learn to open doors and cabinets"
    ],
    imageUrl: "/images/russian-blue.jpg"
  },
  {
    id: "maine-coon",
    name: "Maine Coon",
    description: "The Maine Coon is one of the largest domesticated cat breeds and one of the oldest natural breeds in North America. It is known for its distinctive physical appearance and valuable hunting skills. Maine Coons are known for their intelligence and playful, gentle personality.",
    characteristics: [
      "Large, muscular body",
      "Long, shaggy coat with a ruff around the neck",
      "Tufted ears and paws",
      "Bushy, raccoon-like tail",
      "Friendly, dog-like personality"
    ],
    careInfo: "Maine Coons have a thick, water-resistant coat that requires regular grooming to prevent matting. Combing 2-3 times a week is recommended. They are generally hardy cats but can be prone to hip dysplasia and hypertrophic cardiomyopathy. Regular veterinary check-ups are important. Maine Coons enjoy interactive play and climbing, so cat trees and toys are essential.",
    funFacts: [
      "Maine Coons can weigh up to 18 pounds (males) and 12 pounds (females)",
      "They are excellent swimmers due to their water-resistant coat",
      "Maine Coons are often called the 'gentle giants' of the cat world",
      "They develop slowly, not reaching full size until 3-5 years of age"
    ],
    imageUrl: "/images/maine-coon.jpg"
  }
];

export const getBreedOfTheWeek = (): CatBreed => {
  // This function would normally calculate which breed to show based on the current week
  // For demo purposes, we'll just return a random breed
  const randomIndex = Math.floor(Math.random() * catBreeds.length);
  return catBreeds[randomIndex];
};

export const getBreedById = (id: string): CatBreed | undefined => {
  return catBreeds.find(breed => breed.id === id);
};
