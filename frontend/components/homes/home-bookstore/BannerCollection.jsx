"use client";
import { collections15 } from "@/data/collections";
import Link from "next/link";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function BannerCollection() {
  return (
    <section className="">
      <div className="container">
        <Swiper
          className="swiper tf-sw-lookbook"
          spaceBetween={30}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd18",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            992: {
              slidesPerView: 2,
            },
          }}
          dir="ltr"
        >
          {collections15.map((collection) => (
            <SwiperSlide key={collection.id} className="swiper-slide">
              <div className="collection-default style-1 style-row hover-img">
                <a className="img-style aspect-ratio-0">
                  <Image
                    className="lazyload"
                    data-src={collection.imageSrc}
                    alt="banner-cls"
                    src={collection.imageSrc}
                    width={collection.width}
                    height={collection.height}
                  />
                </a>
                <div className="content">
                  <h4 className="title wow fadeInUp">
                    <Link href={`/shop-collection`} className="link">
                      {collection.title}
                    </Link>
                  </h4>
                  <p className="desc wow fadeInUp">{collection.description}</p>
                  <div className="wow fadeInUp">
                    <Link href={`/shop-collection`} className="btn-line">
                      {collection.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-pagination-lookbook sw-dots type-circle justify-content-center spd18" />
        </Swiper>
      </div>
    </section>
  );
}
