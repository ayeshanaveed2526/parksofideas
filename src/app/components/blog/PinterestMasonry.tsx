"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./pinterestMasonry.module.css";
import type { BlogPost } from "../../data/blogPosts";

interface PinterestMasonryProps {
  posts: BlogPost[];
}

const GAP = 16;
const UPPER_COUNT = 4;

function getUpperColumnCount(width: number): number {
  if (width < 640) return 2;
  return 4;
}

function getColumnWidth(containerWidth: number, columnCount: number): number {
  if (containerWidth <= 0 || columnCount <= 0) return 280;
  return (containerWidth - GAP * (columnCount - 1)) / columnCount;
}

function getImageHeight(
  post: BlogPost,
  columnWidth: number,
  ratios: Record<string, number>
): number {
  const ratio = ratios[post.id];
  if (ratio) return columnWidth * ratio;
  return columnWidth;
}

function buildUpperColumns(
  posts: BlogPost[],
  columnCount: number,
  columnWidth: number,
  ratios: Record<string, number>
): BlogPost[][] {
  const columns: BlogPost[][] = Array.from({ length: columnCount }, () => []);
  const columnHeights: number[] = Array(columnCount).fill(0);

  for (const post of posts) {
    let shortest = 0;
    for (let i = 1; i < columnCount; i++) {
      if (columnHeights[i] < columnHeights[shortest]) shortest = i;
    }
    columns[shortest].push(post);
    const caption = 88 + Math.ceil(post.excerpt.length / 48) * 18;
    columnHeights[shortest] +=
      getImageHeight(post, columnWidth, ratios) + caption + GAP;
  }

  return columns;
}

interface PinCardProps {
  post: BlogPost;
  imgHeight: number;
  onImageLoad: (id: string, w: number, h: number) => void;
  sizes: string;
  delay?: number;
  variant?: "grid" | "wide";
}

function PinCard({
  post,
  imgHeight,
  onImageLoad,
  sizes,
  delay = 0,
  variant = "grid",
}: PinCardProps) {
  const isWide = variant === "wide";

  return (
    <motion.div
      className={isWide ? styles.widePinWrap : styles.pinWrap}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={isWide ? styles.widePin : styles.pin}
      >
        <div
          className={isWide ? styles.widePinImageWrap : styles.pinImageWrap}
          style={isWide ? undefined : { height: imgHeight }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className={styles.pinImage}
            sizes={sizes}
            onLoad={(e) => {
              const img = e.currentTarget;
              onImageLoad(post.id, img.naturalWidth, img.naturalHeight);
            }}
          />
          <span className={styles.pinShimmer} aria-hidden="true" />
          <span className={styles.pinBadge}>{post.category}</span>
          {!isWide && (
            <div className={styles.pinOverlay}>
              <span className={styles.pinCategory}>{post.category}</span>
              <h3 className={styles.pinTitle}>{post.title}</h3>
              <span className={styles.pinCta}>
                Read More <ArrowRight size={14} />
              </span>
            </div>
          )}
        </div>
        <div className={isWide ? styles.widePinCaption : styles.pinCaption}>
          <div className={styles.pinMeta}>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className={isWide ? styles.widePinTitle : styles.pinCaptionTitle}>
            {post.title}
          </h3>
          <p className={isWide ? styles.widePinExcerpt : styles.pinExcerpt}>
            {post.excerpt}
          </p>
          <div className={styles.pinTags}>
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.pinTag}>
                {tag}
              </span>
            ))}
          </div>
          {isWide && (
            <span className={styles.widePinCta}>
              Read More <ArrowRight size={15} />
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function PinterestMasonry({ posts }: PinterestMasonryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(4);
  const [containerWidth, setContainerWidth] = useState(0);
  const [ratios, setRatios] = useState<Record<string, number>>({});

  const upperPosts = posts.slice(0, UPPER_COUNT);
  const bottomPost = posts[UPPER_COUNT];

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const width = el.offsetWidth;
    setContainerWidth(width);
    setColumnCount(getUpperColumnCount(width));
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    setRatios({});
  }, [posts]);

  const columnWidth = useMemo(
    () => getColumnWidth(containerWidth, columnCount),
    [containerWidth, columnCount]
  );

  const columns = useMemo(
    () => buildUpperColumns(upperPosts, columnCount, columnWidth, ratios),
    [upperPosts, columnCount, columnWidth, ratios]
  );

  const handleImageLoad = (postId: string, naturalWidth: number, naturalHeight: number) => {
    if (!naturalWidth || !naturalHeight) return;
    const ratio = naturalHeight / naturalWidth;
    setRatios((prev) => {
      if (prev[postId] === ratio) return prev;
      return { ...prev, [postId]: ratio };
    });
  };

  return (
    <div ref={containerRef} className={styles.layout}>
      {upperPosts.length > 0 && (
        <div className={styles.upperGrid}>
          {columns.map((column, colIdx) => (
            <div key={colIdx} className={styles.column}>
              {column.map((post, rowIdx) => (
                <PinCard
                  key={post.id}
                  post={post}
                  imgHeight={getImageHeight(post, columnWidth, ratios)}
                  onImageLoad={handleImageLoad}
                  sizes="(max-width: 640px) 46vw, 22vw"
                  delay={colIdx * 0.06 + rowIdx * 0.04}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {bottomPost && (
        <PinCard
          post={bottomPost}
          imgHeight={0}
          onImageLoad={handleImageLoad}
          sizes="100vw"
          delay={0.25}
          variant="wide"
        />
      )}
    </div>
  );
}
