import { PERFUME_CATALOG, type PerfumeProduct } from "./perfumeCatalog";

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

function toMockProduct(perfume: PerfumeProduct): Product {
  const featured = perfume.id % 4 === 0;
  const isNew = perfume.id <= 8;

  return {
    id: String(perfume.id),
    name: perfume.brand,
    shortDescription: perfume.description,
    price: perfume.price,
    images: [perfume.image],
    sku: `EDP-${perfume.slug.toUpperCase().replace(/-/g, "")}`,
    category: "FRAGRANCE",
    tags: [
      "EAU DE PARFUM",
      ...(isNew ? ["NEW"] : []),
      ...(featured ? ["FEATURED"] : []),
    ],
    description: `${perfume.brand} Eau de Parfum — ${perfume.description} Notes: ${perfume.notes}`,
    additionalInfo: {
      weight: "100 ml",
      dimensions: "12 x 5 x 15 cm",
      ingredients: perfume.notes,
    },
    reviews: [
      { author: "Sarah K.", rating: 5, text: `Absolutely love ${perfume.brand} — elegant and long-lasting.` },
      { author: "Emily R.", rating: 5, text: "Beautiful scent with a luxurious feel." },
    ],
  };
}

export const mockProducts: Record<string, Product> = Object.fromEntries(
  PERFUME_CATALOG.map((perfume) => [String(perfume.id), toMockProduct(perfume)])
);
