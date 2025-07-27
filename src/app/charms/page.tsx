"use client";

import { useState, useRef, useEffect } from 'react';
import { Heart, ChevronDown } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import Header from "../components/header";
import SubNavbar from "../components/subnavbar";
import { useSearchParams } from "next/navigation";

// this data should be fetch from db next time
const products = [
  {
    id: 1,
    price: 120,
    discount: 20,
    name: "Moonlit Serenity Bracelet",
    description: "A delicate silver bracelet adorned with shimmering pearls that capture the calm glow of the moonlight.",
    pic: "/p1.jpg",
    category: "bracelet"
  },
  {
    id: 2,
    price: 65,
    discount: 0,
    name: "Timeless Leather Wrap Bracelet",
    description: "Handcrafted genuine leather bracelet with a minimalist design, perfect for everyday wear.",
    pic: "/p2.jpeg",
    category: "bracelet"
  },
  {
    id: 3,
    price: 85,
    discount: 10,
    name: "Golden Glow Bracelet",
    description: "Elegant bracelet featuring warm gold tones, designed to add a radiant touch to any outfit.",
    pic: "/p3.jpeg",
    category: "bracelet"
  },
  {
    id: 4,
    price: 150,
    discount: 10,
    name: "Eclipse Statement Ring",
    description: "Bold and modern ring inspired by the beauty of a solar eclipse, crafted to stand out.",
    pic: "/p4.jpeg",
    category: "sale"
  },
  {
    id: 5,
    price: 210,
    discount: 0,
    name: "Radiance Pearl Necklace",
    description: "Classic necklace with luminous pearls that bring timeless elegance and grace.",
    pic: "/p5.jpg",
    category: "necklace"
  },
  {
    id: 6,
    price: 99,
    discount: 25,
    name: "Crystal Calm Necklace",
    description: "A soothing amethyst pendant necklace for peace and clarity.",
    pic: "/p6.jpg",
    category: "sale"
  },
  {
    id: 7,
    price: 45,
    discount: 15,
    name: "Midnight Charm Bracelet",
    description: "Features celestial charms on a soft blue cord, now at a special price.",
    pic: "/p7.jpg",
    category: "sale"
  },
  {
    id: 8,
    price: 75,
    discount: 30,
    name: "Lavender Luxe Candle",
    description: "Relaxing candle with real lavender buds, 30% off for a limited time.",
    pic: "/p8.jpg",
    category: "sale"
  },
  {
    id: 9,
    price: 180,
    discount: 0,
    name: "Celestial Dreams Necklace",
    description: "A dainty moon and stars design on a fine gold chain.",
    pic: "/p9.jpg",
    category: "necklace"
  },
  {
    id: 10,
    price: 240,
    discount: 15,
    name: "Rose Quartz Pendant",
    description: "Rose quartz drop wrapped in sterling silver, radiates soft healing energy.",
    pic: "/p10.jpg",
    category: "necklace"
  },
  {
    id: 11,
    price: 130,
    discount: 0,
    name: "Ocean Breeze Locket",
    description: "Vintage-style locket with a delicate sea blue enamel inlay.",
    pic: "/p11.jpg",
    category: "necklace"
  },
  {
    id: 12,
    price: 95,
    discount: 0,
    name: "Rose Gold Link Bracelet",
    description: "Stylish and sleek with interlocking rose gold links for daily elegance.",
    pic: "/p12.jpg",
    category: "bracelet"
  },
  {
    id: 13,
    price: 70,
    discount: 5,
    name: "Crystal Bloom Cuff",
    description: "Adjustable cuff bracelet embedded with tiny crystal flowers.",
    pic: "/p13.jpg",
    category: "bracelet"
  },
  {
    id: 14,
    price: 28,
    discount: 0,
    name: "Moonphase PopSocket",
    description: "Functional grip featuring moon phase design in soft purple hues.",
    pic: "/p14.jpg",
    category: "phone accessories"
  },
  {
    id: 15,
    price: 45,
    discount: 10,
    name: "Crystal Clear Phone Case",
    description: "Slim, durable case with pressed dried flowers and crystals inside.",
    pic: "/p15.jpg",
    category: "phone accessories"
  },
  {
    id: 16,
    price: 32,
    discount: 0,
    name: "Mystic Charm Phone Strap",
    description: "Colorful beaded strap with small amulets for flair and function.",
    pic: "/p16.jpg",
    category: "phone accessories"
  },
  {
    id: 17,
    price: 22,
    discount: 0,
    name: "Amethyst Cluster",
    description: "Known for calming energy, perfect for meditation or decor.",
    pic: "/p17.jpg",
    category: "crystals"
  },
  {
    id: 18,
    price: 18,
    discount: 0,
    name: "Clear Quartz Point",
    description: "Master healer stone, great for clarity and amplification.",
    pic: "/p18.jpg",
    category: "crystals"
  },
  {
    id: 19,
    price: 30,
    discount: 5,
    name: "Rose Quartz Heart",
    description: "Polished crystal in heart shape, symbol of love and compassion.",
    pic: "/p19.jpg",
    category: "crystals"
  },
  {
    id: 20,
    price: 27,
    discount: 0,
    name: "Citrine Tumbled Set",
    description: "Sunny citrine stones for energy, creativity, and confidence.",
    pic: "/p20.jpg",
    category: "crystals"
  },
  {
    id: 21,
    price: 42,
    discount: 0,
    name: "Tranquil Moon Candle",
    description: "Soothing vanilla and sandalwood blend in a frosted jar.",
    pic: "/p21.jpg",
    category: "candles"
  },
  {
    id: 22,
    price: 38,
    discount: 10,
    name: "Rose Petal Candle",
    description: "Hand-poured soy wax candle with real rose petals inside.",
    pic: "/p22.jpg",
    category: "candles"
  },
  {
    id: 23,
    price: 36,
    discount: 0,
    name: "Citrus Glow Candle",
    description: "Zesty and refreshing orange-lime blend for uplifted moods.",
    pic: "/p23.jpg",
    category: "candles"
  }
  , {
    id: 24,
    price: 25,
    discount: 0,
    name: "Lavender Essential Oil",
    description: "Calming and versatile—perfect for stress relief and sleep.",
    pic: "/p24.jpg",
    category: "essential oils"
  },
  {
    id: 25,
    price: 29,
    discount: 0,
    name: "Eucalyptus Oil",
    description: "Fresh scent with clearing properties—great for focus and breath.",
    pic: "/p25.jpg",
    category: "essential oils"
  },
  {
    id: 26,
    price: 32,
    discount: 5,
    name: "Rose Geranium Oil",
    description: "Floral and balancing, ideal for skincare or aromatherapy.",
    pic: "/p26.jpg",
    category: "essential oils"
  }

];

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
