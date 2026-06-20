import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "SKINCARE",
    image: "/images/luchiana-0654733209.jpg",
    link: "#",
  },
  {
    name: "LIPS",
    image: "/images/luchiana-0654102558.jpg",
    link: "#",
  },
  // {
  //   name: "LIPS",
  //   image: "/images/luchiana-0654132591.jpg",
  //   link: "#",
  // },
  {
    name: "HAIR",
    image: "/images/luchiana-0654445062.jpg",
    link: "#",
  },
  {
    name: "EYE",
    image: "/images/luchiana-0654822752-115x115.jpg",
    link: "#",
  },
  {
    name: "MAKEUP",
    image: "/images/luchiana-0654132591.jpg",
    link: "#",
  },
  {
    name: "FRAGRANCE",
    image: "/images/luchiana-0654439537.jpg",
    link: "#",
  },
];

export default function ShopByCategory() {
  return (
    <div className="w-full bg-[#f6f6f6] py-[80px]">
      <div className="mx-auto flex w-full max-w-[1561px] items-center justify-center px-4 xl:px-[120px]">
        <div
          className="flex w-full flex-wrap lg:flex-nowrap items-start justify-center p-0"
          style={{ listStyle: "none", margin: "-20px -40px 0 0" }}
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.link}
              className="group flex shrink-0 flex-col items-center justify-start transition-transform duration-300 hover:scale-[1.05]"
              style={{ width: "160px", height: "158.9375px", margin: "20px 40px 0 0", boxSizing: "border-box" }}
            >
              <div className="flex h-[104px] w-[104px] shrink-0 items-center justify-center rounded-full bg-white overflow-hidden transition-all duration-300">
                <div className="relative h-full w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="104px"
                  />
                </div>
              </div>
              <span
                className="flex w-[160px] items-center justify-center text-[#1a1a1a] transition-colors duration-300 group-hover:text-[rgb(205,174,159)]"
                style={{
                  fontFamily: "var(--font-marcellus), serif",
                  fontWeight: 400,
                  letterSpacing: ".2em",
                  lineHeight: 1.26,
                  marginTop: "25px",
                  paddingLeft: ".2em",
                  position: "relative",
                  textAlign: "center",
                  textTransform: "uppercase"
                }}
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
