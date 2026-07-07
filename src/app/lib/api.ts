// src/app/lib/api.ts
// Shared API fetch functions — swap NEXT_PUBLIC_API_URL in .env.local to point at your real backend

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface ApiProduct {
  _id: string;
  id: number;
  name: string;
  category: string;
  brand: string;
  sku: string;
  description: string;
  short_description: string;
  image: string;
  images: string[];
  new_price: number;
  old_price: number;
  discount_type: string;
  discount_value: number;
  sale_start_date: string | null;
  sale_end_date: string | null;
  features: string[];
  specifications: unknown[];
  materials: string;
  care_instructions: string;
  size_chart: string;
  colors: string[];
  sizes: string[];
  weight: number;
  dimensions: { length: number; width: number; height: number };
}

export async function fetchAllProducts(): Promise<ApiProduct[]> {
  try {
    const res = await fetch(`${BASE_URL}/allproducts?limit=100`, {
      // Next.js: revalidate every 60s so server renders stay fresh
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data.products as ApiProduct[];
  } catch {
    // Fallback: load from the local mock JSON so the UI never breaks
    const fallback = await fetch('/assets/mock-allproducts.json');
    const data = await fallback.json();
    return data.products as ApiProduct[];
  }
}

export interface ApiBlog {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  image: string;
  author: { name: string; profileImage: string; bio: string };
  category: string;
  tags: string[];
  featured: boolean;
  status: string;
  available: boolean;
  publishedAt: string;
  readTime: number;
}

export async function fetchAllBlogs(): Promise<ApiBlog[]> {
  try {
    const res = await fetch(`${BASE_URL}/all-blogs`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data.blogs as ApiBlog[];
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
    return [];
  }
}

export async function fetchBlogBySlug(slug: string): Promise<ApiBlog | null> {
  try {
    const res = await fetch(`${BASE_URL}/blog/slug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data.blog as ApiBlog;
  } catch (err) {
    console.error(`Failed to fetch blog with slug ${slug}:`, err);
    return null;
  }
}

