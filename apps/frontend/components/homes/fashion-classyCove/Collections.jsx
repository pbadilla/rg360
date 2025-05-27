"use client";
import { collectionItems2 } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Collections() {
  return (
    <section className="space-30">
      <Swiper
        dir="ltr"
        slidesPerView={3}
        spaceBetween={30}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
        className="swiper tf-sw-collection"
      >
        {collectionItems2.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="collection-position style-lg hover-img">
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src={item.imgSrc}
                  alt={item.alt}
                  src={item.imgSrc}
                  width={900}
                  height={900}
                />
              </a>
              <div className="content">
                <h3 className="title wow fadeInUp">
                  <Link href={`/shop-collection`} className="link text-white">
                    {item.title}
                  </Link>
                </h3>
                <p
                  className="desc text-white text-title wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  {item.desc}
                </p>
                <div className="wow fadeInUp" data-wow-delay="0.2s">
                  <Link
                    href={`/shop-collection`}
                    className="btn-line style-white"
                  >
                    {item.btnText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
