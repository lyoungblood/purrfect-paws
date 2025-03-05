export interface UserPhoto {
  id: string;
  ownerName: string;
  catName: string;
  description: string;
  imageUrl: string;
  timestamp: string;
  likes: number;
}

// Initial seed data for user-submitted photos
export const userPhotos: UserPhoto[] = [
  {
    id: "photo1",
    ownerName: "Sarah Johnson",
    catName: "Whiskers",
    description: "My beautiful Maine Coon enjoying the sunshine on his favorite windowsill.",
    imageUrl: "/images/user-photos/maine-coon-window.jpg",
    timestamp: "2025-02-28T10:15:00Z",
    likes: 24
  },
  {
    id: "photo2",
    ownerName: "Michael Chen",
    catName: "Luna",
    description: "Luna showing off her Bengal spots. She's 2 years old and full of energy!",
    imageUrl: "/images/user-photos/bengal-playing.jpg",
    timestamp: "2025-03-01T16:30:00Z",
    likes: 18
  },
  {
    id: "photo3",
    ownerName: "Emma Wilson",
    catName: "Shadow",
    description: "My Bombay cat living up to his name, blending into the shadows.",
    imageUrl: "/images/user-photos/bombay-shadow.jpg",
    timestamp: "2025-03-02T14:45:00Z",
    likes: 15
  },
  {
    id: "photo4",
    ownerName: "David Miller",
    catName: "Misty",
    description: "Misty, my Russian Blue, showing off her beautiful coat after grooming.",
    imageUrl: "/images/user-photos/russian-blue-groomed.jpg",
    timestamp: "2025-03-03T09:20:00Z",
    likes: 22
  }
];

// In a real application, these functions would interact with a database
export const getAllUserPhotos = (): UserPhoto[] => {
  return [...userPhotos].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const addUserPhoto = (
  ownerName: string, 
  catName: string, 
  description: string, 
  imageUrl: string
): UserPhoto => {
  const newPhoto: UserPhoto = {
    id: `photo${userPhotos.length + 1}`,
    ownerName,
    catName,
    description,
    imageUrl,
    timestamp: new Date().toISOString(),
    likes: 0
  };
  
  userPhotos.push(newPhoto);
  return newPhoto;
};

export const likePhoto = (id: string): UserPhoto | undefined => {
  const photo = userPhotos.find(photo => photo.id === id);
  if (photo) {
    photo.likes += 1;
  }
  return photo;
};
