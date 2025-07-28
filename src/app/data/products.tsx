// this data should be fetch from db next time, store globally
export const products = [
  {
    id: 1,
    price: 120,
    discount: 20,
    name: "Moonlit Serenity Bracelet",
    description: "A delicate silver bracelet adorned with shimmering pearls that capture the calm glow of the moonlight.",
    pic: "/p1.jpg",
    category: "bracelet",
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
  },
  {
    id: 2,
    price: 65,
    discount: 0,
    name: "Timeless Leather Wrap Bracelet",
    description: "Handcrafted genuine leather bracelet with a minimalist design, perfect for everyday wear.",
    pic: "/bracelet2.png",
    category: "bracelet"
  },
  {
    id: 3,
    price: 85,
    discount: 10,
    name: "Golden Glow Bracelet",
    description: "Elegant bracelet featuring warm gold tones, designed to add a radiant touch to any outfit.",
    pic: "/bracelet4.png",
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
    pic: "/necklace2.png",
    category: "necklace"
  },
  {
    id: 10,
    price: 240,
    discount: 15,
    name: "Rose Quartz Pendant",
    description: "Rose quartz drop wrapped in sterling silver, radiates soft healing energy.",
    pic: "/necklace1.png",
    category: "necklace"
  },
  {
    id: 11,
    price: 130,
    discount: 0,
    name: "Ocean Breeze Locket",
    description: "Vintage-style locket with a delicate sea blue enamel inlay.",
    pic: "/necklace3.png",
    category: "necklace"
  },
  {
    id: 12,
    price: 95,
    discount: 0,
    name: "Rose Gold Link Bracelet",
    description: "Stylish and sleek with interlocking rose gold links for daily elegance.",
    pic: "/bracelet3.png",
    category: "bracelet"
  },
  {
    id: 13,
    price: 70,
    discount: 5,
    name: "Crystal Bloom Cuff",
    description: "Adjustable cuff bracelet embedded with tiny crystal flowers.",
    pic: "/bracelet1.png",
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