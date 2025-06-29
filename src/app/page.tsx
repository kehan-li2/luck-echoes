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
      <header className="flex justify-between items-center px-4 py-1 bg-white shadow-md relative font-semibold">
        <div className="flex items-center justify-between w-full px-4 pr-10 relative">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          <nav className="flex gap-6 text-xl font-main mt-2">
            <Link href="/" className="hover">Home</Link>
            <Link href="/charms" className="hover">Charms</Link>
            <Link href="/fortune" className="hover">Fortune</Link>
            <Link href="/about" className="hover">About Us</Link>
          </nav>
        </div>

        <div className="flex gap-6 items-center relative pr-10">
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

      <main className="ml-14 px-6 py-10 flex flex-col lg:flex-row items-center justify-between min-h-[75vh]">
        {/* Left Section, then welcome text */}
        <div className="w-full lg:w-1/2 ml-15 mb-10 lg:mb-0">
          <h1 className="lg:mb-15 sm:mb-5 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-caption italic ">
            Wear Fortune <br />
            Whispers,<br />
            Luck Echoes
          </h1>

          <div className="flex gap-4 text-xl font-main sm:mb-5">
            <Link href="/dailyfortune">
              <button className="bg-purple-400 text-white px-6 py-2 rounded-lg hover:bg-purple-500">
                Today&apos;s Fortune
              </button>
            </Link>
            <button className="text-purple-400 hover:text-purple-500">
              Products →
            </button>
          </div>
        </div>

        <Image
          src="/dog.png"
          alt="Pet dog"
          width={300}
          height={300}
          className="absolute transform translate-x-[170%]"
        />


        {/* Right Section, images */}
        <div className="w-full lg:w-1/2 flex items-end gap-3">
          {/* Left Big Image */}
          <div className="relative h-[70vh] basis-3/5 lg:mt-10 sm:mt-5">
            <Image
              src="/p1.png"
              alt="Product Large"
              width={400}
              height={1000}
              className="w-full h-full rounded-bl-[176px]"
            />
            <div className="border-[#414BB6] absolute inset-0 transform translate-x-7 -translate-y-7 border-2 border-btn-border rounded-bl-[176px] rounded-tr-[176px]" />
          </div>

          {/* Right Small Image */}
          <div className="basis-2/5 h-[42vh] flex items-end">
            <Image
              src="/p2.png"
              alt="Product Small"
              width={200}
              height={400}
              className="w-full h-full rounded-tr-[176px]"
            />
          </div>
        </div>
      </main>

    </div>
  );
};

export default HomePage;
