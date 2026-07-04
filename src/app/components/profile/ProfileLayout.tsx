"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, Heart, LogOut } from "lucide-react";
import { useLoginModal } from "../auth/LoginModalProvider";
import styles from "./profile.module.css";
import Header from "../Header";
import Footer from "../Footer";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const pathname = usePathname();
  const { isLoggedIn, logout, openLoginModal } = useLoginModal();

  const navLinks = [
    { label: "My Profile", href: "/profile", icon: User },
    { label: "My Orders", href: "/orders", icon: ShoppingBag },
    { label: "My Wishlist", href: "/wishlist", icon: Heart },
  ];

  const isWishlist = pathname === "/wishlist";

  if (!isLoggedIn && !isWishlist) {
    return (
      <main className="min-h-screen relative flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Authentication Required</h2>
            <p className="text-gray-500 mb-6">Please sign in to view this page.</p>
            <button 
              onClick={openLoginModal}
              className="poi-btn w-full"
            >
              Sign In
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen relative flex flex-col">
      <Header />
      
      <div className={styles.page}>
        <div className={styles.bg} aria-hidden="true">
          <div className={styles.bgGrid} />
          <div className={styles.bgShine} />
          <div className={`${styles.orb} ${styles.orbBlue}`} />
          <div className={`${styles.orb} ${styles.orbGold}`} />
        </div>

        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <nav className={styles.sidebarNav}>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                  >
                    <Icon size={18} className={styles.navLinkIcon} strokeWidth={isActive ? 2 : 1.5} />
                    {link.label}
                  </Link>
                );
              })}
              {isLoggedIn && (
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 w-full justify-center bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm mt-2"
                    onClick={logout}
                  >
                    <LogOut size={18} strokeWidth={2} />
                    Sign Out
                  </button>
                </div>
              )}
            </nav>
          </aside>

          <section className={styles.mainContent}>
            {children}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
