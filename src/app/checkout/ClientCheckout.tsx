"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, CreditCard, ChevronRight, X, Wallet, Truck } from "lucide-react";
import styles from "./checkout.module.css";
import { useCart } from "../components/cart/CartProvider";
import {
  PERFUME_CATALOG,
  formatPerfumePrice,
  type PerfumeProduct,
} from "../data/perfumeCatalog";

const FREE_SHIPPING_THRESHOLD = 75;

export default function CheckoutClient() {
  const { lines, loaded, clear } = useCart();
  const [showContent, setShowContent] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  // Form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

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
        .filter((item): item is { product: PerfumeProduct; quantity: number } => Boolean(item)),
    [lines]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0),
    [cartItems]
  );

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string | undefined> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (/@(gail|gmai|gmal|gmial|gamil)\.com$/i.test(email)) {
      newErrors.email = "Did you mean @gmail.com?";
    }

    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State / Province is required";
    if (!zip.trim()) newErrors.zip = "ZIP / Postal Code is required";

    if (paymentMethod === "credit_card") {
      if (!cardName.trim()) newErrors.cardName = "Name on Card is required";
      if (!cardNumber.trim() || cardNumber.replace(/\D/g, '').length !== 16) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }
      if (!expDate.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate)) {
        newErrors.expDate = "Please enter a valid date (MM/YY)";
      }
      if (!cvc.trim() || !/^\d{3,4}$/.test(cvc)) {
        newErrors.cvc = "Please enter a valid 3-4 digit CVC";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    clear();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className={styles.page}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <CheckCircle size={48} />
          </div>
          <h1 className={styles.successTitle}>Order Placed Successfully!</h1>
          <p className={styles.successDesc}>
            Thank you for your purchase. We have received your order and will begin processing it shortly.
          </p>
          <Link href="/shop" className={`poi-btn ${styles.continueBtn}`}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgGrid} />
        <div className={styles.bgShine} />
      </div>

      <div className={styles.content}>
        <motion.header
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={styles.heroTitle}>Secure Checkout</h1>
          <p className={styles.heroDesc}>
            Please fill in your details below to complete your order.
          </p>
        </motion.header>

        {(!loaded || !showContent) ? (
          <div className={styles.loading}>Loading checkout...</div>
        ) : cartItems.length === 0 ? (
          <div className={styles.empty}>
            <h2>Your cart is empty</h2>
            <Link href="/shop" className={`poi-btn mt-4`}>Go to Shop</Link>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* Form Section */}
            <div className={styles.formSection}>
              <form onSubmit={handlePlaceOrder} className={styles.checkoutForm}>
                <h2 className={styles.sectionTitle}>Contact Information</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" required placeholder="you@example.com" value={email} onChange={e => { setEmail(e.target.value); if(errors.email) setErrors({...errors, email: undefined})}} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <h2 className={styles.sectionTitle}>Shipping Address</h2>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" required value={firstName} onChange={e => { setFirstName(e.target.value); if(errors.firstName) setErrors({...errors, firstName: undefined})}} />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" required value={lastName} onChange={e => { setLastName(e.target.value); if(errors.lastName) setErrors({...errors, lastName: undefined})}} />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" required placeholder="123 Fragrance Lane" value={address} onChange={e => { setAddress(e.target.value); if(errors.address) setErrors({...errors, address: undefined})}} />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" required value={city} onChange={e => { setCity(e.target.value); if(errors.city) setErrors({...errors, city: undefined})}} />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="state">State / Province</label>
                    <input type="text" id="state" required value={state} onChange={e => { setState(e.target.value); if(errors.state) setErrors({...errors, state: undefined})}} />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="zip">ZIP / Postal Code</label>
                    <input type="text" id="zip" required value={zip} onChange={e => { setZip(e.target.value); if(errors.zip) setErrors({...errors, zip: undefined})}} />
                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                  </div>
                </div>

                <h2 className={styles.sectionTitle}>Payment Method</h2>
                <div className={styles.paymentBox}>
                  <div className={styles.paymentDisplay}>
                    <div className={styles.paymentDisplayInfo}>
                      {paymentMethod === "credit_card" && (
                        <>
                          <CreditCard size={24} className={styles.paymentIcon} />
                          <div>
                            <p className={styles.paymentName}>Credit Card</p>
                            <p className={styles.paymentSub}>Secure encrypted payment</p>
                          </div>
                        </>
                      )}
                      {paymentMethod === "paypal" && (
                        <>
                          <Wallet size={24} className={styles.paymentIcon} />
                          <div>
                            <p className={styles.paymentName}>PayPal</p>
                            <p className={styles.paymentSub}>Checkout with your PayPal account</p>
                          </div>
                        </>
                      )}
                      {paymentMethod === "cod" && (
                        <>
                          <Truck size={24} className={styles.paymentIcon} />
                          <div>
                            <p className={styles.paymentName}>Cash on Delivery</p>
                            <p className={styles.paymentSub}>Pay when you receive your order</p>
                          </div>
                        </>
                      )}
                    </div>
                    <button 
                      type="button" 
                      className={styles.changePaymentBtn}
                      onClick={() => setIsPaymentModalOpen(true)}
                    >
                      Change
                    </button>
                  </div>

                  {paymentMethod === "credit_card" && (
                    <div className={styles.creditCardForm}>
                      <div className={styles.formGroup}>
                        <label htmlFor="cardName">Name on Card</label>
                        <input type="text" id="cardName" required value={cardName} onChange={e => { setCardName(e.target.value); if(errors.cardName) setErrors({...errors, cardName: undefined})}} />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" required placeholder="0000 0000 0000 0000" value={cardNumber} onChange={e => { setCardNumber(e.target.value); if(errors.cardNumber) setErrors({...errors, cardNumber: undefined})}} />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label htmlFor="expDate">Expiration Date (MM/YY)</label>
                          <input type="text" id="expDate" required placeholder="MM/YY" value={expDate} onChange={e => { setExpDate(e.target.value); if(errors.expDate) setErrors({...errors, expDate: undefined})}} />
                          {errors.expDate && <p className="text-red-500 text-xs mt-1">{errors.expDate}</p>}
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor="cvc">Security Code (CVC)</label>
                          <input type="text" id="cvc" required placeholder="123" value={cvc} onChange={e => { setCvc(e.target.value); if(errors.cvc) setErrors({...errors, cvc: undefined})}} />
                          {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  {paymentMethod === "paypal" && (
                    <div className={styles.paypalMessage}>
                      You will be redirected to PayPal to complete your purchase securely.
                    </div>
                  )}
                  {paymentMethod === "cod" && (
                    <div className={styles.codMessage}>
                      You will pay the courier when the package is delivered to your address.
                    </div>
                  )}
                </div>

                <button type="submit" className={`poi-btn ${styles.placeOrderBtn}`}>
                  <ShieldCheck size={18} /> Place Order - {formatPerfumePrice(total)}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <aside className={styles.summarySection}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              
              <div className={styles.itemList}>
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className={styles.summaryItem}>
                    <div className={styles.itemImage}>
                      <Image src={product.image} alt={product.brand} fill className={styles.imageContent} />
                      <span className={styles.itemQtyBadge}>{quantity}</span>
                    </div>
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{product.brand}</p>
                      <p className={styles.itemDesc}>{product.description}</p>
                    </div>
                    <div className={styles.itemPrice}>
                      {formatPerfumePrice(product.price * quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>{formatPerfumePrice(subtotal)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPerfumePrice(shipping)}</span>
                </div>
                <div className={styles.totalRowFinal}>
                  <span>Total</span>
                  <span className={styles.finalPrice}>{formatPerfumePrice(total)}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Left-Side Payment Modal */}
      {isPaymentModalOpen && (
        <div className={styles.leftModalOverlay} onClick={() => setIsPaymentModalOpen(false)}>
          <motion.div 
            className={styles.leftModalContent}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.leftModalHeader}>
              <h2 className={styles.leftModalTitle}>Payment Method</h2>
              <button className={styles.closeLeftModalBtn} onClick={() => setIsPaymentModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className={styles.leftModalBody}>
              <p className={styles.leftModalSub}>Select how you would like to pay for your order.</p>
              
              <div className={styles.paymentOptionsList}>
                <button 
                  type="button"
                  className={`${styles.paymentOptionItem} ${paymentMethod === 'credit_card' ? styles.paymentOptionActive : ''}`}
                  onClick={() => { setPaymentMethod('credit_card'); setIsPaymentModalOpen(false); }}
                >
                  <div className={styles.paymentOptionIcon}><CreditCard size={20} /></div>
                  <div className={styles.paymentOptionText}>
                    <strong>Credit Card</strong>
                    <span>Visa, MasterCard, Amex</span>
                  </div>
                  {paymentMethod === 'credit_card' && <CheckCircle size={18} className={styles.paymentOptionCheck} />}
                </button>

                <button 
                  type="button"
                  className={`${styles.paymentOptionItem} ${paymentMethod === 'paypal' ? styles.paymentOptionActive : ''}`}
                  onClick={() => { setPaymentMethod('paypal'); setIsPaymentModalOpen(false); }}
                >
                  <div className={styles.paymentOptionIcon}><Wallet size={20} /></div>
                  <div className={styles.paymentOptionText}>
                    <strong>PayPal</strong>
                    <span>Checkout with your account</span>
                  </div>
                  {paymentMethod === 'paypal' && <CheckCircle size={18} className={styles.paymentOptionCheck} />}
                </button>

                <button 
                  type="button"
                  className={`${styles.paymentOptionItem} ${paymentMethod === 'cod' ? styles.paymentOptionActive : ''}`}
                  onClick={() => { setPaymentMethod('cod'); setIsPaymentModalOpen(false); }}
                >
                  <div className={styles.paymentOptionIcon}><Truck size={20} /></div>
                  <div className={styles.paymentOptionText}>
                    <strong>Cash on Delivery</strong>
                    <span>Pay at your doorstep</span>
                  </div>
                  {paymentMethod === 'cod' && <CheckCircle size={18} className={styles.paymentOptionCheck} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
