"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  ShieldCheck,
  Truck,
  RefreshCw,
  Heart,
  ArrowRight,
} from "lucide-react";
import styles from "./contact.module.css";

const INQUIRY_TYPES = [
  "General Inquiry",
  "Customer Support",
  "Business Partnership",
  "Feedback & Reviews",
] as const;

type InquiryType = (typeof INQUIRY_TYPES)[number];

const INFO_CARDS = [
  {
    icon: Mail,
    title: "Email Us",
    main: "info@elixbyir.com",
    sub: "Primary support email",
  },
  {
    icon: Phone,
    title: "Call Us",
    main: "+123 488 9652",
    sub: "Mon - Fri: 10:00 AM - 6:00 PM",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    main: "25 West 21th Street, Miami FL, USA",
    sub: "Store location",
  },
  {
    icon: Clock,
    title: "Business Hours",
    main: "Mon - Fri: 10:00 AM - 6:00 PM",
    sub: "Sat: 10:00 AM - 4:00 PM | Sun: Closed",
  },
];

const FAQ_ITEMS = [
  {
    q: "What are your shipping times?",
    a: "We typically ship within 1-2 business days. Delivery takes 3-7 business days depending on your location.",
  },
  {
    q: "Do you offer international shipping?",
    a: "Yes — we ship worldwide. International delivery usually takes 7-14 business days depending on the destination.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 7-day return policy for unused items in original packaging. Return shipping is free for defective items.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order ships, you'll receive a tracking number via email. You can also check status in your account.",
  },
];

const trustItems = [
  { icon: ShieldCheck, label: "Secure Payment", sub: "SSL Protected" },
  { icon: Truck, label: "Free Shipping", sub: "Orders Rs.2000+" },
  { icon: RefreshCw, label: "Easy Returns", sub: "7 Days" },
  { icon: Heart, label: "Loved by 50K+", sub: "Happy Customers" },
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

const SPARKLES = [
  { top: "12%", left: "8%", delay: 0 },
  { top: "22%", left: "88%", delay: 1.2 },
  { top: "55%", left: "4%", delay: 2.1 },
  { top: "70%", left: "92%", delay: 0.8 },
  { top: "38%", left: "50%", delay: 1.6 },
];

export default function ContactPageContent() {
  const [inquiry, setInquiry] = useState<InquiryType>("General Inquiry");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; subject?: string; message?: string } = {};

    if (!name.trim()) newErrors.name = "Full Name is required";
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (/@(gail|gmai|gmal|gmial|gamil)\.com$/i.test(email)) {
      newErrors.email = "Did you mean @gmail.com?";
    }
    
    if (!subject.trim()) newErrors.subject = "Subject is required";
    
    if (!message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }
    
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgGrid} />
        <div className={styles.bgShine} />
        <div className={`${styles.orb} ${styles.orbBlue}`} />
        <div className={`${styles.orb} ${styles.orbGold}`} />
        <div className={`${styles.orb} ${styles.orbBlue2}`} />
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className={styles.sparkle}
            style={{
              top: s.top,
              left: s.left,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
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
            Contact Us
          </motion.h1>
          <motion.p className={styles.heroDesc} variants={fadeUp} custom={2}>
            Questions about your order, returns, products, or partnerships?
            Our team is here to help.
          </motion.p>
        </motion.header>

        <motion.section
          className={styles.infoGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {INFO_CARDS.map(({ icon: Icon, title, main, sub }, idx) => (
            <motion.div
              key={title}
              className={styles.infoCard}
              variants={fadeUp}
              custom={idx}
            >
              <div className={styles.infoIcon}>
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className={styles.infoTitle}>{title}</h3>
              <p className={styles.infoMain}>{main}</p>
              <p className={styles.infoSub}>{sub}</p>
            </motion.div>
          ))}
        </motion.section>

        <div className={styles.mainLayout}>
          <motion.section
            className={styles.formPanel}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.formHeading}>Send us a Message</h2>
            <p className={styles.formSub}>
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit}>
              <span className={styles.inquiryLabel}>What can we help you with?</span>
              <div className={styles.inquiryGrid}>
                {INQUIRY_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`${styles.inquiryBtn}${
                      inquiry === type ? ` ${styles.inquiryBtnActive}` : ""
                    }`}
                    onClick={() => setInquiry(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label className={`${styles.label} ${styles.labelRequired}`} htmlFor="contact-name">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    className={styles.input}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className={styles.field}>
                  <label className={`${styles.label} ${styles.labelRequired}`} htmlFor="contact-email">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    className={styles.input}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={`${styles.label} ${styles.labelRequired}`} htmlFor="contact-subject">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    className={styles.input}
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={`${styles.label} ${styles.labelRequired}`} htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className={styles.textarea}
                    required
                    maxLength={1000}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Tell us more about your inquiry…"
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.message ? (
                      <p className="text-red-500 text-xs">{errors.message}</p>
                    ) : (
                      <span />
                    )}
                    <p className={styles.charCount}>{message.length}/1000 characters</p>
                  </div>
                </div>
              </div>

              <button type="submit" className={`poi-btn ${styles.submitBtn}`}>
                Send Message
              </button>

              {submitted && (
                <p className={styles.successMsg}>
                  Thank you! We&apos;ve received your message and will reply within 24 hours.
                </p>
              )}
            </form>
          </motion.section>

          <aside className={styles.sidebar}>
            <motion.div
              className={styles.sidePanel}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className={styles.sideTitle}>Follow Us</h3>
              <p className={styles.sideText}>
                Stay connected for the latest fragrance drops and behind-the-scenes content.
              </p>
              <div className={styles.socialRow}>
                <a href="#" className={styles.socialLink} data-network="facebook" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} data-network="instagram" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} data-network="youtube" aria-label="YouTube">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              className={styles.sidePanel}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className={styles.sideTitle}>Quick Answers</h3>
              <div className={styles.faqList}>
                {FAQ_ITEMS.map((item, idx) => (
                  <div key={item.q} className={styles.faqItem}>
                    <button
                      type="button"
                      className={styles.faqQuestion}
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      aria-expanded={openFaq === idx}
                    >
                      {item.q}
                      <ChevronDown
                        size={16}
                        style={{
                          flexShrink: 0,
                          transform: openFaq === idx ? "rotate(180deg)" : "rotate(0)",
                          transition: "transform 0.25s ease",
                        }}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.p
                          className={styles.faqAnswer}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {item.a}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={styles.sidePanel}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className={styles.sideTitle}>Business Hours</h3>
              <ul className={styles.hoursList}>
                <li>
                  <strong>Monday - Friday</strong>
                  <span>10:00 AM - 6:00 PM</span>
                </li>
                <li>
                  <strong>Saturday</strong>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li>
                  <strong>Sunday</strong>
                  <span>Closed</span>
                </li>
              </ul>
              <p className={styles.hoursNote}>
                <strong>Response Time:</strong> We typically respond to emails within 24 hours during business days.
              </p>
            </motion.div>
          </aside>
        </div>

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
