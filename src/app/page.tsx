"use client";

import Image from 'next/image';
import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';

// need to add check session if still valid first, otherwise redirect to login page
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-purple-50">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          <nav className="flex gap-6 text-lg">
            <Link href="/" className="hover">Home</Link>
            <Link href="/charms" className="hover">Charms</Link>
            <Link href="/fortune" className="hover">Fortune</Link>
            <Link href="/about" className="hover">About Us</Link>
          </nav>
        </div>
        <div className="flex gap-6">
          <ShoppingCart className="w-6 h-6 text-gray-600 hover" />
          <User className="w-6 h-6 text-gray-600 hover" />
        </div>
      </header>

      {/* Main Section */}
      <main className="ml-10 p-10 flex gap-10 justify-center items-center">
        <div className="flex-1">
          <h1 className="text-6xl font-bold mb-4 text-left leading-[1.3]">
            Wear Fortune <br />
            Whispers,<br />
            Luck Echoes
          </h1>

          <div className="flex gap-4 text-2xl">
            <button className="bg-purple-800 text-white px-6 py-2 hover:bg-purple-900">
              Today&apos;s Fortune
            </button>
            <button className="text-purple-400 hover">
              Products →
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 items-start">
          <Image
            src="/j1.jpg"
            alt="Product Large"
            width={400}
            height={800}
            className="homeImage"
          />
          <Image
            src="/j2.png"
            alt="Product Small"
            width={300}
            height={600}
            className="homeImage self-end"
          />
        </div>
      </main>
    </div>
  );
}

export default HomePage;