const fs = require('fs');

const topCat = fs.readFileSync('src/app/components/TopCategory.tsx', 'utf-8');
const newProd = fs.readFileSync('src/app/components/NewProducts.tsx', 'utf-8');

function parseArray(text, keyword) {
  let start = text.indexOf(keyword);
  if (start === -1) return [];
  let arrStr = text.substring(start);
  arrStr = arrStr.substring(arrStr.indexOf('['));
  arrStr = arrStr.substring(0, arrStr.indexOf('];') + 1);
  return eval('(' + arrStr + ')');
}

const topProducts = parseArray(topCat, 'const newestProducts: Product[] = [');
const newProductsList = parseArray(newProd, 'const productsData: Product[] = [');
const allProducts = [...topProducts, ...newProductsList];

let newMockContent = `export interface Product {
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
`;

allProducts.forEach(p => {
  const pPrice = parseFloat(p.price.replace('$', '').split(' ')[0]) || 0;
  newMockContent += `  "${p.id}": {
    id: "${p.id}",
    name: "${p.name}",
    shortDescription: "${p.description}",
    price: ${pPrice},
    images: [` + (p.image ? `"${p.image}"` : `"/images/luchiana-3032395463.webp"`) + `],
    sku: "SKU-${Math.floor(Math.random() * 100000)}",
    category: "BEAUTY",
    tags: ["NEW", "TRENDING"],
    description: "${p.description} Experience the luxurious quality of this product, designed to provide exceptional results. Enhance your daily routine with premium ingredients and careful craftsmanship.",
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
`;
});

newMockContent += `};
`;

fs.writeFileSync('src/app/data/mockProducts.ts', newMockContent);
console.log('Successfully generated mock products!');
