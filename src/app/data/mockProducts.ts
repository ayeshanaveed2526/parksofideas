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
    images: [
      "/images/shop/hair-coloring/hair-coloring-01.webp",
      "/images/shop/hair-coloring/hair-coloring-02.webp"
    ],
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
    images: [
      "/images/shop/midnight-musk-amber/midnight-musk-amber-01.webp",
      "/images/shop/midnight-musk-amber/midnight-musk-amber-02.webp",
      "/images/shop/midnight-musk-amber/midnight-musk-amber-03.webp"
    ],
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
    images: [
      "/images/shop/eye-brightening-corrector/eye-brightening-corrector-01.webp",
      "/images/shop/eye-brightening-corrector/eye-brightening-corrector-02.webp"
    ],
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
      "/images/shop/bodifying-shampoo/bodifying-shampoo-01.webp",
      "/images/shop/bodifying-shampoo/bodifying-shampoo-02.webp",
      "/images/shop/bodifying-shampoo/bodifying-shampoo-03.webp"
    ,
      "/images/shop/cleansing-oil-shampoo/cleansing-oil-shampoo-01.webp",
      "/images/shop/cleansing-oil-shampoo/cleansing-oil-shampoo-02.webp"],
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
    images: [
      "/images/shop/oil-infused-lip-tint/oil-infused-lip-tint-01.webp",
      "/images/shop/oil-infused-lip-tint/oil-infused-lip-tint-02.webp",
      "/images/shop/oil-infused-lip-tint/oil-infused-lip-tint-03.webp"
    ,
      "/images/shop/extra-lip-tint/extra-lip-tint-01.webp",
      "/images/shop/extra-lip-tint/extra-lip-tint-02.webp",
      "/images/shop/extra-lip-tint/extra-lip-tint-03.webp"],
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
    images: [
      "/images/shop/oil-free-foundation/oil-free-foundation-01.webp",
      "/images/shop/oil-free-foundation/oil-free-foundation-02.webp",
      "/images/shop/oil-free-foundation/oil-free-foundation-03.webp"
    ],
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
    images: [
      "/images/shop/long-lash-serum/long-lash-serum-01.webp",
      "/images/shop/long-lash-serum/long-lash-serum-02.webp"
    ],
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
    images: [
      "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-01.webp",
      "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-02.webp",
      "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-03.webp",
      "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-04.webp",
      "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-05.webp",
      "/images/shop/purity-made-simple-cleanser/purity-made-simple-cleanser-06.webp"
    ],
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
    images: [
      "/images/shop/priming-filter-face/priming-filter-face-01.webp",
      "/images/shop/priming-filter-face/priming-filter-face-02.webp",
      "/images/shop/priming-filter-face/priming-filter-face-03.webp"
    ],
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
    images: [
      "/images/shop/instant-retouch-primer/instant-retouch-primer-01.webp",
      "/images/shop/instant-retouch-primer/instant-retouch-primer-02.webp"
    ],
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
    images: [
      "/images/shop/extra-illuminating-moisture-balm/extra-illuminating-moisture-balm-01.webp",
      "/images/shop/extra-illuminating-moisture-balm/extra-illuminating-moisture-balm-02.webp",
      "/images/shop/extra-illuminating-moisture-balm/extra-illuminating-moisture-balm-03.webp"
    ],
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
    images: [
      "/images/shop/voce-viva-eau-de-parfum/voce-viva-eau-de-parfum-01.webp",
      "/images/shop/voce-viva-eau-de-parfum/voce-viva-eau-de-parfum-02.webp",
      "/images/shop/voce-viva-eau-de-parfum/voce-viva-eau-de-parfum-03.webp",
      "/images/shop/voce-viva-eau-de-parfum/voce-viva-eau-de-parfum-04.webp"
    ],
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
    images: [
      "/images/shop/airbrush-matte/airbrush-matte-01.webp",
      "/images/shop/airbrush-matte/airbrush-matte-02.webp",
      "/images/shop/airbrush-matte/airbrush-matte-03.webp",
      "/images/shop/airbrush-matte/airbrush-matte-04.webp",
      "/images/shop/airbrush-matte/airbrush-matte-05.webp"
    ],
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
    images: [
      "/images/shop/flyliner-longwear-eyeliner/flyliner-longwear-eyeliner-01.webp",
      "/images/shop/flyliner-longwear-eyeliner/flyliner-longwear-eyeliner-02.webp",
      "/images/shop/flyliner-longwear-eyeliner/flyliner-longwear-eyeliner-03.webp",
      "/images/shop/flyliner-longwear-eyeliner/flyliner-longwear-eyeliner-04.webp"
    ,
      "/images/shop/perfect-brow-pencil/perfect-brow-pencil-01.webp",
      "/images/shop/perfect-brow-pencil/perfect-brow-pencil-02.webp"],
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
    images: [
      "/images/shop/face-body-foundation/face-body-foundation-01.webp",
      "/images/shop/face-body-foundation/face-body-foundation-02.webp",
      "/images/shop/face-body-foundation/face-body-foundation-03.webp"
    ],
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
    images: [
      "/images/shop/matte-revolution-lipstick/matte-revolution-lipstick-01.webp",
      "/images/shop/matte-revolution-lipstick/matte-revolution-lipstick-02.webp",
      "/images/shop/matte-revolution-lipstick/matte-revolution-lipstick-03.webp"
    ],
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
    images: [
      "/images/shop/lactic-acid-treatment/lactic-acid-treatment-01.webp",
      "/images/shop/lactic-acid-treatment/lactic-acid-treatment-02.webp",
      "/images/shop/lactic-acid-treatment/lactic-acid-treatment-03.webp"
    ],
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
    images: [
      "/images/shop/eau-de-soleil-blanc-set/eau-de-soleil-blanc-set-01.webp",
      "/images/shop/eau-de-soleil-blanc-set/eau-de-soleil-blanc-set-02.webp",
      "/images/shop/eau-de-soleil-blanc-set/eau-de-soleil-blanc-set-03.webp",
      "/images/shop/eau-de-soleil-blanc-set/eau-de-soleil-blanc-set-04.webp"
    ],
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
