"use client";

import { collections8 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
export default function Collections() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-2 wow fadeInUp">
          <h3>Top Collection</h3>
          <Link href={`/shop-collection`} className="btn-line">
            View All Collection
          </Link>
        </div>
        <div
          className="flat-collection-circle wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <Swiper
            slidesPerView={5}
            dir="ltr"
            className="swiper tf-sw-categories"
            spaceBetween={20}
            breakpoints={{
              1024: { slidesPerView: 5 },
              768: {
                slidesPerView: 3,
              },
              0: {
                slidesPerView: 2,
              },
            }}
            modules={[Pagination, Navigation]}
            pagination={{
              clickable: true,
              el: ".spd49",
            }}
            navigation={{
              prevEl: ".snbp10",
              nextEl: ".snbn10",
            }}
          >
            {collections8.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="collection-circle hover-img">
                  <Link href={`/shop-collection`} className="img-style">
                    <Image
                      className="lazyload"
                      data-src={item.imgSrc}
                      alt="collection-img"
                      src={item.imgSrc}
                      width={363}
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
            <div className="d-flex d-lg-none sw-pagination-categories sw-dots type-circle justify-content-center spd49" />
          </Swiper>

          <div className="nav-prev-categories d-none d-lg-flex nav-sw style-line nav-sw-left snbp10">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-categories d-none d-lg-flex nav-sw style-line nav-sw-right snbn10">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
