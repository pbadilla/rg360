"use client";
import { brands2 } from "@/data/brands";
import React from "react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Brands() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
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
          autoplay
        >
          {brands2.map((brand) => (
            <SwiperSlide className="swiper-slide" key={brand.id}>
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
      </div>
    </section>
  );
}
