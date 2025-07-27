"use client";

import { useState, useEffect } from 'react';
import { Heart } from "lucide-react";
import Image from 'next/image';
import Header from "../../../components/header";
import SubNavbar from "../../../components/subnavbar";
import { useSearchParams } from "next/navigation";

const mockProduct = {
  id: 1,
  name: "Moonlit Serenity Bracelet",
  description: "A delicate silver bracelet adorned with shimmering pearls that capture the calm glow of the moonlight.",
  price: 120,
  discount: 20,
  colors: [
    {
      name: "Gold",
      images: ["/p1.jpg", "/p2.jpeg"],
    },
    {
      name: "Silver",
      images: ["/p3.jpeg", "/p4.jpeg"],
    },
  ],
};

const ProductPage = () => {
  const [savedProducts, setSavedProducts] = useState<number[]>([]);
  const [bagItems, setBagItems] = useState<number[]>([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = mockProduct.colors[selectedColorIndex];
  // this is the image for thumbnails
  const [selectedImage, setSelectedImage] = useState(selectedColor.images[0]);

  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "sale";

  const discountPrice = mockProduct.discount
    ? mockProduct.price * (1 - mockProduct.discount / 100)
    : mockProduct.price;

  useEffect(() => {
    setSelectedImage(selectedColor.images[0]);
  }, [selectedColor]);

  // set the color selected
  const selectColor = (index: number) => {
    setSelectedColorIndex(index);
  };

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

  const addToBag = (id: number) => {
    setBagItems((prev) => {
      const updated = [...prev, id];
      localStorage.setItem("bagItems", JSON.stringify(updated));
      return updated;
    });
  };

  // to notify the changes for bag items
  useEffect(() => {
    window.dispatchEvent(new Event("bagItemsUpdated"));
  }, [bagItems]);


  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-purple-50">
      {/* Top Navigation Bar */}
      <Header />
      <main className="relative overflow-y-auto overflow-x-hidden flex flex-col items-center text-center ">

        <div className="relative w-full">
          {/* the sub nav bar */}
          <SubNavbar activeCategory={activeCategory} />
        </div>
        {/* Product details */}
        <div className="mt-15 flex flex-col md:flex-row justify-center items-start gap-12 px-4 md:px-20">
          {/* Left side: images */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* product thumbnails */}
            <div className="flex md:flex-col gap-4 mt-4">
              {selectedColor.images.map((img) => (
                <div
                  key={img}
                  className={`w-[120px] h-[120px] border border-gray-100 rounded-md cursor-pointer overflow-hidden ${img === selectedImage ? "ring-2 ring-purple-400" : ""
                    }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image src={img} alt="thumb" width={120} height={120} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>

            {/* Big image display */}
            <div className="relative md:w-[526px] md:h-[526px] lg:w-[600px] lg:h-[600px] rounded-lg overflow-hidden shadow-md">
              <Image src={selectedImage} alt="main" fill className="object-cover" />

              <button
                onClick={() => addToSave(mockProduct.id)}
                className="absolute top-4 right-4 bg-white p-1 rounded-full"
                aria-label="Save product"
              >
                {savedProducts.includes(mockProduct.id) ? (
                  <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                ) : (
                  <Heart className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Right Side: Some product info */}
          <div className="flex-1 flex flex-col gap-6 max-w-md text-left mt-10">
            <h1 className="text-3xl font-bold">{mockProduct.name}</h1>
            <p className="text-gray-500 text-xl">{mockProduct.description}</p>

            {/* Price */}
            <div className="text-2xl font-semibold font-main mb-5">
              {mockProduct.discount ? (
                <>
                  <span className="text-gray-900 mr-3">${discountPrice.toFixed(2)}</span>
                  <span className="line-through text-gray-400 text-lg">${mockProduct.price.toFixed(2)}</span>
                </>
              ) : (
                <span>${mockProduct.price.toFixed(2)}</span>
              )}
            </div>

            {/* Color selection */}
            <div className='mb-5'>
              <h3 className="text-xl mb-2 font-bold">Colors</h3>
              <div className="flex gap-3">
                {mockProduct.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => selectColor(idx)}
                    className={`px-4 py-2 rounded-sm border ${idx === selectedColorIndex
                      ? "bg-[#9F78FF] text-white"
                      : "bg-white text-gray-700 border-gray-300"
                      }`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery options */}
            <div className="space-y-3">
              <h3 className="text-xl mb-3 font-bold">Delivery Options</h3>
              <label className="flex items-center gap-3 bg-amber-50 px-5 py-3 rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  defaultChecked
                  className="peer hidden"
                />
                <div className="w-4 h-4 rounded-full border-1 border-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all" />
                <span className="text-lg">Deliver to address</span>
              </label>

              <label className="flex items-center gap-3 bg-amber-50 px-5 py-3 rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  defaultChecked
                  className="peer hidden"
                />
                <div className="w-4 h-4 rounded-full border-1 border-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all" />
                <span className='text-lg'>Find in store</span>
              </label>

            </div>

            {/* Add to bag */}
            <button onClick={() => addToBag(mockProduct.id)}
              className="font-main text-xl mt-4 bg-[#9F78FF] text-white py-3 px-6 rounded-lg hover:bg-purple-400 transition">
              Add to Bag
            </button>
          </div>
        </div>

      </main>
    </div >
  );
};

export default ProductPage;
