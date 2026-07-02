"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  Minus,
  Plus,
  X,
} from "lucide-react";
import styles from "./cart.module.css";
import { useCart } from "./CartProvider";
import { useLoginModal } from "../auth/LoginModalProvider";
import {
  PERFUME_CATALOG,
  formatPerfumePrice,
  type PerfumeProduct,
} from "../../data/perfumeCatalog";

const FREE_SHIPPING_THRESHOLD = 75;

const trustItems = [
  { icon: ShieldCheck, label: "Secure Payment", sub: "SSL Protected" },
  { icon: Truck, label: "Free Shipping", sub: "Orders $75+" },
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

function CartLineItem({
  product,
  quantity,
  index,
  onRemove,
  onQuantityChange,
}: {
  product: PerfumeProduct;
  quantity: number;
  index: number;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, qty: number) => void;
}) {
  const lineTotal = product.price * quantity;

  return (
    <motion.article
      className={styles.lineItem}
      variants={fadeUp}
      custom={index}
      layout
    >
      <Link href={`/product/${product.id}`} className={styles.lineImageLink}>
        <Image
          src={product.image}
          alt={product.brand}
          fill
          className={styles.lineImage}
          sizes="(max-width: 639px) 80px, (max-width: 767px) 96px, 120px"
        />
      </Link>

      <div className={styles.lineInfo}>
        <Link href={`/product/${product.id}`} className={styles.lineName}>
          {product.brand}
        </Link>
        <p className={styles.lineDesc}>{product.description}</p>
        <p className={styles.lineUnitPrice}>
          {formatPerfumePrice(product.price)} each
        </p>
      </div>

      <div className={styles.lineActions}>
        <div className={styles.lineActionsMain}>
          <div className={styles.qtyControl}>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => onQuantityChange(product.id, quantity - 1)}
              aria-label={`Decrease quantity of ${product.brand}`}
            >
              <Minus size={14} />
            </button>
            <span className={styles.qtyValue}>{quantity}</span>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => onQuantityChange(product.id, quantity + 1)}
              aria-label={`Increase quantity of ${product.brand}`}
            >
              <Plus size={14} />
            </button>
          </div>
          <p className={styles.lineTotal}>{formatPerfumePrice(lineTotal)}</p>
        </div>
        <button
          type="button"
          className={styles.removeBtn}
          onClick={() => onRemove(product.id)}
        >
          <X size={14} />
          Remove
        </button>
      </div>
    </motion.article>
  );
}

export default function CartPageContent() {
  const { lines, loaded, remove, setQuantity, clear } = useCart();
  const { openLoginModal } = useLoginModal();
  const [showContent, setShowContent] = useState(false);
  const [showCheckoutOptions, setShowCheckoutOptions] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const timer = window.setTimeout(() => setShowContent(true), 0);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  const cartItems = useMemo(
    () =>
      lines
        .map((line) => {
          const product = PERFUME_CATALOG.find((p) => p.id === line.productId);
          if (!product) return null;
          return { product, quantity: line.quantity };
        })
        .filter(
          (item): item is { product: PerfumeProduct; quantity: number } =>
            Boolean(item)
        ),
    [lines]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, { product, quantity }) => sum + product.price * quantity,
        0
      ),
    [cartItems]
  );

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;
  const itemCount = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);
  const isLoading = !loaded || !showContent;
  const isEmpty = cartItems.length === 0;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

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
            Shopping Cart
          </motion.h1>
          <motion.p className={styles.heroDesc} variants={fadeUp} custom={2}>
            Review your ELIX fragrances before checkout — free shipping on orders
            over ${FREE_SHIPPING_THRESHOLD}.
          </motion.p>
        </motion.header>

        <section className={styles.main}>
          {isLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} aria-hidden="true" />
              <p className={styles.loadingText}>Loading your cart…</p>
            </div>
          ) : isEmpty ? (
            <motion.div
              className={styles.empty}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
            >
              <div className={styles.emptyIcon}>
                <ShoppingBag size={36} strokeWidth={1.5} />
              </div>
              <h2 className={styles.emptyTitle}>Your cart is empty</h2>
              <p className={styles.emptyText}>
                Add some amazing products to get started!
              </p>
              <Link href="/shop" className={`poi-btn ${styles.shopBtn}`}>
                Continue Shopping <ArrowRight size={16} />
              </Link>
            </motion.div>
          ) : (
            <div className={styles.layout}>
              <div className={styles.itemsPanel}>
                <div className={styles.toolbar}>
                  <p className={styles.toolbarCount}>
                    <strong>{itemCount}</strong>{" "}
                    {itemCount === 1 ? "item" : "items"} in your cart
                  </p>
                  <button type="button" className={styles.clearBtn} onClick={clear}>
                    Clear cart
                  </button>
                </div>

                <motion.div
                  className={styles.itemsList}
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                >
                  {cartItems.map(({ product, quantity }, idx) => (
                    <CartLineItem
                      key={product.id}
                      product={product}
                      quantity={quantity}
                      index={idx}
                      onRemove={remove}
                      onQuantityChange={setQuantity}
                    />
                  ))}
                </motion.div>
              </div>

              <aside className={styles.summary}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>

                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <strong>{formatPerfumePrice(subtotal)}</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <strong>
                    {shipping === 0 ? (
                      <span className={styles.freeShipping}>Free</span>
                    ) : (
                      formatPerfumePrice(shipping)
                    )}
                  </strong>
                </div>

                {amountToFreeShipping > 0 && (
                  <p className={styles.shippingNote}>
                    Add {formatPerfumePrice(amountToFreeShipping)} more for free
                    shipping on orders over ${FREE_SHIPPING_THRESHOLD}.
                  </p>
                )}

                <div className={styles.summaryRowTotal}>
                  <span>Total</span>
                  <span className={styles.summaryTotal}>
                    {formatPerfumePrice(total)}
                  </span>
                </div>

                <button 
                  type="button" 
                  className={`poi-btn ${styles.checkoutBtn}`}
                  onClick={() => setShowCheckoutOptions(true)}
                >
                  Proceed to Checkout
                </button>
                <Link href="/shop" className={styles.continueLink}>
                  Continue Shopping
                </Link>
              </aside>
            </div>
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
                Stay ahead of trends with our weekly drops
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
                <div className={styles.trustCopy}>
                  <h4 className={styles.trustLabel}>{label}</h4>
                  <p className={styles.trustSub}>{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {showCheckoutOptions && (
        <div className={styles.modalOverlay} onClick={() => setShowCheckoutOptions(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={() => setShowCheckoutOptions(false)}>
              <X size={20} />
            </button>
            <h2 className={styles.modalTitle}>Checkout Options</h2>
            <p className={styles.modalSub}>How would you like to proceed with your order?</p>
            <div className={styles.modalActions}>
              <button 
                className={`poi-btn ${styles.modalBtnLogin}`} 
                onClick={() => {
                  setShowCheckoutOptions(false);
                  openLoginModal();
                }}
              >
                Login to Checkout
              </button>
              <Link 
                href="/checkout" 
                className={`poi-btn ${styles.modalBtnGuest}`}
                onClick={() => setShowCheckoutOptions(false)}
              >
                Checkout as Guest
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
