"use client";

import { useState, useRef, useEffect } from 'react';
import { Heart, ChevronDown } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import Header from "../components/header";
import SubNavbar from "../components/subnavbar";
import { useSearchParams } from "next/navigation";
import { products } from '../data/products';

const CharmsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [savedProducts, setSavedProducts] = useState<number[]>([]);
  const [filterOption, setFilterOption] = useState('');

  // this are the data to be displayed
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "sale";
  const activeTabProducts = products.filter(
    (product) => product.category.toLowerCase() === activeCategory
  );

  const displayedProducts = filterOption
    ? [...activeTabProducts].sort((a, b) => {
      if (filterOption === "lowToHigh") return a.price - b.price;
      if (filterOption === "highToLow") return b.price - a.price;
      if (filterOption === "discount") return b.discount - a.discount;
      return 0;
    })
    : activeTabProducts;


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
          <SubNavbar activeCategory={activeCategory} />
        </div>

        <div className="w-full mx-10 px-30 pt-5">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold">{displayedProducts.length} results</div>

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

                  <Link href={`/charms/products/${id}?category=${encodeURIComponent(activeCategory)}`}>
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
                  </Link>

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
