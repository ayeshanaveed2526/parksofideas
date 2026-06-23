import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "SKINCARE",
    image: "/images/luchiana-0654733209.webp",
    link: "/product/1",
  },
  {
    name: "LIPS",
    image: "/images/luchiana-0654102558.webp",
    link: "/product/1",
  },
  // {
  //   name: "LIPS",
  //   image: "/images/luchiana-0654132591.webp",
  //   link: "#",
  // },
  {
    name: "HAIR",
    image: "/images/luchiana-0654445062.webp",
    link: "/product/1",
  },
  {
    name: "EYE",
    image: "/images/luchiana-0654822752-115x115.webp",
    link: "/product/1",
  },
  {
    name: "MAKEUP",
    image: "/images/luchiana-0654132591.webp",
    link: "/product/1",
  },
  {
    name: "FRAGRANCE",
    image: "/images/luchiana-0654439537.webp",
    link: "/product/1",
  },
];

export default function ShopByCategory() {
  return (
    <div className="w-full bg-[#f6f6f6] py-[80px]">
      <div className="mx-auto flex w-full items-center justify-center px-4 xl:px-[120px]">
        <div
          className="flex w-full flex-wrap lg:flex-nowrap items-start justify-center gap-[15px] sm:gap-[30px] md:gap-[40px] lg:gap-0 lg:-mt-[20px] lg:-mr-[40px]"
          style={{ listStyle: "none" }}
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.link}
              className="group flex shrink-0 flex-col items-center justify-start transition-transform duration-300 hover:scale-[1.05] w-[100px] sm:w-[130px] md:w-[140px] lg:w-[160px] lg:h-[158.9375px] lg:mt-[20px] lg:mr-[40px]"
              style={{ boxSizing: "border-box" }}
            >
              <div className="flex h-[75px] w-[75px] sm:h-[80px] sm:w-[80px] md:h-[90px] md:w-[90px] lg:h-[104px] lg:w-[104px] shrink-0 items-center justify-center rounded-full bg-white overflow-hidden transition-all duration-300">
                <div className="relative h-full w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 640px) 75px, (max-width: 768px) 80px, (max-width: 1024px) 90px, 104px"
                  />
                </div>
              </div>
              <span
                className="flex w-full lg:w-[160px] items-center justify-center text-[#1a1a1a] transition-colors duration-300 group-hover:text-[rgb(205,174,159)] relative text-center uppercase font-normal tracking-[0.2em] leading-[1.26] pl-[0.2em] mt-[15px] lg:mt-[25px] text-[12px] lg:text-[14px]"
                style={{ fontFamily: "var(--font-marcellus), serif" }}
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
