"use client";
import { collections5 } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function BannerCollections() {
  return (
    <section>
      <div className="container-full2">
        <Swiper
          spaceBetween={15} // data-space
          slidesPerView={2} // data-preview
          breakpoints={{
            1200: { slidesPerView: 2, spaceBetween: 30 }, // data-space-lg
            992: { slidesPerView: 2, spaceBetween: 30 }, // data-tablet
            0: { slidesPerView: 1, spaceBetween: 15 }, // data-mobile
          }}
          dir="ltr"
        >
          {collections5.map((collection, index) => (
            <SwiperSlide key={index}>
              <div className="collection-position radius style-lg hover-img">
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={collection.imgSrc}
                    alt={collection.alt}
                    src={collection.imgSrc}
                    width={1358}
                    height={956}
                  />
                </a>
                <div className="content">
                  <h3 className="title wow fadeInUp">
                    <Link href={`/shop-collection`} className="link text-white">
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
                      href={`/shop-collection`}
                      className="btn-line style-white"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
