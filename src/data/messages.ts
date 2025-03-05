export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

// Initial seed data for the message board
export const messages: Message[] = [
  {
    id: "msg1",
    author: "CatLover42",
    content: "My Bengal cat just learned how to open the refrigerator door! Has anyone else experienced this? Any tips on how to keep him out?",
    timestamp: "2025-03-01T14:30:00Z",
    likes: 15
  },
  {
    id: "msg2",
    author: "WhiskerWonder",
    content: "Just adopted a Russian Blue kitten yesterday. She's so quiet and well-behaved! Any toy recommendations for this breed?",
    timestamp: "2025-03-02T09:15:00Z",
    likes: 8
  },
  {
    id: "msg3",
    author: "PurrfectPal",
    content: "My Maine Coon is turning 10 next week! Planning a little birthday celebration for him. Any creative cat-friendly cake recipes?",
    timestamp: "2025-03-03T16:45:00Z",
    likes: 21
  },
  {
    id: "msg4",
    author: "FelixFriend",
    content: "Does anyone else's cat sit and stare at them while they sleep? My Bombay does this every night and it's both cute and slightly creepy!",
    timestamp: "2025-03-04T02:20:00Z",
    likes: 12
  }
];

// In a real application, these functions would interact with a database
export const getAllMessages = (): Message[] => {
  return [...messages].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const addMessage = (author: string, content: string): Message => {
  const newMessage: Message = {
    id: `msg${messages.length + 1}`,
    author,
    content,
    timestamp: new Date().toISOString(),
    likes: 0
  };
  
  messages.push(newMessage);
  return newMessage;
};

export const likeMessage = (id: string): Message | undefined => {
  const message = messages.find(msg => msg.id === id);
  if (message) {
    message.likes += 1;
  }
  return message;
};
