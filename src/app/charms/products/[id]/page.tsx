"use client";

import { useState, useEffect } from 'react';
import { Heart } from "lucide-react";
import Image from 'next/image';
import Header from "../../../components/header";
import SubNavbar from "../../../components/subnavbar";
import { useParams, useSearchParams } from 'next/navigation';
import { products } from '@/app/data/products';


const ProductPage = () => {
  const params = useParams();
  const id = Number(params?.id);
  const selectedProduct = products.find((p) => p.id === id);

  // return there is no product found
  if (!selectedProduct) return <p>Product not found</p>;

  const [savedProducts, setSavedProducts] = useState<number[]>([]);
  const [bagItems, setBagItems] = useState<number[]>([]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = selectedProduct?.colors?.[selectedColorIndex] ?? null;
  // this is the image for thumbnails, if there is no colors, then display the product pic
  const [selectedImage, setSelectedImage] = useState(
    selectedProduct?.colors?.length
      ? selectedProduct.colors[0].images[0]
      : selectedProduct?.pic
  );

  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "sale";

  const discountPrice = selectedProduct.discount
    ? selectedProduct.price * (1 - selectedProduct.discount / 100)
    : selectedProduct.price;

  useEffect(() => {
    setSelectedImage(selectedImage);
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
              {selectedColor?.images.map((img: any) => (
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
              <Image src={selectedImage ?? "/p1.jpg"} alt="main" fill className="object-cover" />

              <button
                onClick={() => addToSave(selectedProduct.id)}
                className="absolute top-4 right-4 bg-white p-1 rounded-full"
                aria-label="Save product"
              >
                {savedProducts.includes(selectedProduct.id) ? (
                  <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                ) : (
                  <Heart className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Right Side: Some product info */}
          <div className="flex-1 flex flex-col gap-6 max-w-md text-left mt-10">
            <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
            <p className="text-gray-500 text-xl">{selectedProduct.description}</p>

            {/* Price */}
            <div className="text-2xl font-semibold font-main mb-5">
              {selectedProduct.discount ? (
                <>
                  <span className="text-gray-900 mr-3">${discountPrice.toFixed(2)}</span>
                  <span className="line-through text-gray-400 text-lg">${selectedProduct.price.toFixed(2)}</span>
                </>
              ) : (
                <span>${selectedProduct.price.toFixed(2)}</span>
              )}
            </div>

            {/* Color selection */}
            <div className='mb-5'>
              <h3 className="text-xl mb-2 font-bold">Colors</h3>
              <div className="flex gap-3">
                {selectedProduct?.colors?.map((color: any, idx: number) => (
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
            <button onClick={() => addToBag(selectedProduct.id)}
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
