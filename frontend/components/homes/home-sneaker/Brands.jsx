"use client";
import { brands2 } from "@/data/brands";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Brands() {
  return (
    <section className="flat-spacing-9 pb-0">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-partner sw-auto"
        breakpoints={{
          0: { slidesPerView: "auto" },
          575: {
            slidesPerView: "auto",
          },
          768: {
            slidesPerView: "auto",
          },
          992: {
            slidesPerView: "auto",
            spaceBetween: 74,
          },
        }}
        data-space={50}
        spaceBetween={50}
        loop
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
        }}
        speed={3000}
      >
        {brands2.map((brand, i) => (
          <SwiperSlide className="swiper-slide" key={i}>
            <a href="#" className="brand-item">
              <Image
                alt={brand.alt}
                src={brand.imageSrc}
                width={brand.width}
                height={brand.height}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
