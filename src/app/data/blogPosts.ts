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
    image: "/perfumes/elysia.png",
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
    image: "/perfumes/mystique.png",
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
    image: "/perfumes/lucent.png",
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
    image: "/perfumes/opaline.png",
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
    image: "/perfumes/celeste.png",
    category: "News",
    tags: ["new arrivals", "seasonal", "collection"],
    date: "Feb 20, 2026",
    readTime: "3 min read",
    featured: true,
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
