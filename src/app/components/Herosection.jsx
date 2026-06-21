"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Herosection() {
  const leftSlides = [
    {
      id: 1,
      image: "/images/Gemini_Generated_Image_9aoqnd9aoqnd9aoq.png",
      subtitle: "PACKAGE",
      title: "PREMIUM",
      link: "#",
    },
    {
      id: 2,
      image: "/images/pink_slide_2_v2.png",
      subtitle: "ORGANIC",
      title: "BEAUTY",
      link: "#",
    },
    {
      id: 3,
      image: "/images/pink_slide_3_v2.png",
      subtitle: "BOTANICAL",
      title: "ESSENCE",
      link: "#",
    },
  ];

  const rightSlides = [
    {
      id: 1,
      image: "/images/Gemini_Generated_Image_n9mh33n9mh33n9mh.png",
      subtitle: "NEW BRAND",
      title: "TOUCH",
      link: "#",
    },
    {
      id: 2,
      image: "/images/beige_slide_2_v2.png",
      subtitle: "PURE SAND",
      title: "LUXURY",
      link: "#",
    },
    {
      id: 3,
      image: "/images/beige_slide_3_v2.png",
      subtitle: "MINIMALIST",
      title: "SERUM",
      link: "#",
    },
  ];

  const [currentLeft, setCurrentLeft] = useState(0);
  const [currentRight, setCurrentRight] = useState(0);

  // Manual sliding only, no automatic transitions
  useEffect(() => {}, []);

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Container matching Navbar max width */}
      <div className="relative mx-auto flex w-full flex-col md:flex-row">
        
        {/* Left Column (Pink Slider) */}
        <div className="relative flex h-[320px] sm:h-[400px] md:h-[478px] w-full md:w-1/2 flex-shrink-0 items-center overflow-hidden group">
          {leftSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center transition-opacity duration-1000 ease-in-out ${
                idx === currentLeft ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <div className={`absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out ${
                idx === currentLeft ? "scale-100" : "scale-105"
              }`}>
                <Image 
                  src={slide.image} 
                  alt={slide.title} 
                  fill 
                  style={{ objectFit: "cover", objectPosition: "center" }} 
                  priority={idx === 0}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex w-full flex-col px-6 sm:px-[40px] md:px-[80px]">
                <span 
                  className={`mb-3 sm:mb-4 text-[#1a1a1a] text-[12px] sm:text-[14px] md:text-[17px] transition-all duration-700 ease-out transform ${
                    idx === currentLeft ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{
                    fontFamily: "var(--font-marcellus), sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.5em",
                    lineHeight: "20px",
                    textTransform: "uppercase",
                    transitionDelay: idx === currentLeft ? "200ms" : "0ms"
                  }}
                >
                  {slide.subtitle}
                </span>
                <div
                  className={`mb-6 sm:mb-10 text-[#1a1a1a] text-[24px] min-[380px]:text-[28px] sm:text-[38px] md:text-[58px] transition-all duration-700 ease-out transform ${
                    idx === currentLeft ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 200,
                    letterSpacing: "0.14em",
                    lineHeight: 1.172,
                    textTransform: "uppercase",
                    textAlign: "left",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    position: "relative",
                    left: "-4px",
                    display: "inline-block",
                    transitionDelay: idx === currentLeft ? "400ms" : "0ms"
                  }}
                >
                  {slide.title}
                </div>
                <div 
                  className={`transition-all duration-700 ease-out transform ${
                    idx === currentLeft ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: idx === currentLeft ? "600ms" : "0ms"
                  }}
                >
                  <Link 
                    href={slide.link} 
                    className="w-fit border border-[#1a1a1a] text-[#1a1a1a] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white"
                    style={{
                      display: "inline-block",
                      outline: "none",
                      fontWeight: 400,
                      fontSize: "11px",
                      lineHeight: 1.2,
                      textAlign: "center",
                      letterSpacing: "0.265em",
                      textIndent: "0.265em",
                      textTransform: "uppercase",
                      padding: "14px 24px",
                      textDecoration: "none"
                    }}
                  >
                    EXPLORE
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Circular Stamp — hidden on small mobile */}
          <div className="absolute right-4 sm:right-8 md:right-[230px] top-4 sm:top-[40px] z-20 hidden sm:flex h-[90px] w-[90px] md:h-[130px] md:w-[130px] items-center justify-center rounded-full bg-[#fcecf0]">
             <svg viewBox="0 0 100 100" className="h-[90%] w-[90%] animate-[spin_20s_linear_infinite]">
               <defs>
                 <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
               </defs>
               <text fontSize="8.5" fontWeight="500" fill="#1a1a1a" letterSpacing="1.2">
                 <textPath href="#circlePath" startOffset="0%">
                   • ALL PRODUCTS IS NATURAL • 2000+ CUSTOMERS 
                 </textPath>
               </text>
             </svg>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-[40px] md:left-[80px] z-20 flex gap-2">
            {leftSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentLeft(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentLeft ? "bg-[#1a1a1a] w-8" : "bg-[#1a1a1a]/30 hover:bg-[#1a1a1a]/60 w-4"
                }`}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentLeft((prev) => (prev - 1 + leftSlides.length) % leftSlides.length)}
            className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm cursor-pointer"
            type="button"
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentLeft((prev) => (prev + 1) % leftSlides.length)}
            className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm cursor-pointer"
            type="button"
            aria-label="Next Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right Column (Beige Slider) */}
        <div className="relative flex h-[320px] sm:h-[400px] md:h-[478px] w-full md:w-1/2 flex-shrink-0 items-center overflow-hidden group">
          {rightSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center transition-opacity duration-1000 ease-in-out ${
                idx === currentRight ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <div className={`absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out ${
                idx === currentRight ? "scale-100" : "scale-105"
              }`}>
                <Image 
                  src={slide.image} 
                  alt={slide.title} 
                  fill 
                  style={{ objectFit: "cover", objectPosition: "center" }} 
                  priority={idx === 0}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex w-full flex-col px-6 sm:px-[40px] md:px-[80px]">
                <span 
                  className={`mb-3 sm:mb-4 text-[#1a1a1a] text-[12px] sm:text-[14px] md:text-[17px] transition-all duration-700 ease-out transform ${
                    idx === currentRight ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  style={{
                    fontFamily: "var(--font-marcellus), sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.5em",
                    lineHeight: "20px",
                    textTransform: "uppercase",
                    transitionDelay: idx === currentRight ? "200ms" : "0ms"
                  }}
                >
                  {slide.subtitle}
                </span>
                <h1 
                  className={`mb-6 sm:mb-10 text-[#1a1a1a] text-[24px] min-[380px]:text-[28px] sm:text-[38px] md:text-[58px] transition-all duration-700 ease-out transform ${
                    idx === currentRight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 200,
                    letterSpacing: "0.14em",
                    lineHeight: 1.172,
                    textTransform: "uppercase",
                    textAlign: "left",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    position: "relative",
                    left: "-4px",
                    display: "inline-block",
                    transitionDelay: idx === currentRight ? "400ms" : "0ms"
                  }}
                >
                  {slide.title}
                </h1>
                <div 
                  className={`transition-all duration-700 ease-out transform ${
                    idx === currentRight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: idx === currentRight ? "600ms" : "0ms"
                  }}
                >
                  <Link 
                    href={slide.link} 
                    className="w-fit border border-[#1a1a1a] text-[#1a1a1a] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white"
                    style={{
                      display: "inline-block",
                      outline: "none",
                      fontWeight: 400,
                      fontSize: "11px",
                      lineHeight: 1.2,
                      textAlign: "center",
                      letterSpacing: "0.265em",
                      textIndent: "0.265em",
                      textTransform: "uppercase",
                      padding: "14px 24px",
                      textDecoration: "none"
                    }}
                  >
                    EXPLORE
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-[40px] md:left-[80px] z-20 flex gap-2">
            {rightSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentRight(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentRight ? "bg-[#1a1a1a] w-8" : "bg-[#1a1a1a]/30 hover:bg-[#1a1a1a]/60 w-4"
                }`}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentRight((prev) => (prev - 1 + rightSlides.length) % rightSlides.length)}
            className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm cursor-pointer"
            type="button"
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentRight((prev) => (prev + 1) % rightSlides.length)}
            className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm cursor-pointer"
            type="button"
            aria-label="Next Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sticky Buy Theme Button (Right Edge) — hidden on mobile */}
      <a 
        href="#"
        className="fixed right-0 top-1/2 z-50 -translate-y-1/2 transition-transform duration-300 hover:-translate-x-2 hidden md:block"
        aria-label="Buy Theme"
      >
        <svg width="44" height="120" viewBox="0 0 44 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
          <g clipPath="url(#clip0)">
            <path d="M6 120C2.68629 120 -1.17422e-07 117.314 -2.62268e-07 114L-4.9831e-06 6C-5.12794e-06 2.68629 2.68629 -1.17422e-07 5.99999 -2.62268e-07L44 -1.9233e-06L44 120L6 120Z" fill="#8DB352"/>
            <path d="M27.0012 100.721L27.0056 96.0599C27.008 93.6096 25.7308 92.3034 23.9943 92.3017C22.3803 92.3002 21.4044 93.4552 21.3446 94.6962L21.2381 94.6961C20.9835 93.5613 20.18 92.7242 18.8962 92.723C17.2609 92.7215 16.0986 93.9349 16.0963 96.3425L16.0921 100.71L27.0012 100.721ZM25.1178 98.4125L22.22 98.4098L22.2219 96.4762C22.2229 95.3682 22.8628 94.6817 23.763 94.6825C24.5833 94.6833 25.1208 95.2431 25.1195 96.5322L25.1178 98.4125ZM20.6593 98.4083L17.9587 98.4057L17.9603 96.6533C17.9613 95.6305 18.4892 95.0504 19.2775 95.0512C20.1405 95.052 20.6618 95.7556 20.6609 96.6984L20.6593 98.4083ZM23.5321 85.3713C24.6294 85.367 25.204 86.1186 25.2032 86.9336C25.2024 87.7912 24.6 88.3446 23.6358 88.349L18.8311 88.3445L18.829 90.6136L24.0385 90.6186C25.9508 90.6151 27.1184 89.4976 27.12 87.8516C27.1211 86.6211 26.4881 85.7363 25.5296 85.3679L25.5297 85.2826L27.0159 85.284L27.0159 83.1054L18.8361 83.0977L18.8339 85.3668L23.5321 85.3713ZM30.0734 79.6673C30.075 77.9788 29.2182 77.0777 27.9083 76.6184L18.8559 73.4298L18.843 75.8321L24.8499 77.5477L24.8498 77.6329L18.8397 79.3211L18.8374 81.7075L27.2564 78.7804L27.6025 78.9139C28.3426 79.2342 28.3954 79.7829 28.1442 80.5817L29.843 81.0947C29.9765 80.7699 30.0728 80.2426 30.0734 79.6673ZM18.0241 68.7189L18.0273 65.3791L27.0347 65.3876L27.0369 63.1078L18.0294 63.0993L18.0326 59.7594L16.1309 59.7576L16.1225 68.7171L18.0241 68.7189ZM22.3136 55.8364C21.259 55.8301 20.6417 55.185 20.6426 54.2581C20.6434 53.3366 21.2352 52.7939 22.2419 52.8001L27.0466 52.8047L27.0488 50.5355L21.8393 50.5306C19.9217 50.5234 18.7594 51.6516 18.7578 53.3561C18.7566 54.5973 19.3417 55.4288 20.3055 55.8026L20.3054 55.8984L16.1346 55.8945L16.1325 58.0997L27.0416 58.1101L27.0438 55.8409L22.3136 55.8364ZM27.214 44.7962C27.2159 42.7721 26.2318 41.4075 24.714 41.0864L24.5735 43.185C25.1965 43.4147 25.5209 44.0009 25.5202 44.7573C25.5191 45.8919 24.7673 46.6103 23.5475 46.6091L23.5422 46.6091L23.5475 41.0374L22.9243 41.0368C20.1437 41.0342 18.7678 42.7161 18.7658 44.8787C18.7635 47.2864 20.4719 48.8488 22.9968 48.8512C25.5909 48.8536 27.2116 47.3157 27.214 44.7962ZM22.136 46.6078C21.2038 46.559 20.4588 45.8498 20.4597 44.8431C20.4606 43.8576 21.1644 43.1765 22.1392 43.1721L22.136 46.6078ZM27.0594 39.3349L27.0615 37.0657L22.1503 37.0611C21.2448 37.0602 20.6434 36.4844 20.6441 35.728C20.6448 34.9822 21.1567 34.482 21.961 34.4828L27.064 34.4876L27.0661 32.2877L22.0696 32.2829C21.2227 32.2829 20.6479 31.7969 20.6486 30.9712C20.6493 30.2468 21.1026 29.7039 22.0135 29.7048L27.0685 29.7095L27.0707 27.4457L21.5682 27.4405C19.7944 27.4388 18.7813 28.4925 18.7799 30.016C18.7787 30.2468 19.3904 32.1472 20.3276 32.4837L20.3275 32.5689C19.3791 32.829 18.7764 33.6648 18.7753 34.7887C18.7743 35.8913 19.3594 36.7282 20.3233 37.07L20.3232 37.1659L18.8796 37.1645L18.8776 39.3271L27.0594 39.3349ZM27.2359 21.6997C27.2378 19.6756 26.2537 18.311 24.7359 17.99L24.5954 20.0886C25.2184 20.3182 25.5428 20.9044 25.5421 21.6608C25.541 22.7954 24.7892 23.5138 23.5694 23.5127L23.5641 23.5126L23.5694 17.9409L22.9461 17.9403C20.1656 17.9377 18.7897 19.6196 18.7877 21.7823C18.7854 24.1899 20.4938 25.7523 23.0186 25.7547C25.6127 25.7571 27.2335 24.2193 27.2359 21.6997ZM22.1578 23.5113C21.2257 23.4625 20.4806 22.7533 20.4816 21.7466C20.4825 20.7611 21.1863 20.08 22.1611 20.0756L22.1578 23.5113Z" fill="white"/>
          </g>
        </svg>
      </a>
    </div>
  );
}
