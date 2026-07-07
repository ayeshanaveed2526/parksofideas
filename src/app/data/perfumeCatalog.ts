// Import MUST be at the top of the file
import mockProductsData from "../../../public/assets/mock-allproducts.json";

// ─────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────

export interface PerfumeProduct {
  id: number;
  slug: string;
  brand: string;
  description: string;
  notes: string;
  price: number;
  image: string;
  hoverImage?: string;
}

export interface ProductGalleryView {
  src: string;
  label: string;
  rotateY: number;
  rotateZ: number;
  scale: number;
  translateX: number;
  translateY: number;
}

export interface CatalogCardProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  hoverImage?: string;
  badges: { text: string; color: string; textColor?: string }[];
  outOfStock?: boolean;
  isExternal?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Static local image helpers (used as fallbacks)
// ─────────────────────────────────────────────────────────────

/** User-uploaded ELIX product shots — cycled across the catalog grid. */
export const PRODUCT_GRID_IMAGES = [
  "/assets/images/products/elix-01.png",
  "/assets/images/products/elix-02.png",
  "/assets/images/products/elix-03.png",
  "/assets/images/products/elix-04.png",
  "/assets/images/products/elix-05.png",
  "/assets/images/products/elix-06.png",
  "/assets/images/products/elix-07.png",
  "/assets/images/products/elix-08.png",
  "/assets/images/products/elix-09.png",
  "/assets/images/products/elix-10.png",
] as const;

export function getProductImageForId(id: number): string {
  const index = (id - 1) % 4;
  if (index === 0) return "/assets/images/products/top-cat-1.png";
  if (index === 1) return "/assets/images/products/top-cat-2.png";
  if (index === 2) return "/assets/images/products/top-cat-3.png";
  if (index === 3) return "/assets/images/products/top-cat-4.png";
  return PRODUCT_GRID_IMAGES[(id - 1) % PRODUCT_GRID_IMAGES.length];
}

export function getProductHoverImageForId(id: number): string | undefined {
  const index = (id - 1) % 4;
  if (index === 0) return "/assets/images/products/top-cat-1-hover.png";
  if (index === 1) return "/assets/images/products/top-cat-2-hover.png";
  if (index === 2) return "/assets/images/products/top-cat-3-hover.png";
  if (index === 3) return "/assets/images/products/top-cat-4-hover.png";
  return undefined;
}

// ─────────────────────────────────────────────────────────────
// PERFUME_CATALOG — built from mock-allproducts.json
// Images fall back to local assets if not a valid URL
// ─────────────────────────────────────────────────────────────

function resolveImage(img: string, id: number): string {
  if (!img || img.startsWith("http")) return getProductImageForId(id);
  return img;
}

function resolveHoverImage(images: string[] | undefined, id: number): string | undefined {
  if (images && images[1] && !images[1].startsWith("http")) return images[1];
  return getProductHoverImageForId(id);
}

export const PERFUME_CATALOG: PerfumeProduct[] = (
  (mockProductsData as { success: boolean; products: unknown[] }).products
).map((p: any) => ({
  id: p.id,
  slug: (p.name as string).toLowerCase().replace(/ /g, "-"),
  brand: p.brand || p.name,
  description: p.description,
  notes: p.short_description || "",
  price: p.new_price || p.old_price || 0,
  image: resolveImage(p.image, p.id),
  hoverImage: resolveHoverImage(p.images, p.id),
}));

// ─────────────────────────────────────────────────────────────
// Helpers that depend on PERFUME_CATALOG
// ─────────────────────────────────────────────────────────────

export function getPerfumeById(id: number | string): PerfumeProduct | undefined {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return PERFUME_CATALOG.find((p) => p.id === numericId);
}

export function formatPerfumePrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function toCatalogCard(perfume: PerfumeProduct): CatalogCardProduct {
  const badges: { text: string; color: string; textColor?: string }[] = [];
  let currentPrice = perfume.price;
  let originalPrice: string | undefined = undefined;

  if (perfume.id <= 6) badges.push({ text: "NEW", color: "#ffd700", textColor: "#000" });
  if (perfume.id % 4 === 0) badges.push({ text: "FEATURED", color: "#c8a96e" });
  if (perfume.id === 5) {
    badges.push({ text: "-10%", color: "#1a1a1a" });
    currentPrice = perfume.price * 0.9;
    originalPrice = formatPerfumePrice(perfume.price);
  }

  return {
    id: perfume.id,
    name: perfume.brand,
    description: perfume.description,
    price: formatPerfumePrice(currentPrice),
    originalPrice,
    image: perfume.image,
    hoverImage: perfume.hoverImage,
    badges,
    outOfStock: perfume.id === 10,
  };
}

// ─────────────────────────────────────────────────────────────
// Gallery helpers
// ─────────────────────────────────────────────────────────────

const PRODUCT_GALLERY_ANGLES: Omit<ProductGalleryView, "src">[] = [
  { label: "Front view",  rotateY: 0, rotateZ: 0, scale: 1,    translateX: 0,  translateY: 0  },
  { label: "Left angle",  rotateY: 0, rotateZ: 0, scale: 1.15, translateX: -6, translateY: 0  },
  { label: "Right angle", rotateY: 0, rotateZ: 0, scale: 1.15, translateX: 6,  translateY: 0  },
  { label: "Detail view", rotateY: 0, rotateZ: 0, scale: 1.18, translateX: 0,  translateY: -4 },
];

export function galleryViewTransform(
  view: Pick<ProductGalleryView, "rotateY" | "rotateZ" | "scale" | "translateX" | "translateY">,
  extraScale = 1
): string {
  const scale = view.scale * extraScale;
  return [
    `rotateY(${view.rotateY}deg)`,
    `rotateZ(${view.rotateZ}deg)`,
    `scale(${scale})`,
    `translateX(${view.translateX}%)`,
    `translateY(${view.translateY}%)`,
  ].join(" ");
}

export function getProductGalleryViews(perfumeId: number): ProductGalleryView[] {
  const perfume = getPerfumeById(perfumeId);
  if (!perfume) return [];
  const baseIndex = (perfumeId - 1) % PRODUCT_GRID_IMAGES.length;
  return PRODUCT_GALLERY_ANGLES.map((angle, index) => ({
    ...angle,
    src: PRODUCT_GRID_IMAGES[(baseIndex + index) % PRODUCT_GRID_IMAGES.length],
  }));
}
