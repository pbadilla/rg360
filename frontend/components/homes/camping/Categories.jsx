"use client";

import { collectionData4 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
export default function Categories() {
  return (
    <section className="flat-spacing-2">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Popular Categories</h3>
          <p className="subheading">Fresh styles just in! Elevate your look.</p>
        </div>
        <div
          className="flat-collection-circle wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <Swiper
            dir="ltr"
            slidesPerView={5} // Matches `data-preview="5"`
            spaceBetween={15} // Matches `data-space="15"`
            breakpoints={{
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              }, // Matches `data-space-lg="20"` and `data-pagination-lg="1"`
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              }, // Matches `data-tablet="3"` and `data-space-md="20"`
              576: { slidesPerView: 3 }, // Matches `data-mobile="2"`
              0: { slidesPerView: 2 }, // Matches `data-mobile="2"`
            }}
            modules={[Pagination, Navigation]}
            pagination={{
              clickable: true,
              el: ".spd13",
            }}
            navigation={{
              prevEl: ".snbp5",
              nextEl: ".snbn5",
            }}
          >
            {collectionData4.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="collection-circle hover-img">
                  <Link href={`/shop-categories-top`} className="img-style">
                    <Image
                      className="lazyload"
                      data-src={item.imgSrc}
                      alt="collection-img"
                      src={item.imgSrc}
                      width={364}
                      height={363}
                    />
                  </Link>
                  <div className="collection-content text-center">
                    <div>
                      <Link href={`/shop-collection`} className="cls-title">
                        <h6 className="text">{item.title}</h6>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                    </div>
                    <div className="count text-secondary">{item.count}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-lg-none sw-pagination-collection sw-dots type-circle justify-content-center spd13" />
          </Swiper>
          <div className="nav-prev-collection d-none d-lg-flex nav-sw style-line nav-sw-left snbp5">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-collection d-none d-lg-flex nav-sw style-line nav-sw-right snbn5">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
