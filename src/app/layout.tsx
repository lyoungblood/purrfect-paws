import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-100 py-5">
            <div className="container mx-auto px-4 md:px-6">
              <nav className="flex flex-wrap justify-between items-center">
                <div className="flex items-center">
                  <Link href="/" className="text-3xl font-extrabold tracking-tight">
                    Purrfect Paws
                  </Link>
                </div>
                <div className="flex space-x-8">
                  <Link href="/" className="text-sm font-medium hover:text-[#d68c45] transition-colors">Home</Link>
                  <Link href="/gallery" className="text-sm font-medium hover:text-[#d68c45] transition-colors">Gallery</Link>
                  <Link href="/breed-of-the-week" className="text-sm font-medium hover:text-[#d68c45] transition-colors">Breed of the Week</Link>
                  <Link href="/message-board" className="text-sm font-medium hover:text-[#d68c45] transition-colors">Message Board</Link>
                  <Link href="/share-photos" className="text-sm font-medium hover:text-[#d68c45] transition-colors">Share Photos</Link>
                  <Link href="/about" className="text-sm font-medium hover:text-[#d68c45] transition-colors">About</Link>
                </div>
              </nav>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
            {children}
          </main>
          <footer className="border-t border-gray-100 py-8 mt-8">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Link href="/" className="text-2xl font-bold tracking-tight">
                    Purrfect Paws
                  </Link>
                  <p className="mt-2 text-sm text-gray-600">
                    A website dedicated to cat lovers featuring cat photos, breed information, and interactive features.
                  </p>
                </div>
                <div className="flex flex-col md:items-end justify-center">
                  <div className="flex space-x-6">
                    <a href="https://icatcare.org/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#d68c45] transition-colors">International Cat Care</a>
                    <a href="https://www.aspca.org/pet-care/cat-care" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#d68c45] transition-colors">ASPCA Cat Care</a>
                    <a href="https://www.tica.org/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#d68c45] transition-colors">The International Cat Association</a>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">© 2025 Purrfect Paws. All rights reserved.</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
