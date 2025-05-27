"use client";

import { collections } from "@/data/collections";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ShopCategories() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <Swiper
          dir="ltr"
          slidesPerView={5}
          spaceBetween={20}
          breakpoints={{
            1200: { slidesPerView: 6, spaceBetween: 20 },
            1000: { slidesPerView: 4, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            480: { slidesPerView: 2, spaceBetween: 15 },
            0: { slidesPerView: 2, spaceBetween: 15 },
          }}
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            el: ".spd54",
          }}
          navigation={{
            prevEl: ".snbp12",
            nextEl: ".snbn12",
          }}
        >
          {collections.map((collection, index) => (
            <SwiperSlide key={index}>
              <div className="collection-circle hover-img">
                <Link href={`/shop-collection`} className="img-style">
                  <Image
                    className="lazyload"
                    data-src={collection.imgSrc}
                    alt={collection.alt}
                    src={collection.imgSrc}
                    width={363}
                    height={363}
                  />
                </Link>
                <div className="collection-content text-center">
                  <div>
                    <Link href={`/shop-collection`} className="cls-title">
                      <h6 className="text">{collection.title}</h6>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                  <div className="count text-secondary">{collection.count}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="d-flex d-lg-none sw-pagination-collection sw-dots type-circle justify-content-center spd54" />
      </div>
    </section>
  );
}
