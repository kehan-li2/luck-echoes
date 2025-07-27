"use client";
import { useRouter } from "next/navigation";

// shared categories info
const categories = ["SALE", "Necklace", "Bracelet", "Phone Accessories", "Crystals", "Candles", "Essential Oils"];

interface SubNavbarProps {
  activeCategory: string;
}

export default function SubNavbar({ activeCategory }: SubNavbarProps) {
  const router = useRouter();

  // get the indix of the tab
  const activeTab = categories.findIndex(c => c.toLowerCase() === activeCategory.toLowerCase());

  const handleTabClick = (index: number) => {
    const selectedCategory = categories[index].toLowerCase();
    router.push(`/charms?category=${encodeURIComponent(selectedCategory)}`);
  };

  return (
    <div className="flex text-xl font-text bg-white justify-center py-4 gap-6 rounded-lg shadow-md">
      {categories.map((item, index) => (
        <button
          key={item}
          onClick={() => handleTabClick(index)}
          className={`mx-10 py-1 transition-colors duration-100 ${index === activeTab
            ? "text-[#9F78FF] border-b-2 border-[#9F78FF]"
            : "text-gray-700 hover:text-purple-500"
            }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
