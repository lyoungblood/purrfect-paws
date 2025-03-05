import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">About Purrfect Paws</h1>
        <p className="text-lg mb-8">Learn more about our cat-loving community</p>
      </section>

      <section className="mb-12">
        <div className="cat-card p-6">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            Purrfect Paws was created with a simple mission: to celebrate the joy, beauty, and 
            companionship that cats bring to our lives. We believe that cats are not just pets, 
            but beloved family members who deserve to be cherished and understood.
          </p>
          <p className="text-lg mb-4">
            Our website aims to be a hub for cat enthusiasts to learn about different cat breeds, 
            share their own cat photos and stories, and connect with fellow cat lovers from around the world.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="cat-card p-6">
          <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Cat Breed Information</h3>
            <p className="mb-2">
              Each week, we feature a different cat breed, providing detailed information about their 
              characteristics, care needs, and fun facts. Our &quot;Breed of the Week&quot; feature helps cat 
              lovers learn about the wonderful diversity of cat breeds.
            </p>
            <Link href="/breed-of-the-week" className="text-[#d68c45] font-bold hover:underline">
              Check out this week&apos;s featured breed →
            </Link>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Photo Gallery</h3>
            <p className="mb-2">
              Our gallery showcases beautiful cat photos, organized by breed. It&apos;s a visual celebration 
              of feline beauty and charm.
            </p>
            <Link href="/gallery" className="text-[#d68c45] font-bold hover:underline">
              Browse our gallery →
            </Link>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Message Board</h3>
            <p className="mb-2">
              Connect with other cat lovers, ask questions, share advice, and tell stories about your 
              feline friends on our community message board.
            </p>
            <Link href="/message-board" className="text-[#d68c45] font-bold hover:underline">
              Join the conversation →
            </Link>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">Photo Sharing</h3>
            <p className="mb-2">
              Show off your own cats by uploading photos to our community photo section. See what 
              other cat owners are sharing and celebrate the unique personality of each cat.
            </p>
            <Link href="/share-photos" className="text-[#d68c45] font-bold hover:underline">
              Share your cat photos →
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="cat-card p-6">
          <h2 className="text-2xl font-bold mb-4">Cat Resources</h2>
          <p className="mb-4">
            We believe in promoting responsible cat ownership and welfare. Here are some valuable 
            resources for cat owners:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a 
                href="https://icatcare.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#d68c45] hover:underline"
              >
                International Cat Care
              </a> - Expert advice on cat health and welfare
            </li>
            <li>
              <a 
                href="https://www.aspca.org/pet-care/cat-care" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#d68c45] hover:underline"
              >
                ASPCA Cat Care
              </a> - Comprehensive guide to caring for cats
            </li>
            <li>
              <a 
                href="https://www.tica.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#d68c45] hover:underline"
              >
                The International Cat Association
              </a> - Information about cat breeds and cat shows
            </li>
          </ul>
        </div>
      </section>

      <section className="text-center mb-8">
        <p className="text-lg mb-4">
          Thank you for visiting Purrfect Paws. We hope you enjoy exploring our website and 
          becoming part of our cat-loving community!
        </p>
        <Link href="/" className="cat-button">
          Back to Home
        </Link>
      </section>
    </div>
  );
}
