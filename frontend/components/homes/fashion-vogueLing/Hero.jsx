"use client";
import { slideshowData } from "@/data/heroSlides";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="tf-slideshow slider-collection">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        spaceBetween={10}
        slidesPerView={3}
        centeredSlides={false}
        loop={false}
        autoplay={false}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1.5 },
        }}
      >
        {slideshowData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="collection-position-2 hover-img">
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src={item.imgSrc}
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  width={634}
                  height={796}
                />
              </a>
              <div className="content">
                <Link href={`/shop-collection`} className="cls-btn">
                  <h4 className="text">{item.heading}</h4>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
