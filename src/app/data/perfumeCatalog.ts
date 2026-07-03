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

/** User-uploaded ELIX product shots — cycled across the catalog grid. */
export const PRODUCT_GRID_IMAGES = [
  "/images/products/elix-01.png",
  "/images/products/elix-02.png",
  "/images/products/elix-03.png",
  "/images/products/elix-04.png",
  "/images/products/elix-05.png",
  "/images/products/elix-06.png",
  "/images/products/elix-07.png",
  "/images/products/elix-08.png",
  "/images/products/elix-09.png",
  "/images/products/elix-10.png",
] as const;

export function getProductImageForId(id: number): string {
  const index = (id - 1) % 4;
  if (index === 0) return "/images/products/top-cat-1.png";
  if (index === 1) return "/images/products/top-cat-2.png";
  if (index === 2) return "/images/products/top-cat-3.png";
  if (index === 3) return "/images/products/top-cat-4.png";
  return PRODUCT_GRID_IMAGES[(id - 1) % PRODUCT_GRID_IMAGES.length];
}

export function getProductHoverImageForId(id: number): string | undefined {
  const index = (id - 1) % 4;
  if (index === 0) return "/images/products/top-cat-1-hover.png";
  if (index === 1) return "/images/products/top-cat-2-hover.png";
  if (index === 2) return "/images/products/top-cat-3-hover.png";
  if (index === 3) return "/images/products/top-cat-4-hover.png";
  return undefined;
}

type PerfumeDefinition = Omit<PerfumeProduct, "image">;

const PERFUME_DEFINITIONS: PerfumeDefinition[] = [
  { id: 1, slug: "lucent", brand: "LUCENT", description: "A luminous aquatic floral with crisp bergamot and soft iris.", notes: "Bergamot, iris, white musk, sea breeze accord.", price: 125 },
  { id: 2, slug: "mystique", brand: "MYSTIQUE", description: "An opulent ruby-red blend of dark rose and golden amber.", notes: "Damask rose, amber resin, saffron, velvet musk.", price: 195 },
  { id: 3, slug: "orlune", brand: "ORLUNE", description: "A smoky noir fragrance with depth and midnight elegance.", notes: "Smoked oud, black tea, patchouli, dark vanilla.", price: 210 },
  { id: 4, slug: "aura-gold", brand: "AURA", description: "Radiant champagne gold with warm floral luminosity.", notes: "Champagne accord, jasmine, golden amber, soft woods.", price: 165 },
  { id: 5, slug: "aura-crystal", brand: "AURA CRYSTAL", description: "Crystalline waves of citrus and luminous white florals.", notes: "Mandarin, neroli, white tea, crystal musk.", price: 155 },
  { id: 6, slug: "solene", brand: "SOLÈNE", description: "Sunlit golden warmth with refined floral sophistication.", notes: "Solar neroli, honeysuckle, sandalwood, vanilla.", price: 148 },
  { id: 7, slug: "lumiere", brand: "LUMIÈRE", description: "A delicate rose-gold bouquet tied with satin ribbon.", notes: "Pink peony, rose petals, pear blossom, musk.", price: 138 },
  { id: 8, slug: "velora", brand: "VELORA", description: "Verdant emerald freshness with botanical grace.", notes: "Green fig, violet leaf, cedar, creamy sandalwood.", price: 142 },
  { id: 9, slug: "noire", brand: "NOIRÉ", description: "Soft lavender dusk wrapped in silver moonlight.", notes: "French lavender, violet, iris, white amber.", price: 132 },
  { id: 10, slug: "serane", brand: "SÉRANE", description: "Faceted amber brilliance with regal golden warmth.", notes: "Amber, benzoin, tonka bean, golden woods.", price: 178 },
  { id: 11, slug: "azure", brand: "AZURE", description: "Cool sky-blue freshness with clean coastal air.", notes: "Marine accord, citrus zest, water lily, musk.", price: 128 },
  { id: 12, slug: "elysia", brand: "ELYSIA", description: "Sculptural gold petals over champagne warmth.", notes: "Champagne, white rose, golden musk, soft leather.", price: 188 },
  { id: 13, slug: "roselle", brand: "ROSELLE", description: "A jeweled crimson rose crowned in gold filigree.", notes: "Turkish rose, raspberry, oud, honeyed amber.", price: 205 },
  { id: 14, slug: "celeste", brand: "CELESTE", description: "Celestial white florals with a starlit gold aura.", notes: "Star jasmine, white orchid, cashmere, vanilla.", price: 158 },
  { id: 15, slug: "opaline", brand: "OPALINE", description: "Sculpted amber opal with warm honeyed radiance.", notes: "Honey, apricot nectar, benzoin, opulent woods.", price: 172 },
  { id: 16, slug: "vespera", brand: "VESPERA", description: "Evening darkness veiled in silver and gold.", notes: "Blackcurrant, night-blooming jasmine, incense, suede.", price: 198 },
  { id: 17, slug: "mirabelle", brand: "MIRABELLE", description: "Romantic blush petals with rose-gold charm.", notes: "Mirabelle plum, peony, blush rose, soft musk.", price: 145 },
  { id: 18, slug: "armonia", brand: "ARMONIA", description: "Harmonious amber facets in jewel-cut perfection.", notes: "Amber, cedarwood, saffron, warm resin.", price: 182 },
  { id: 19, slug: "zephyra", brand: "ZEPHYRA", description: "A gentle lavender breeze with silver grace.", notes: "Lavender, lilac, violet, clean musk.", price: 135 },
  { id: 20, slug: "ambrette", brand: "AMBRETTE", description: "Frosted musk serenity with matte gold poise.", notes: "Ambrette seed, iris butter, white cedar, musk.", price: 162 },
  { id: 21, slug: "verdelle", brand: "VERDELLE", description: "Deep forest green with brushed gold refinement.", notes: "Vetiver, galbanum, moss, dark woods.", price: 168 },
  { id: 22, slug: "aurielle", brand: "AURIELLE", description: "Golden shell curves over sunlit floral nectar.", notes: "Ylang-ylang, tiare flower, coconut milk, amber.", price: 175 },
  { id: 23, slug: "elaria", brand: "ÉLARIA", description: "Amber facets crowned with a crystal jewel cap.", notes: "Amber, orange blossom, labdanum, golden woods.", price: 190 },
  { id: 24, slug: "noctelle", brand: "NOCTELLE", description: "Midnight sapphire depth with velvet allure.", notes: "Blue iris, plum, suede, dark musk.", price: 185 },
  { id: 25, slug: "laventia", brand: "LAVENTIA", description: "Golden fluted elegance with sun-warmed radiance.", notes: "Bergamot, magnolia, golden amber, soft vanilla.", price: 152 },
  { id: 26, slug: "valere", brand: "VALÉRE", description: "Refined golden flutes with timeless luxury.", notes: "Neroli, saffron, ambergris, sandalwood.", price: 160 },
  { id: 27, slug: "seraphine", brand: "SERAPHINE", description: "Pearlescent shield of angelic white-gold florals.", notes: "White lily, angelica, musk, pale woods.", price: 170 },
  { id: 28, slug: "azelia", brand: "AZÉLIA", description: "Faceted gold gemstone over warm amber glow.", notes: "Osmanthus, amber, vanilla orchid, resin.", price: 180 },
  { id: 29, slug: "montrea", brand: "MONTRÉA", description: "Crowned gold regality with amber sophistication.", notes: "Royal oud, rose, leather, spiced amber.", price: 215 },
  { id: 30, slug: "celeva", brand: "CÉLEVA", description: "Elevated golden florals in fluted crystal glass.", notes: "Freesia, golden pear, musk, soft woods.", price: 149 },
  { id: 31, slug: "floren", brand: "FLORÉN", description: "Blooming golden petals with Parisian elegance.", notes: "Rose centifolia, peony, honey, white musk.", price: 156 },
];

export const PERFUME_CATALOG: PerfumeProduct[] = PERFUME_DEFINITIONS.map(
  (perfume) => ({
    ...perfume,
    image: getProductImageForId(perfume.id),
    hoverImage: getProductHoverImageForId(perfume.id),
  })
);

export function getPerfumeById(id: number | string): PerfumeProduct | undefined {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return PERFUME_CATALOG.find((p) => p.id === numericId);
}

/** One gallery slide — same bottle asset, different viewing angle. */
export interface ProductGalleryView {
  src: string;
  label: string;
  rotateY: number;
  rotateZ: number;
  scale: number;
  translateX: number;
  translateY: number;
}

const PRODUCT_GALLERY_ANGLES: Omit<ProductGalleryView, "src">[] = [
  {
    label: "Front view",
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    translateX: 0,
    translateY: 0,
  },
  {
    label: "Left angle",
    rotateY: 0,
    rotateZ: 0,
    scale: 1.08,
    translateX: -6,
    translateY: 0,
  },
  {
    label: "Right angle",
    rotateY: 0,
    rotateZ: 0,
    scale: 1.08,
    translateX: 6,
    translateY: 0,
  },
  {
    label: "Detail view",
    rotateY: 0,
    rotateZ: 0,
    scale: 1.18,
    translateX: 0,
    translateY: -4,
  },
];

export function galleryViewTransform(
  view: Pick<
    ProductGalleryView,
    "rotateY" | "rotateZ" | "scale" | "translateX" | "translateY"
  >,
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

/** Gallery slides — primary image plus rotated picks from the grid set. */
export function getProductGalleryViews(perfumeId: number): ProductGalleryView[] {
  const perfume = getPerfumeById(perfumeId);
  if (!perfume) return [];

  const baseIndex = (perfumeId - 1) % PRODUCT_GRID_IMAGES.length;

  return PRODUCT_GALLERY_ANGLES.map((angle, index) => ({
    ...angle,
    src: PRODUCT_GRID_IMAGES[(baseIndex + index) % PRODUCT_GRID_IMAGES.length],
  }));
}

export function formatPerfumePrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export interface CatalogCardProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  hoverImage?: string;
  badges: { text: string; color: string }[];
  outOfStock?: boolean;
  isExternal?: boolean;
}

export function toCatalogCard(perfume: PerfumeProduct): CatalogCardProduct {
  const badges: { text: string; color: string }[] = [];
  let currentPrice = perfume.price;
  let originalPrice: string | undefined = undefined;

  if (perfume.id <= 6) {
    badges.push({ text: "NEW", color: "#00089d" });
  }
  if (perfume.id % 4 === 0) {
    badges.push({ text: "FEATURED", color: "#c8a96e" });
  }
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
