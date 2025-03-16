"use client";
import { collections14 } from "@/data/collections";
import Link from "next/link";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function Collections() {
  return (
    <section className="">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3>Shop by Categories</h3>
        </div>
        <div
          className="flat-collection-circle wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <Swiper
            dir="ltr"
            className="swiper tf-sw-collection"
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 2 },
              575: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true,
              el: ".spd13",
            }}
            navigation={{
              prevEl: ".snbp13",
              nextEl: ".snbn13",
            }}
          >
            {collections14.map((collection) => (
              <SwiperSlide key={collection.id} className="swiper-slide">
                <div className="collection-circle hover-img">
                  <Link
                    href={`/shop-collection`} // Link added directly in JSX
                    className="img-style rounded-0"
                  >
                    <Image
                      className="lazyload"
                      data-src={collection.imageSrc}
                      alt="collection-img"
                      src={collection.imageSrc}
                      width={collection.width}
                      height={collection.height}
                    />
                  </Link>
                  <div className="collection-content text-center">
                    <div>
                      <Link href={`/shop-collection`} className="cls-title">
                        {" "}
                        {/* Link added directly in JSX */}
                        <h6 className="text">{collection.title}</h6>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                    </div>
                    <div className="count text-secondary">
                      {collection.count}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-lg-none sw-pagination-collection sw-dots type-circle justify-content-center spd13" />
          </Swiper>
          <div className="nav-prev-collection d-none d-lg-flex nav-sw style-line nav-sw-left space-1 snbp13">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-collection d-none d-lg-flex nav-sw style-line nav-sw-right space-1 snbn13">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
