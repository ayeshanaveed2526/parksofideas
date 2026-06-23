export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  price: number;
  images: string[];
  sku: string;
  category: string;
  tags: string[];
  description: string;
  additionalInfo: { weight: string; dimensions: string; ingredients: string };
  reviews: { author: string; rating: number; text: string }[];
}

export const mockProducts: Record<string, Product> = {
  "1": {
    id: "1",
    name: "HAIR COLORING",
    shortDescription: "A semi-permanent hair color in a deep conditioning.",
    price: 80,
    images: ["/images/luchiana-3056568558.webp"],
    sku: "SKU-777",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "A semi-permanent hair color in a deep conditioning. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "2": {
    id: "2",
    name: "MIDNIGHT MUSK",
    shortDescription: "Earthy & Woody.",
    price: 150,
    images: ["/images/luchiana-3032395463.webp"],
    sku: "SKU-33273",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "Earthy & Woody. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "3": {
    id: "3",
    name: "BRIGHTENING CORRECTOR",
    shortDescription: "A full-coverage color corrector.",
    price: 60,
    images: ["/images/luchiana-3022718468-520x460.webp"],
    sku: "SKU-91984",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "A full-coverage color corrector. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "4": {
    id: "4",
    name: "BODIFYING SHAMPOO",
    shortDescription: "A gentle but thorough cleanser that leaves hair.",
    price: 50,
    images: [
      "/images/luchiana-3015865450-520x460.webp",
      "/images/luchiana-3002880645-520x460.webp",
      "/images/luchiana-3025788510-520x460.webp",
      "/images/luchiana-3050518087-520x460.webp"
    ],
    sku: "SKU-56352",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "A gentle but thorough cleanser that leaves hair. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "5": {
    id: "5",
    name: "OIL-INFUSED LIP TINT",
    shortDescription: "A hydrating lip oil with a hint of the universally flattering.",
    price: 45,
    images: ["/images/luchiana-3002880645-520x460.webp"],
    sku: "SKU-24033",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "A hydrating lip oil with a hint of the universally flattering. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "6": {
    id: "6",
    name: "OIL-FREE FOUNDATION",
    shortDescription: "Oil-free foundation that delivers buildable.",
    price: 80,
    images: ["/images/luchiana-3050518087-520x460.webp"],
    sku: "SKU-26758",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "Oil-free foundation that delivers buildable. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "7": {
    id: "7",
    name: "LONG LASH SERUM",
    shortDescription: "This is an external product.",
    price: 25,
    images: ["/images/luchiana-3037998670-520x460.webp"],
    sku: "SKU-55568",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "This is an external product. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "8": {
    id: "8",
    name: "PURITY MADE CLEANSER",
    shortDescription: "Top-selling facial cleanser.",
    price: 60,
    images: ["/images/luchiana-3025788510-520x460.webp"],
    sku: "SKU-53697",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "Top-selling facial cleanser. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "9": {
    id: "9",
    name: "PRIMING FILTER FACE",
    shortDescription: "A primer that uses backlight technology.",
    price: 50,
    images: ["/images/luchiana-3016001322-520x460.webp"],
    sku: "SKU-49353",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "A primer that uses backlight technology. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "10": {
    id: "10",
    name: "INSTANT RETOUCH PRIMER",
    shortDescription: "Longer wear with an instant retouch effect.",
    price: 45,
    images: ["/images/luchiana-3006105529-520x460.webp"],
    sku: "SKU-35691",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "Longer wear with an instant retouch effect. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "11": {
    id: "11",
    name: "FLOWERBOMB",
    shortDescription: "Vert de Bergamot, Coco de Mer Accord.",
    price: 200,
    images: ["/images/flowerbomb.webp"],
    sku: "SKU-14357",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "Vert de Bergamot, Coco de Mer Accord. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "12": {
    id: "12",
    name: "VOCE VIVA EAU DE PARFUM",
    shortDescription: "Italian Bergamot, Orange Blossom Absolute.",
    price: 150,
    images: ["/images/voce-viva.webp"],
    sku: "SKU-82846",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "Italian Bergamot, Orange Blossom Absolute. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "13": {
    id: "13",
    name: "AIRBRUSH MATTE",
    shortDescription: "Skin-perfecting bronzed filter for the face.",
    price: 40,
    images: ["/images/luchiana-3022279061.webp"],
    sku: "SKU-61328",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "Skin-perfecting bronzed filter for the face. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "14": {
    id: "14",
    name: "EYELINER PACK",
    shortDescription: "A hyper-saturated, water-resistant, liquid eyeliner.",
    price: 40,
    images: ["/images/new_eyeliner.webp"],
    sku: "SKU-43288",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "A hyper-saturated, water-resistant, liquid eyeliner. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "15": {
    id: "15",
    name: "FACE & BODY FOUNDATION",
    shortDescription: "A foundation for the face and body.",
    price: 40,
    images: ["/images/new_dior_foundation.webp"],
    sku: "SKU-74274",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "A foundation for the face and body. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "16": {
    id: "16",
    name: "VELVET LIPSTICK",
    shortDescription: "Luxurious velvet matte lipstick with rich pigment.",
    price: 25,
    images: ["/images/luchiana-0654102558.webp"],
    sku: "SKU-12375",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "Luxurious velvet matte lipstick with rich pigment. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "17": {
    id: "17",
    name: "HYDRATING SERUM",
    shortDescription: "Deeply hydrates and replenishes the skin barrier.",
    price: 55,
    images: ["/images/luchiana-0654733209.webp"],
    sku: "SKU-57598",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "Deeply hydrates and replenishes the skin barrier. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
  "18": {
    id: "18",
    name: "FRAGRANCE ESSENCE",
    shortDescription: "A sophisticated floral scent with warm vanilla notes.",
    price: 75,
    images: ["/images/luchiana-0654439537.webp"],
    sku: "SKU-63459",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "A sophisticated floral scent with warm vanilla notes. Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
    additionalInfo: {
      weight: "0.5 kg",
      dimensions: "10 x 5 x 15 cm",
      ingredients: "Aqua, Glycerin, Premium Extracts..."
    },
    reviews: [
      { author: "Jane Doe", rating: 5, text: "Absolutely love it!" },
      { author: "John Smith", rating: 4, text: "Great quality, very sophisticated." }
    ]
  },
};
