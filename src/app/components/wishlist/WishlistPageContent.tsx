"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  X,
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import styles from "./wishlist.module.css";
import { useWishlist } from "./WishlistProvider";
import { useCart } from "../cart/CartProvider";
import {
  PERFUME_CATALOG,
  formatPerfumePrice,
  type PerfumeProduct,
} from "../../data/perfumeCatalog";

const trustItems = [
  { icon: ShieldCheck, label: "Secure Payment", sub: "SSL Protected" },
  { icon: Truck, label: "Free Shipping", sub: "Orders Rs.2000+" },
  { icon: RefreshCw, label: "Easy Returns", sub: "7 Days" },
  { icon: ShoppingBag, label: "Loved by 50K+", sub: "Happy Customers" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function WishlistCard({
  product,
  index,
  onRemove,
  onAddToCart,
}: {
  product: PerfumeProduct;
  index: number;
  onRemove: (id: number) => void;
  onAddToCart: (id: number) => void;
}) {
  return (
    <motion.article
      className={styles.card}
      variants={fadeUp}
      custom={index}
      layout
    >
      <button
        type="button"
        className={styles.removeBtn}
        onClick={() => onRemove(product.id)}
        aria-label={`Remove ${product.brand} from wishlist`}
      >
        <X size={16} />
      </button>

      <Link href={`/product/${product.id}`} className={styles.cardImageLink}>
        <Image
          src={product.image}
          alt={product.brand}
          fill
          className={styles.cardImage}
          sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 320px"
        />
      </Link>

      <div className={styles.cardBody}>
        <Link href={`/product/${product.id}`} className={styles.cardName}>
          {product.brand}
        </Link>
        <p className={styles.cardDesc}>{product.description}</p>
        <p className={styles.cardPrice}>{formatPerfumePrice(product.price)}</p>
        <div className={styles.cardActions}>
          <button
            type="button"
            className={`poi-btn ${styles.atcBtn}`}
            onClick={() => onAddToCart(product.id)}
          >
            Add to Cart
          </button>
          <Link href={`/product/${product.id}`} className={styles.viewLink}>
            View
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function WishlistPageContent() {
  const router = useRouter();
  const { ids, loaded, remove, clear } = useWishlist();
  const { add: addToCart } = useCart();
  const [showContent, setShowContent] = useState(false);

  const handleAddToCart = (id: number) => {
    addToCart(id, 1);
    router.push("/cart");
  };

  useEffect(() => {
    if (!loaded) return;
    const timer = window.setTimeout(() => setShowContent(true), 450);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  const products = useMemo(
    () =>
      ids
        .map((id) => PERFUME_CATALOG.find((p) => p.id === id))
        .filter((p): p is PerfumeProduct => Boolean(p)),
    [ids]
  );

  const isLoading = !loaded || !showContent;
  const isEmpty = products.length === 0;

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgGrid} />
        <div className={styles.bgShine} />
        <div className={`${styles.orb} ${styles.orbBlue}`} />
        <div className={`${styles.orb} ${styles.orbGold}`} />
      </div>

      <div className={styles.content}>
        <motion.header
          className={styles.hero}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div className={styles.heroAccent} variants={fadeUp} custom={0}>
            <span className={styles.heroLine} />
            <span className={styles.heroDiamond} />
            <span className={styles.heroLine} />
          </motion.div>
          <motion.h1 className={styles.heroTitle} variants={fadeUp} custom={1}>
            My Wishlist
          </motion.h1>
          <motion.p className={styles.heroDesc} variants={fadeUp} custom={2}>
            Save your favorite ELIX fragrances and return anytime to shop the
            scents you love most.
          </motion.p>
        </motion.header>

        <section className={styles.main}>
          {isLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} aria-hidden="true" />
              <p className={styles.loadingText}>Loading your wishlist…</p>
            </div>
          ) : isEmpty ? (
            <motion.div
              className={styles.empty}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
            >
              <div className={styles.emptyIcon}>
                <Heart size={36} strokeWidth={1.5} />
              </div>
              <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
              <p className={styles.emptyText}>
                Browse our collection and tap the heart icon on any fragrance to
                save it here for later.
              </p>
              <Link href="/shop" className={`poi-btn ${styles.shopBtn}`}>
                Start Shopping <ArrowRight size={16} />
              </Link>
            </motion.div>
          ) : (
            <>
              <div className={styles.toolbar}>
                <p className={styles.toolbarCount}>
                  <strong>{products.length}</strong>{" "}
                  {products.length === 1 ? "item" : "items"} saved
                </p>
                <button type="button" className={styles.clearBtn} onClick={clear}>
                  Clear wishlist
                </button>
              </div>

              <motion.div
                className={styles.grid}
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              >
                {products.map((product, idx) => (
                  <WishlistCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onRemove={remove}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </motion.div>
            </>
          )}
        </section>

        <motion.section
          className={styles.cta}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <div className={styles.ctaInner}>
            <span className={styles.ctaGlow} aria-hidden="true" />
            <div>
              <h2 className={styles.ctaTitle}>New Arrivals Every Week</h2>
              <p className={styles.ctaSub}>
                Stay ahead with our weekly fragrance drops
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
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
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
