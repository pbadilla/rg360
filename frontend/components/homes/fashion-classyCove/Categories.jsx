"use client";
import { categoryItems } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Categories() {
  return (
    <section className="layout-sw-center pl-xl">
      <div className="heading-section text-center wow fadeInUp">
        <h3 className="heading">Shop by categories</h3>
      </div>
      <Swiper
        dir="ltr"
        loop={true}
        slidesPerView={6}
        spaceBetween={20}
        pagination={{
          clickable: true,
          clickable: true,
        }}
        breakpoints={{
          1424: { slidesPerView: 6 },
          1024: { slidesPerView: 3.2 },
          768: { slidesPerView: 2.5 },
          0: { slidesPerView: 1.2 },
        }}
        className="swiper tf-sw-categories"
      >
        {categoryItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="collection-position-2 style-2 hover-img">
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src={item.imgSrc}
                  alt={item.alt}
                  src={item.imgSrc}
                  width={626}
                  height={833}
                />
              </a>
              <div className="content">
                <Link href={`/shop-categories-top`} className="cls-btn">
                  <h6 className="text">{item.title}</h6>
                  <span className="count-item text-secondary">
                    {item.count}
                  </span>
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
