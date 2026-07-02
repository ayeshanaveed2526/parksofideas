"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import { PERFUME_CATALOG, PRODUCT_GRID_IMAGES } from "../data/perfumeCatalog";

const bySlug = (slug: string) => PERFUME_CATALOG.find((p) => p.slug === slug)!;

type Collection = {
  key: string;
  label: string;
  perfumes: ReturnType<typeof bySlug>[];
};

const collections: Collection[] = [
  {
    key: "her",
    label: "For Her",
    perfumes: [
      bySlug("roselle"),
      bySlug("lumiere"),
      bySlug("mirabelle"),
      bySlug("celeste"),
      bySlug("floren"),
    ],
  },
  {
    key: "him",
    label: "For Him",
    perfumes: [
      bySlug("orlune"),
      bySlug("noctelle"),
      bySlug("vespera"),
      bySlug("verdelle"),
      bySlug("montrea"),
    ],
  },
  {
    key: "unisex",
    label: "Unisex",
    perfumes: [
      bySlug("lucent"),
      bySlug("azure"),
      bySlug("aura-crystal"),
      bySlug("ambrette"),
      bySlug("elaria"),
    ],
  },
];

export default function ShopByCategory() {
  const [active, setActive] = useState(collections[1].key);
  const activeCollection =
    collections.find((c) => c.key === active) ?? collections[0];

  return (
    <section className="relative w-full overflow-hidden pt-4 pb-[70px] md:pt-6 md:pb-[90px]">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/marble-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.7) 55%, rgba(255,255,255,0.75) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 xl:px-[60px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <span
            className="mb-3 text-[12px] uppercase tracking-[0.35em] text-[#00089d]/70"
            style={{ fontFamily: "var(--font-marcellus), serif" }}
          >
            Curated Collections
          </span>
          <h2
            className="text-[28px] font-bold leading-tight text-[#1a1a1a] md:text-[40px]"
            style={{ fontFamily: "var(--font-marcellus), serif" }}
          >
            Shop By Collection
          </h2>
        </div>

        <div className="mb-9 flex items-center justify-center">
          <div className="flex items-center gap-6 border border-white/60 bg-white/40 p-3 shadow-[0_8px_30px_rgba(0,8,157,0.08)] backdrop-blur-md">
            {collections.map((c) => {
              const isActive = c.key === active;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActive(c.key)}
                  className={`poi-btn px-6 py-2.5 text-[13px] uppercase tracking-[0.18em] md:px-8${isActive ? " poi-btn-active" : ""
                    }`}
                  style={{ fontFamily: "var(--font-marcellus), serif" }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full">
          <Swiper
            modules={[Autoplay, A11y]}
            spaceBetween={12}
            slidesPerView={2}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={false}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 5, spaceBetween: 16 },
            }}
            className="w-full pb-[20px]"
          >
            {activeCollection.perfumes.map((perfume, idx) => {
              const distinctImage = PRODUCT_GRID_IMAGES[(perfume.id * 3 + idx) % PRODUCT_GRID_IMAGES.length];
              return (
              <SwiperSlide key={perfume.id}>
                <Link
                  href={`/product/${perfume.id}`}
                  className="group relative block aspect-[3/4.6] overflow-hidden rounded-[18px] border border-[#d6d8df] shadow-[0_10px_30px_rgba(0,8,157,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[rgba(0,8,157,0.25)] hover:shadow-[0_22px_55px_rgba(0,8,157,0.22)]"
                  style={{
                    background:
                      "linear-gradient(150deg, #eceef2 0%, #dcdee4 55%, #cfd2da 100%)",
                  }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={distinctImage}
                      alt={perfume.brand}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-t from-black/85 via-black/55 to-transparent px-4 pb-5 pt-12 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 flex items-end justify-center">
                    <p
                      className="text-center text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-white/90 leading-relaxed"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 300 }}
                    >
                      {perfume.notes}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
