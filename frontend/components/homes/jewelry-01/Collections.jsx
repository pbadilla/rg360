"use client";
import { collections10 } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Collections() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <Swiper
          spaceBetween={30}
          className="flat-sw-pagination swiper tf-sw-lookbook"
          dir="ltr"
          slidesPerView={2}
          breakpoints={{
            768: {
              slidesPerView: 2, // tablet
            },
            0: {
              slidesPerView: 1, // mobile
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd56",
          }}
        >
          {collections10.map((collection, index) => (
            <SwiperSlide key={index}>
              <div className="collection-position radius style-lg hover-img">
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={collection.imgSrc}
                    alt={collection.alt}
                    src={collection.imgSrc}
                    width={944}
                    height={630}
                  />
                </a>
                <div className="content">
                  <h3 className="title wow fadeInUp">
                    <Link
                      href={`/shop-default-grid`}
                      className="link text-white"
                    >
                      {collection.title}
                    </Link>
                  </h3>
                  <p
                    className="desc text-white wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    {collection.description}
                  </p>
                  <div className="wow fadeInUp" data-wow-delay="0.2s">
                    <Link
                      href={`/shop-default-grid`}
                      className="btn-line style-white"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-lookbook sw-dots type-circle white-circle-line justify-content-center spd56" />
        </Swiper>
      </div>
    </section>
  );
}
