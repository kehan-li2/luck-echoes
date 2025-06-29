"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from "../components/header";

const categories = ["SALE", "Necklace", "Bracelet", "Phone Accessories", "Crystals", "Candles", "Essential Oils"];

const CharmsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-purple-50">
      {/* Top Navigation Bar */}
      <Header />
      <main className="relative h-screen overflow-y-auto flex flex-col items-center text-center justify-center">
        {/* background image */}
        <div className="relative w-full h-[50vh]">
          <Image
            src="/charmsback.jpg"
            alt="Background"
            fill
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative h-[100%]  w-full">

          {/* the sub nav bar */}
          <div className="flex text-xl font-text bg-white justify-center p-4 gap-6 rounded-lg shadow-md">
            {categories.map((item, index) => (
              <button
                key={item}
                onClick={() => setActiveTab(index)}
                className={`mx-4 py-1 transition-colors duration-100  ${index === activeTab
                  ? 'text-[#9F78FF] border-b-2 border-[#9F78FF]'
                  : 'text-gray-700 hover:text-purple-500'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </main>


    </div >
  );
};

export default CharmsPage;
