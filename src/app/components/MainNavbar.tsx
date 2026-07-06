"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { User, Heart, ShoppingBag, Menu, X, ChevronDown, LogOut } from "lucide-react";
import { PERFUME_CATALOG, formatPerfumePrice } from "../data/perfumeCatalog";
import { motion } from "framer-motion";
import { useLoginModal } from "./auth/LoginModalProvider";
import { useCart } from "./cart/CartProvider";
import ProfileAvatar from "./auth/ProfileAvatar";

/**
 * MainNavbar — the second bar.
 * Spec: 1521px x 90px, white background.
 */
export default function MainNavbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openLoginModal, isLoggedIn, user, logout } = useLoginModal();
  const { itemCount: cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 46);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/shop" },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/contact" },
  ];

  const homeVariants = PERFUME_CATALOG.slice(0, 8).map((perfume) => ({
    name: perfume.brand,
    image: perfume.image,
  }));

  const megaMenuPerfumes = PERFUME_CATALOG.filter((p) => [2, 16, 23].includes(p.id));

  return (
    <>
      <div className={`w-full bg-white transition-all duration-300 ${isSticky ? "shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-b border-gray-100" : ""}`}>
        <div className="relative mx-auto flex h-[70px] md:h-[90px] w-full items-center justify-between px-[15px] md:px-[50px]">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <Link href="/" aria-label="Luchiana Home" className="shrink-0 flex items-center gap-2 hover-scale-sm transition-transform duration-300">
              <img src="/logo.png" alt="ELIX BY IR Logo" className="h-[40px] md:h-[50px] object-contain" />
              <span className="text-[20px] md:text-[24px] font-bold tracking-widest uppercase text-black" style={{ fontFamily: "Inter, sans-serif" }}>ELIX BY IR</span>
            </Link>
          </motion.div>

          {/* Nav links — desktop */}
          <motion.ul 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }}
            className="hidden md:flex items-center h-full text-[#1a1a1a] mr-[30px]"
          >
            {navLinks.map((link) => (
              <motion.li
                key={link.label}
                className={`group flex items-center h-full ${["HOME", "SHOP", "MEGA"].includes(link.label) ? "" : "relative"}`}
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: 1.14,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  margin: "0 20px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <Link 
                  href={link.href} 
                  className={`hover-link-slide transition-colors ${
                    link.href !== "#" && (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                      ? "text-[#00089d] active-link-slide"
                      : "hover:text-[#00089d]"
                  }`}
                >
                  {link.label}
                </Link>

                {/* Mega Menu for HOME */}
                {link.label === "HOME" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-1/2 -translate-x-1/2 w-screen max-w-[1160px] h-[229px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center justify-center opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-400 ease-out z-200 border-t border-gray-100 cursor-default overflow-x-auto"
                  >
                    <div className="flex items-center justify-center gap-[15px] xl:gap-[30px] w-max xl:w-full h-full px-4 xl:px-10 min-w-min mx-auto">
                      {homeVariants.map((v) => (
                        <Link href="/" key={v.name} className="flex flex-col items-center gap-[15px] group/item hover-lift-sm">
                          <div className="w-[89px] h-[98px] relative border border-transparent hover:border-black transition-all duration-300 bg-gray-50 overflow-hidden hover-image-zoom hover-ring-pulse">
                            <Image src={v.image} alt={v.name} fill sizes="89px" style={{ objectFit: "cover" }} />
                          </div>
                          <span
                            className="text-[12px] text-[#1a1a1a] hover:text-[#00089d] transition-colors"
                            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, letterSpacing: "0.15em" }}
                          >
                            {v.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dropdown for HEADERS */}
                {link.label === "HEADERS" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-0 w-[290px] h-[165px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-400 ease-out z-200 border-t border-gray-100 cursor-default px-[40px] py-[35px] text-left"
                  >
                    <ul className="flex flex-col gap-[22px]">
                      <li className="relative flex items-center justify-between group/subitem">
                        <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] group-hover/subitem:text-[#00089d] transition-colors tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif", width: "100%" }}>DESKTOP</Link>
                        <svg className="w-3.5 h-3.5 text-[#1a1a1a] opacity-70 group-hover/subitem:text-[#00089d] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>

                        {/* Submenu for DESKTOP */}
                        <div className="absolute top-[-35px] left-full pl-[40px] opacity-0 invisible translate-x-[-10px] group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 group-hover/subitem:visible transition-all duration-400 ease-out z-201">
                          <div className="w-[290px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] px-[40px] py-[35px] text-left">
                            <ul className="flex flex-col gap-[22px]">
                              {["TYPE 1", "TYPE 2", "TYPE 3", "TYPE 4", "TYPE 5"].map((type) => (
                                <li key={type}>
                                  <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#00089d] transition-colors tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{type}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li className="relative flex items-center justify-between group/subitem">
                        <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] group-hover/subitem:text-[#00089d] transition-colors tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif", width: "100%" }}>MOBILE</Link>
                        <svg className="w-3.5 h-3.5 text-[#1a1a1a] opacity-70 group-hover/subitem:text-[#00089d] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>

                        {/* Submenu for MOBILE */}
                        <div className="absolute top-[-35px] left-full pl-[40px] opacity-0 invisible translate-x-[-10px] group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 group-hover/subitem:visible transition-all duration-400 ease-out z-201">
                          <div className="w-[290px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] px-[40px] py-[35px] text-left">
                            <ul className="flex flex-col gap-[22px]">
                              {["TYPE 1", "TYPE 2", "TYPE 3", "TYPE 4"].map((type) => (
                                <li key={type} className="flex items-center gap-2">
                                  <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#00089d] transition-colors tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{type}</Link>
                                  {type === "TYPE 4" && (
                                    <span className="bg-[#60b07a] text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold tracking-wider leading-none">NEW</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li className="flex items-center justify-between group/item">
                        <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#00089d] transition-colors tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>SPECIAL OFFERS</Link>
                      </li>
                    </ul>
                  </div>
                )}

          
                {/* Dropdown for PAGES */}
                {link.label === "PAGES" && (
                  <div
                    className="absolute top-[70px] md:top-[90px] left-0 w-[290px] h-[305px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-400 ease-out z-200 border-t border-gray-100 cursor-default py-[30px] text-left"
                  >
                    <ul className="flex flex-col w-full">
                      {["ABOUT US", "SERVICE", "OUR TEAM", "FAQ", "MAINTENANCE MODE", "404 ERROR", "CONTACT"].map((item) => (
                        <li key={item} className="w-full">
                          <Link href="#" className="text-[13px] font-normal text-[#1a1a1a] hover:text-[#00089d] transition-colors tracking-widest uppercase w-full h-[35px] flex items-center px-[40px]" style={{ fontFamily: "Inter, sans-serif" }}>{item}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}


              </motion.li>
            ))}
          </motion.ul>

          {/* Right icons */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 sm:gap-6 text-black"
          >
            {isLoggedIn && user ? (
              <div className="hidden sm:block relative group/profile">
                <button
                  type="button"
                  aria-label="Profile"
                  className="flex items-center gap-2 bg-[#f4f2f4] hover:bg-[#eae8ea] transition-colors pl-2 pr-4 py-1.5 rounded-full"
                >
                  <ProfileAvatar initial={user.initial} size="sm" imageUrl={user.profilePhoto} />
                  <span className="text-[14px] font-medium text-[#1a1a1a]" style={{ fontFamily: "Inter, sans-serif" }}>{user.name}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                <div className="absolute top-[calc(100%+8px)] right-0 w-[260px] bg-[#f2f0f2] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] opacity-0 invisible translate-y-3 group-hover/profile:translate-y-0 group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-300 ease-out z-200 border border-[#e8e5e8] overflow-hidden">
                  <div className="p-5 border-b border-[#e8e5e8]">
                    <p className="font-semibold text-[#1a1a1a] text-[16px]" style={{ fontFamily: "Inter, sans-serif" }}>{user.name}</p>
                    <p className="text-[14px] text-gray-500 mt-0.5">{user.email}</p>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link href="/profile" className="flex items-center gap-4 px-5 py-3 hover:bg-[#eae8ea] text-[14px] text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                        <User size={18} strokeWidth={1.5} />
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/orders" className="flex items-center gap-4 px-5 py-3 hover:bg-[#eae8ea] text-[14px] text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                        <ShoppingBag size={18} strokeWidth={1.5} />
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link href="/wishlist" className="flex items-center gap-4 px-5 py-3 hover:bg-[#eae8ea] text-[14px] text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                        <Heart size={18} strokeWidth={1.5} />
                        My Wishlist (0)
                      </Link>
                    </li>
                  </ul>
                  <div className="border-t border-[#e8e5e8] py-2">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-4 px-5 py-3 hover:bg-[#eae8ea] text-[14px] text-[#e55353] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <LogOut size={18} strokeWidth={1.5} className="rotate-180" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                aria-label="Account"
                className="hidden sm:block hover-icon-pop hover-scale-sm cursor-pointer"
                onClick={openLoginModal}
              >
                <User size={20} strokeWidth={1.5} />
              </button>
            )}
            <Link href="/wishlist" aria-label="Wishlist" className="hidden sm:block hover-icon-pop hover-scale-sm relative">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            <Link href="/cart" aria-label="Cart" className="hover-icon-pop hover-scale-sm relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#00089d] text-white text-[10px] font-bold leading-none"
                  aria-hidden="true"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label="Menu"
              className="md:hidden! hover-icon-pop hover-scale-sm"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-200 bg-black/50 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-201 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 h-[70px] border-b border-gray-100">
          <span
            className="text-[14px] font-medium tracking-[0.15em] uppercase"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Menu
          </span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="transition-all duration-200 hover:scale-110 hover:opacity-70"
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-6 py-6">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 text-[14px] font-medium tracking-[0.13em] uppercase transition-colors border-b border-gray-50 hover-link-slide ${
                    link.href !== "#" && (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                      ? "text-[#00089d]"
                      : "text-[#1a1a1a] hover:text-[#00089d]"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile-only icons (Account, Wishlist) */}
        <div className="sm:hidden px-6 pt-2 flex items-center gap-6 border-t border-gray-100 py-4">
          <button
            type="button"
            aria-label="Account"
            className="flex items-center gap-2 text-[13px] tracking-widest uppercase text-[#1a1a1a] hover:text-[#00089d] transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
            onClick={() => {
              setMobileMenuOpen(false);
              openLoginModal();
            }}
          >
            <User size={18} strokeWidth={1.5} />
            <span>Account</span>
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className="flex items-center gap-2 text-[13px] tracking-widest uppercase text-[#1a1a1a] hover:text-[#00089d] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
            <Heart size={18} strokeWidth={1.5} />
            <span>Wishlist</span>
          </Link>
        </div>
      </div>
    </>
  );
}
