export type BlogCategory =
  | "Fragrance"
  | "Lifestyle"
  | "Guides"
  | "News";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: BlogCategory;
  tags: string[];
  date: string;
  readTime: string;
  featured?: boolean;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Fragrance",
  "Lifestyle",
  "Guides",
  "News",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "finding-your-signature-scent",
    title: "Finding Your Signature Scent in 2026",
    excerpt:
      "Learn how to layer notes, test on skin, and choose a fragrance that feels unmistakably yours.",
    image: "/assets/images/products/elix-01.png",
    category: "Guides",
    tags: ["perfume", "notes", "gifting"],
    date: "Mar 12, 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: "2",
    slug: "art-of-perfume-layering",
    title: "The Art of Perfume Layering",
    excerpt:
      "Combine complementary accords to build depth — from bright citrus openings to warm amber bases.",
    image: "/assets/images/products/elix-02.png",
    category: "Fragrance",
    tags: ["layering", "perfume", "tips"],
    date: "Mar 8, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: "3",
    slug: "morning-rituals-that-last",
    title: "Morning Rituals That Last All Day",
    excerpt:
      "Build a calm, elevated routine with scent, texture, and small luxuries that carry through evening.",
    image: "/assets/images/products/elix-03.png",
    category: "Lifestyle",
    tags: ["lifestyle", "wellness", "routine"],
    date: "Mar 2, 2026",
    readTime: "4 min read",
  },
  {
    id: "4",
    slug: "understanding-fragrance-families",
    title: "Understanding Fragrance Families",
    excerpt:
      "From floral and oriental to woody and fresh — decode the language of perfumery with ease.",
    image: "/assets/images/products/elix-04.png",
    category: "Guides",
    tags: ["notes", "education", "perfume"],
    date: "Feb 26, 2026",
    readTime: "7 min read",
  },
  {
    id: "5",
    slug: "spring-collection-preview",
    title: "Spring Collection Preview: Light & Luminous",
    excerpt:
      "A first look at airy florals and soft musks crafted for longer days and golden evenings.",
    image: "/assets/images/products/elix-05.png",
    category: "News",
    tags: ["new arrivals", "seasonal", "collection"],
    date: "Feb 20, 2026",
    readTime: "3 min read",
    featured: true,
  },
  {
    id: "6",
    slug: "summer-scent-trends",
    title: "Summer Scent Trends",
    excerpt: "Discover the vibrant, fresh notes that are defining this season's olfactory wardrobe.",
    image: "/assets/images/blog_perfume_bottle.png",
    category: "News",
    tags: ["trends", "summer", "fresh"],
    date: "Jan 15, 2026",
    readTime: "4 min read",
  },
  {
    id: "7",
    slug: "science-of-vanilla",
    title: "The Science of Vanilla",
    excerpt: "Why this universally beloved ingredient is much more complex than you think.",
    image: "/assets/images/blog_perfume_ingredients.png",
    category: "Guides",
    tags: ["ingredients", "vanilla", "education"],
    date: "Jan 10, 2026",
    readTime: "8 min read",
  },
  {
    id: "8",
    slug: "sustainability-in-perfumery",
    title: "Sustainability in Modern Perfumery",
    excerpt: "How ethical sourcing and eco-conscious packaging are reshaping the industry.",
    image: "/assets/images/products/elix-06.png",
    category: "News",
    tags: ["sustainability", "industry", "future"],
    date: "Jan 05, 2026",
    readTime: "6 min read",
  },
  {
    id: "9",
    slug: "curating-your-scent-wardrobe",
    title: "Curating Your Scent Wardrobe",
    excerpt: "A guide to building a versatile collection for every occasion and mood.",
    image: "/assets/images/blog_perfume_bottle.png",
    category: "Guides",
    tags: ["collection", "tips", "perfume"],
    date: "Dec 20, 2025",
    readTime: "5 min read",
  },
  {
    id: "10",
    slug: "the-psychology-of-smell",
    title: "The Psychology of Smell",
    excerpt: "Exploring the profound connection between scent, memory, and emotion.",
    image: "/assets/images/blog_perfume_ingredients.png",
    category: "Lifestyle",
    tags: ["psychology", "memory", "wellness"],
    date: "Dec 12, 2025",
    readTime: "7 min read",
  },
  {
    id: "11",
    slug: "holiday-gifting-guide",
    title: "The Ultimate Holiday Gifting Guide",
    excerpt: "Fail-proof fragrance gifts that your loved ones will cherish.",
    image: "/assets/images/products/elix-01.png",
    category: "Guides",
    tags: ["gifting", "holiday", "tips"],
    date: "Nov 28, 2025",
    readTime: "5 min read",
  },
  {
    id: "12",
    slug: "interview-master-perfumer",
    title: "An Interview with a Master Perfumer",
    excerpt: "Insights into the creative process behind our most iconic scents.",
    image: "/assets/images/blog_perfume_bottle.png",
    category: "News",
    tags: ["interview", "behind the scenes", "creator"],
    date: "Nov 15, 2025",
    readTime: "10 min read",
  },
  {
    id: "13",
    slug: "history-of-rose",
    title: "The Rich History of Rose in Perfumery",
    excerpt: "From ancient rituals to modern masterpieces, the evolution of a classic note.",
    image: "/assets/images/blog_perfume_ingredients.png",
    category: "Fragrance",
    tags: ["history", "ingredients", "floral"],
    date: "Oct 30, 2025",
    readTime: "6 min read",
  },
  {
    id: "14",
    slug: "unisex-fragrances",
    title: "The Rise of Unisex Fragrances",
    excerpt: "Breaking down gender boundaries in the modern world of scent.",
    image: "/assets/images/products/elix-02.png",
    category: "Lifestyle",
    tags: ["trends", "unisex", "modern"],
    date: "Oct 18, 2025",
    readTime: "5 min read",
  },
];

export function getCategoryCounts(): Record<BlogCategory | "All", number> {
  const counts = {
    All: BLOG_POSTS.length,
    Fragrance: 0,
    Lifestyle: 0,
    Guides: 0,
    News: 0,
  } satisfies Record<BlogCategory | "All", number>;

  for (const post of BLOG_POSTS) {
    counts[post.category] += 1;
  }

  return counts;
}

export function getPopularTags(limit = 10): string[] {
  const freq = new Map<string, number>();
  for (const post of BLOG_POSTS) {
    for (const tag of post.tags) {
      freq.set(tag, (freq.get(tag) ?? 0) + 1);
    }
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
