"use client";

import Image from 'next/image';
import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-purple-50">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center px-4 py-2 bg-white shadow-md relative">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          <nav className="flex gap-6 text-lg">
            <Link href="/" className="hover">Home</Link>
            <Link href="/charms" className="hover">Charms</Link>
            <Link href="/fortune" className="hover">Fortune</Link>
            <Link href="/about" className="hover">About Us</Link>
          </nav>
        </div>

        <div className="flex gap-6 items-center relative">
          <ShoppingCart className="w-6 h-6 text-gray-600 hover cursor-pointer" />

          {status === "loading" ? (
            <div className="w-6 h-6 animate-spin border-2 border-gray-400 border-t-transparent rounded-full" />
          ) : session ? (
            <div className="relative" ref={menuRef}>
              <User
                onClick={() => setMenuOpen((prev) => !prev)}
                className="w-6 h-6 text-gray-600 hover cursor-pointer"
              />
              {menuOpen && (
                <div className="absolute right-0 top-8 bg-white border shadow-md rounded-lg w-32 z-50 text-sm">
                  <button
                    onClick={() => router.push("/profile")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <User
              onClick={() => router.push("/login")}
              className="w-6 h-6 text-gray-600 hover cursor-pointer"
            />
          )}
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
            <Link href="/dailyfortune" className="hover">
              <button className="bg-purple-800 text-white px-6 py-2 hover:bg-purple-900">
                Today&apos;s Fortune
              </button>
            </Link>
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
};

export default HomePage;
