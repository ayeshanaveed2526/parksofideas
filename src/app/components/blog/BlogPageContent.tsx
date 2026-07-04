"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  ShieldCheck,
  Truck,
  RefreshCw,
  Heart,
  ArrowRight,
} from "lucide-react";
import styles from "./blog.module.css";
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  getCategoryCounts,
  getPopularTags,
  type BlogCategory,
} from "../../data/blogPosts";

type FilterCategory = BlogCategory | "All";

const trustItems = [
  { icon: ShieldCheck, label: "Secure Payment", sub: "SSL Protected" },
  { icon: Truck, label: "Free Shipping", sub: "Orders Rs.2000+" },
  { icon: RefreshCw, label: "Easy Returns", sub: "7 Days" },
  { icon: Heart, label: "Loved by 50K+", sub: "Happy Customers" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function BlogPageContent() {
  const [category, setCategory] = useState<FilterCategory>("All");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  const categoryCounts = useMemo(() => getCategoryCounts(), []);
  const popularTags = useMemo(() => getPopularTags(), []);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [category, activeTag, search]);

  const resetFilters = () => {
    setCategory("All");
    setActiveTag(null);
    setSearch("");
    setVisibleCount(9);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgGrid} />
        <div className={`${styles.orb} ${styles.orbBlue}`} />
        <div className={`${styles.orb} ${styles.orbGold}`} />
      </div>

      <div className={styles.content}>
        <motion.header
          className={styles.hero}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className={styles.heroTitle}>O U R &nbsp; B L O G</h1>
          <p className={styles.heroDesc}>
            Fragrance stories, guides &amp; inspiration
          </p>
        </motion.header>

        <div className={styles.blogGrid}>
          <aside className={styles.sidebar}>
            <div className={styles.searchWrap}>
              <Search className={styles.searchIcon} size={16} aria-hidden="true" />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search blog posts"
              />
            </div>

            <motion.div
              className={styles.panel}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h2 className={styles.panelTitle}>Categories</h2>
              <ul className={styles.categoryList}>
                {(["All", ...BLOG_CATEGORIES] as FilterCategory[]).map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      className={`${styles.categoryBtn}${
                        category === cat ? ` ${styles.categoryBtnActive}` : ""
                      }`}
                      onClick={() => setCategory(cat)}
                    >
                      <span>{cat}</span>
                      <span className={styles.categoryCount}>
                        {categoryCounts[cat]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className={styles.panel}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h2 className={styles.panelTitle}>Popular Tags</h2>
              <div className={styles.tagCloud}>
                <button
                  type="button"
                  className={`${styles.tagBtn}${
                    activeTag === null ? ` ${styles.tagBtnActive}` : ""
                  }`}
                  onClick={() => setActiveTag(null)}
                >
                  All Tags
                </button>
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`${styles.tagBtn}${
                      activeTag === tag ? ` ${styles.tagBtnActive}` : ""
                    }`}
                    onClick={() =>
                      setActiveTag((current) => (current === tag ? null : tag))
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={styles.panel}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <h2 className={styles.panelTitle}>Stay Updated</h2>
              <p className={styles.newsletterText}>
                Get the latest blog posts delivered to your inbox
              </p>
              {subscribed ? (
                <p className={styles.newsletterText} style={{ color: "#00089d", fontWeight: 600 }}>
                  Thank you for subscribing!
                </p>
              ) : (
                <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className={styles.newsletterInput}
                    aria-label="Email for newsletter"
                  />
                  <button type="submit" className={`poi-btn ${styles.newsletterBtn}`}>
                    Subscribe
                  </button>
                </form>
              )}
            </motion.div>
          </aside>

          <div className={styles.masonryColumn}>
            <motion.div
              className={styles.mainHeader}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div>
                <h2 className={styles.mainTitle}>All Posts</h2>
                <p className={styles.mainCount}>
                  Showing <strong>{filteredPosts.length}</strong> of{" "}
                  <strong>{BLOG_POSTS.length}</strong> Posts
                </p>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {filteredPosts.length === 0 ? (
                <motion.div
                  key="empty"
                  className={styles.empty}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className={styles.emptyTitle}>No posts found</h3>
                  <p className={styles.emptyText}>
                    Try adjusting your search or browse a different category
                  </p>
                  <button
                    type="button"
                    className={`poi-btn ${styles.resetBtn}`}
                    onClick={resetFilters}
                  >
                    View All Posts
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`${category}-${activeTag}-${search}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.grid}>
                    {filteredPosts.slice(0, visibleCount).map((post, index) => {
                      // Every 4th item (index 0, 4, 8, etc.) is horizontal, taking up full width.
                      const isHorizontal = index % 4 === 0;
                      return (
                        <Link 
                          key={post.id} 
                          href={`/blog/${post.slug}`} 
                          className={`${styles.card} ${isHorizontal ? styles.cardHorizontal : styles.cardVertical}`}
                        >
                          <div className={styles.cardImageWrap}>
                            <img src={post.image} alt={post.title} className={styles.cardImage} />
                            <span className={styles.cardShimmer} aria-hidden="true" />
                            <span className={styles.cardBadge}>{post.category}</span>
                          </div>
                          <div className={styles.cardBody}>
                            <div className={styles.cardMeta}>
                              <span>{post.date}</span>
                              <span>{post.readTime}</span>
                            </div>
                            <h3 className={styles.cardTitle}>{post.title}</h3>
                            <p className={styles.cardExcerpt}>{post.excerpt}</p>
                            <div className={styles.cardTags}>
                              {post.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className={styles.cardTag}>{tag}</span>
                              ))}
                            </div>
                            <span className={styles.cardReadMore}>Read More <ArrowRight size={14} /></span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  {visibleCount < filteredPosts.length && (
                    <div className="flex justify-center mt-12">
                      <button 
                        className="poi-btn px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest bg-[#0A0FAF] text-white hover:bg-[#00089d] transition-colors"
                        onClick={() => setVisibleCount(v => v + 9)}
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.section
          className={styles.cta}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.ctaInner}>
            <span className={styles.ctaGlow} aria-hidden="true" />
            <div>
              <h2 className={styles.ctaTitle}>New Arrivals Every Week</h2>
              <p className={styles.ctaSub}>
                Stay ahead of trends with our weekly fragrance drops
              </p>
            </div>
            <Link href="/shop" className={`poi-btn ${styles.ctaLink}`}>
              Shop New <ArrowRight size={16} />
            </Link>
          </div>
        </motion.section>

        <motion.section
          className={styles.trust}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <div className={styles.trustGrid}>
            {trustItems.map(({ icon: Icon, label, sub }, idx) => (
              <motion.div
                key={label}
                className={styles.trustItem}
                variants={fadeUp}
                custom={idx}
              >
                <div className={styles.trustIcon}>
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h4 className={styles.trustLabel}>{label}</h4>
                <p className={styles.trustSub}>{sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
