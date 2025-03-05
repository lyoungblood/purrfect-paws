'use client';

import React, { useState } from 'react';
import MessageCard from '@/components/MessageCard';
import { getAllMessages, addMessage, likeMessage } from '@/data/messages';

export default function MessageBoard() {
  const [messages, setMessages] = useState(getAllMessages());
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!author.trim() || !content.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    // Add the new message
    const newMessage = addMessage(author, content);
    
    // Update the state
    setMessages(getAllMessages());
    
    // Reset the form
    setAuthor('');
    setContent('');
    setError('');
  };

  const handleLike = (id: string) => {
    likeMessage(id);
    setMessages(getAllMessages());
  };

  return (
    <div className="max-w-4xl mx-auto">
      <section className="py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Cat Lovers Message Board</h1>
        <p className="text-lg mb-8">Join the conversation with fellow cat enthusiasts</p>
      </section>

      {/* Post a Message Form */}
      <section className="mb-12">
        <div className="cat-card p-6">
          <h2 className="text-2xl font-bold mb-4">Post a Message</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="author" className="block mb-2 font-bold">
                Your Name
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your name or nickname"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="content" className="block mb-2 font-bold">
                Message
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                placeholder="Share your cat stories, questions, or thoughts..."
              />
            </div>
            
            {error && (
              <div className="mb-4 text-red-500">
                {error}
              </div>
            )}
            
            <button type="submit" className="cat-button">
              Post Message
            </button>
          </form>
        </div>
      </section>

      {/* Messages List */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Messages</h2>
        
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map(message => (
              <MessageCard 
                key={message.id} 
                message={message} 
                onLike={handleLike} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 cat-card">
            <p className="text-xl">No messages yet. Be the first to post!</p>
          </div>
        )}
      </section>
    </div>
  );
}
