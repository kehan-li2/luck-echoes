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

      <main className="overflow-y-auto mx-20 px-6 flex flex-col min-h-[75vh] -mt-15">
        {/* First section: welcome */}
        <div className='w-full h-screen flex flex-col lg:flex-row items-center justify-between'>
          {/* Left Section, the welcome text */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
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
            className="absolute transform translate-x-[150%]"
          />

          {/* Right Section, images */}
          <div className="w-full lg:w-1/2 flex items-end gap-3">
            {/* left big image */}
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

            {/* right small image */}
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
        </div>

        {/* Second section: charms */}
        <div className="w-full px-4 text-center mb-30">
          <h1 className="text-7xl italic font-main mb-10">Charms</h1>
          <div className='flex flex-col lg:flex-row items-center'>
            {/* left image */}
            <div className="w-full lg:w-1/2">
              <Image
                src="/charms.png"
                alt="Charms"
                width={400}
                height={400}
                className="w-[80%] h-auto rounded-tl-[176px]"
              />
            </div>

            {/* right content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left">
              <h2 className="text-5xl font-bold font-main mb-5">Bespoke Charms</h2>
              <p className="text-gray-500 font-text text-2xl mb-10">
                Design and craft personalized charms tailored to bring good fortune. Each charm is thoughtfully customized to reflect your unique style, intentions, or aspirations.
              </p>
              <Link href="/charms">
                <button className="bg-purple-400 text-white px-6 py-2 rounded-lg hover:bg-purple-500 font-main text-xl">
                  Browse More
                </button>
              </Link>
            </div>
          </div>
        </div>


        {/* Third section: fortune */}
        <div className="w-full  min-h-[60vh] px-4 mb-30">
          <h1 className="text-7xl italic font-main mb-10 text-center">Daily Fortune</h1>

          <div className=" p-20 flex flex-col lg:flex-row items-center bg-[#FFFBF4] rounded-[100px]">
            {/* descriptions */}
            <div className="w-full lg:w-1/2 h-full justify-center flex flex-col">
              <h2 className="text-5xl font-bold font-main mb-6">Today's Mood: <span className='text-blue-400 text-6xl ml-5'>82 points</span></h2>
              <p className="text-gray-500 font-text text-2xl">
                Today's mood feels dreamy yet grounded, like walking through soft morning light with a heart full of quiet optimism. You're likely feeling warm and reflective—creative ideas may flow easily, and there's a sense of emotional clarity. It's a good day to lean into beauty, expression, and gentle connection with others.
              </p>
            </div>

            {/* Bar section */}
            <div className="flex w-full lg:w-1/2 h-full justify-around items-end gap-4">
              {[
                { label: 'Love', value: 75, color: 'bg-[#FFA7B9]', text: 'text-pink-600' },
                { label: 'Wealth', value: 71, color: 'bg-[#FFD28B]', text: 'text-orange-600' },
                { label: 'Career', value: 87, color: 'bg-[#8493F7]', text: 'text-purple-600' },
                { label: 'Study', value: 89, color: 'bg-[#3DAEFF]', text: 'text-blue-600' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* bar */}
                  <div className="relative h-100 w-6 mb-2 bg-[#E8E8E8] rounded-full overflow-hidden flex items-end">
                    <div
                      className={`${item.color} w-full rounded-full`}
                      style={{ height: `${item.value}%` }}
                    />
                  </div>
                  {/* bar values */}
                  <div className={`text-2xl`}>{item.value}</div>
                  {/* labels */}
                  <div className="text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>


        {/* Fourth section: ig connect */}
        <div className="w-full px-4 text-center mb-30">
          <h1 className="text-7xl italic font-main mb-10">Connect us on Instagram</h1>

          <div className="max-h-[50vh] flex flex-col lg:flex-row gap-6 mb-10">
            {/* left image */}
            <div className="w-[35%] flex flex-col justify-between">
              <Image
                src="/c1.png"
                alt="Charms"
                width={200}
                height={400}
                className="w-full h-full rounded-tl-[100px]"
              />
            </div>

            {/* center images */}
            <div className="w-[30%] flex flex-col justify-between gap-4">
              <Image
                src="/c2.png"
                alt="Charms"
                width={100}
                height={200}
                className="w-full h-[50%]  rounded-tr-[100px]"
              />
              <Image
                src="/c3.png"
                alt="Charms"
                width={100}
                height={200}
                className="w-full h-[50%]  rounded-bl-[100px]"
              />
            </div>

            {/* right image */}
            <div className="w-[35%] flex flex-col justify-between">
              <Image
                src="/c4.png"
                alt="Charms"
                width={200}
                height={400}
                className="w-full h-full object-cover rounded-br-[100px]"
              />
            </div>
          </div>

          <Link href="/charms">
            <button className="mt-10 bg-purple-400 text-white px-6 py-2 rounded-lg hover:bg-purple-500 font-main text-xl">
              Connect Instagram
            </button>
          </Link>
        </div>

      </main>

    </div >
  );
};

export default HomePage;
