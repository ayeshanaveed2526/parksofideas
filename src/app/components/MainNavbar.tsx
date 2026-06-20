"use client";

import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";

/**
 * MainNavbar — the second bar.
 * Spec: 1521px x 90px, white background.
 */
export default function MainNavbar() {
  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/shop" },
    { label: "HEADERS", href: "/headers" },
    { label: "BLOG", href: "/blog" },
    { label: "PAGES", href: "/pages" },
    { label: "MEGA", href: "/mega" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex h-[90px] w-full max-w-[1521px] items-center justify-between px-[50px]">
        {/* Logo */}
        <Link href="/" aria-label="Luchiana Home">
          <svg width="205" height="18" xmlns="http://www.w3.org/2000/svg">
            <g fill="#000" fillRule="evenodd">
              <path d="M62.01 0c-2.26 0-4.215.872-5.603 2.447-1.388 1.573-2.204 3.84-2.204 6.624 0 2.783.816 5.05 2.204 6.624 1.388 1.574 3.343 2.446 5.604 2.446 3.556 0 6.465-2.144 7.123-5.777l.02-.108h-2.302l-.016.073c-.5 2.372-2.538 3.648-4.825 3.648-1.563 0-2.953-.604-3.955-1.765-1.002-1.161-1.62-2.888-1.62-5.141 0-2.254.618-3.98 1.62-5.142 1.002-1.16 2.392-1.765 3.955-1.765 2.287 0 4.324 1.276 4.825 3.648l.016.073h2.301l-.02-.108C68.478 2.144 65.568 0 62.012 0zM2.3.239H0v17.663h10.426V15.84H2.3zM27.596.239h-2.3v11.665c0 1.816.679 3.395 1.883 4.518 1.204 1.124 2.926 1.787 5.002 1.787 2.077 0 3.799-.663 5.003-1.787 1.204-1.123 1.883-2.702 1.883-4.518V.24h-2.301v11.494c0 1.259-.432 2.335-1.216 3.096-.784.762-1.93 1.216-3.369 1.216-1.44 0-2.584-.454-3.369-1.216-.784-.761-1.216-1.837-1.216-3.096V.24zM117.531.239h-2.301v17.663h2.301z" fillRule="nonzero" />
              <path d="M140.624.239h-2.313l-6.486 17.663h2.416l1.758-4.95h6.937l1.758 4.95h2.416L140.624.24zM136.73 10.89l2.734-7.702h.007l2.734 7.702h-5.475z" />
              <path fillRule="nonzero" d="M163.573.239h-2.188v17.663h2.301V4.18h.03l9.525 13.723h2.188V.24h-2.266v13.758h-.031z" />
              <path d="M198.514.239h-2.313l-6.486 17.663h2.416l1.758-4.95h6.937l1.758 4.95H205L198.514.24zM194.62 10.89l2.734-7.702h.007l2.734 7.702h-5.475z" />
              <path fillRule="nonzero" d="M87.376.241h-2.3v17.663h2.3v-7.8h9.443v7.8h2.301V.241h-2.3v7.8h-9.444z" />
            </g>
          </svg>
        </Link>

        {/* Nav links */}
        <ul className="hidden lg:flex relative lg:right-[30px] items-center text-[#1a1a1a]">
          {navLinks.map((link) => (
            <li
              key={link.label}
              style={{
                position: "relative",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: 1.14,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                margin: "15px 20px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <Link href={link.href} className="hover:text-[#8c6f63] transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-6 text-black">
          <button aria-label="Search" className="transition-all duration-200 hover:scale-125 hover:opacity-70">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Account" className="transition-all duration-200 hover:scale-125 hover:opacity-70">
            <User size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Wishlist" className="transition-all duration-200 hover:scale-125 hover:opacity-70">
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Cart" className="transition-all duration-200 hover:scale-125 hover:opacity-70">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Menu" className="lg:hidden transition-all duration-200 hover:scale-125 hover:opacity-70">
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
