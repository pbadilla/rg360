"use client";
import { products56 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Gallery() {
  return (
    <section className="pb-10">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-shop-gallery"
        loop
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          575: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 2.7,
          },
          992: {
            slidesPerView: 4,
          },
        }}
      >
        {products56.map((item) => (
          <SwiperSlide className="swiper-slide" key={item.id}>
            <div className="gallery-item rounded-0 hover-overlay hover-img">
              <div className="img-style">
                <Image
                  className="lazyload img-hover"
                  data-src={item.imgSrc}
                  alt={item.alt}
                  src={item.imgSrc}
                  width={item.width}
                  height={item.height}
                />
              </div>
              <div className="gallery-content">
                <a href="#quickView" data-bs-toggle="modal" className="cls-btn">
                  <h6 className="text font-4 text-uppercase">{item.title}</h6>
                  <i className="icon icon-arrowUpRight" />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
