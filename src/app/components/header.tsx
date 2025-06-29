"use client";

import Image from 'next/image';
import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const currentPath = usePathname(); // get current path
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

  {/*  make it easy to add more options for future */ }
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/charms', label: 'Charms' },
    { href: '/dailyfortune', label: 'Fortune' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <header className="flex justify-between items-center px-4 py-1 bg-white shadow-md relative font-semibold">
      <div className="flex items-center justify-between w-full px-4 pr-10 relative">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <nav className="flex gap-6 text-xl font-main mt-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover ${currentPath === href
                ? 'text-[#9F78FF]'
                : 'text-gray-700'
                }`}
            >
              {label}
            </Link>
          ))}
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
  );
}
