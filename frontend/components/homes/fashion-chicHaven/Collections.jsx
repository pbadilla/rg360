"use client";
import { collection5 } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Collections() {
  return (
    <section className="space-30">
      <Swiper
        dir="ltr"
        spaceBetween={15} // This replaces data-space
        breakpoints={{
          1200: { slidesPerView: 3 }, // Data-preview
          768: { slidesPerView: 2 }, // Data-tablet
          0: { slidesPerView: 1 }, // Data-mobile
        }}
        className="tf-sw-collection"
      >
        {collection5.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="collection-position-2 style-4 hover-img wow fadeInUp"
              data-wow-delay={slide.delay}
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src={slide.imageSrc}
                  alt={slide.alt}
                  src={slide.imageSrc}
                  width={900}
                  height={675}
                />
              </a>
              <div className="content">
                <Link href={`/shop-categories-top`} className="cls-btn">
                  <h6 className="text">{slide.title}</h6>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
