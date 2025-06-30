"use client";

import { useState, useRef, useEffect } from 'react';
import { Heart, ChevronDown } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import Header from "../components/header";

const categories = ["SALE", "Necklace", "Bracelet", "Phone Accessories", "Crystals", "Candles", "Essential Oils"];

// this data should be fetch from db next time
const products = [
  {
    id: 1,
    price: 120,
    discount: 20,
    name: "Moonlit Serenity Bracelet",
    description: "A delicate silver bracelet adorned with shimmering pearls that capture the calm glow of the moonlight.",
    pic: "/p1.jpg"
  },
  {
    id: 2,
    price: 65,
    discount: 0,
    name: "Timeless Leather Wrap Bracelet",
    description: "Handcrafted genuine leather bracelet with a minimalist design, perfect for everyday wear.",
    pic: "/p2.jpeg"
  },
  {
    id: 3,
    price: 85,
    discount: 10,
    name: "Golden Glow Bracelet",
    description: "Elegant bracelet featuring warm gold tones, designed to add a radiant touch to any outfit.",
    pic: "/p3.jpeg"
  },
  {
    id: 4,
    price: 150,
    discount: 10,
    name: "Eclipse Statement Ring",
    description: "Bold and modern ring inspired by the beauty of a solar eclipse, crafted to stand out.",
    pic: "/p4.jpeg"
  },
  {
    id: 5,
    price: 210,
    discount: 0,
    name: "Radiance Pearl Necklace",
    description: "Classic necklace with luminous pearls that bring timeless elegance and grace.",
    pic: "/p5.jpg"
  }

];

const CharmsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [savedProducts, setSavedProducts] = useState<number[]>([]);
  const [filterOption, setFilterOption] = useState('');

  // this are the data to be displayed
  const displayedProducts = filterOption
    ? [...products].sort((a, b) => {
      if (filterOption === "lowToHigh") return a.price - b.price;
      if (filterOption === "highToLow") return b.price - a.price;
      if (filterOption === "discount") return b.discount - a.discount;
      return 0;
    })
    : products;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("savedProducts") || "[]");
      if (Array.isArray(saved)) {
        setSavedProducts(saved);
      }
    } catch (err) {
      console.error("Error loading saved products from the localStorage", err);
    }
  }, []);


  const addToSave = (id: number) => {
    setSavedProducts((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : [...prev, id];

      localStorage.setItem("savedProducts", JSON.stringify(updated));
      return updated;
    });

  };

  // to notify the changes for products saved
  useEffect(() => {
    window.dispatchEvent(new Event("savedProductsUpdated"));
  }, [savedProducts]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-purple-50">
      {/* Top Navigation Bar */}
      <Header />
      <main className="relative overflow-y-auto overflow-x-hidden flex flex-col items-center text-center ">
        {/* background image */}
        <div className="relative w-full h-[50vh]">
          <Image
            src="/charmsback.jpg"
            alt="Background"
            fill
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative w-full">
          {/* the sub nav bar */}
          <div className="flex text-xl font-text bg-white justify-center py-4 gap-6 rounded-lg shadow-md">
            {categories.map((item, index) => (
              <button
                key={item}
                onClick={() => setActiveTab(index)}
                className={`mx-10 py-1 transition-colors duration-100  ${index === activeTab
                  ? 'text-[#9F78FF] border-b-2 border-[#9F78FF]'
                  : 'text-gray-700 hover:text-purple-500'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full mx-10 px-30 pt-5">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold">{products.length} results</div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setFilterOpen((prev) => !prev)}
                className="flex items-center bg-amber-50 px-4 py-2 rounded-md hover:bg-[#9F78FF] hover:text-white"
              >
                {filterOption
                  ? filterOption === "lowToHigh"
                    ? "Price: Low to High"
                    : filterOption === "highToLow"
                      ? "Price: High to Low"
                      : "Discount"
                  : "Sort by"}
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>

              {filterOpen && (
                <div className="absolute bg-white shadow-lg z-10 right-0 mt-2 w-48">
                  <ul>
                    <li
                      onClick={() => {
                        setFilterOption("lowToHigh");
                        setFilterOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                    >
                      Price: Low to High
                    </li>
                    <li
                      onClick={() => {
                        setFilterOption("highToLow");
                        setFilterOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                    >
                      Price: High to Low
                    </li>
                    <li
                      onClick={() => {
                        setFilterOption("discount");
                        setFilterOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                    >
                      Discount
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Products list */}
          <div className="mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map(({ id, price, name, discount, description, pic }) => {
              const discountPrice = discount ? price * (1 - discount / 100) : price;

              return (
                <div
                  key={id}
                  className="relative bg-white rounded-lg shadow-md p-8 flex flex-col"
                >
                  {/* Save button top right */}
                  <button
                    onClick={() => addToSave(id)}
                    className="absolute top-4 right-4"
                    aria-label="Save product"
                  >
                    {savedProducts.includes(id) ? (
                      <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                    ) : (
                      <Heart className="w-6 h-6 text-gray-400" />
                    )}
                  </button>

                  <div className="overflow-hidden bg-gray-100 relative w-full mb-10 rounded-md ">
                    <Image
                      src={pic}
                      alt="Product Image"
                      width={800}
                      height={800}
                      className="object-cover"
                    />

                    {discount > 0 && (
                      <span className="absolute bottom-2 left-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* product details */}
                  <h3 className="text-lg font-text mb-1 text-left">{name}</h3>
                  <p className="text-gray-500 text-sm mb-4 text-left">{description}</p>
                  <div className="flex items-baseline gap-3 mt-auto font-main">
                    {discount ? (
                      <>
                        <span className="text-xl">
                          ${discountPrice.toFixed(2)}
                        </span>
                        <span className="line-through text-gray-400">
                          ${price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl text-gray-900">
                        ${price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </div >
  );
};

export default CharmsPage;
