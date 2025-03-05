import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Purrfect Paws - Cat Lovers Website",
  description: "A website dedicated to cat lovers featuring cat photos, breed information, and interactive features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#e6c9a8]`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="bg-[#d68c45] text-black p-4 shadow-md">
            <nav className="container mx-auto flex flex-wrap justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">Purrfect Paws</h1>
              </div>
              <div className="flex space-x-6">
                <a href="/" className="font-bold hover:underline">Home</a>
                <a href="/gallery" className="font-bold hover:underline">Gallery</a>
                <a href="/breed-of-the-week" className="font-bold hover:underline">Breed of the Week</a>
                <a href="/message-board" className="font-bold hover:underline">Message Board</a>
                <a href="/share-photos" className="font-bold hover:underline">Share Photos</a>
                <a href="/about" className="font-bold hover:underline">About</a>
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-[#d68c45] text-black p-4 mt-8">
            <div className="container mx-auto text-center">
              <p>© 2025 Purrfect Paws - A website for cat lovers</p>
              <div className="mt-2 flex justify-center space-x-4">
                <a href="https://icatcare.org/" target="_blank" rel="noopener noreferrer" className="underline">International Cat Care</a>
                <a href="https://www.aspca.org/pet-care/cat-care" target="_blank" rel="noopener noreferrer" className="underline">ASPCA Cat Care</a>
                <a href="https://www.tica.org/" target="_blank" rel="noopener noreferrer" className="underline">The International Cat Association</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
