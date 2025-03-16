"use client";

import { categories3 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
export default function Categories() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Popular Categories</h3>
        </div>
        <div
          className="flat-collection-circle wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <Swiper
            spaceBetween={15} // Space between slides
            slidesPerView={6} // Number of slides visible at once
            breakpoints={{
              1200: {
                slidesPerView: 6,
              },
              992: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 3,
              },
              0: {
                slidesPerView: 2,
              },
            }}
            dir="ltr"
            className="swiper tf-sw-categories"
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".snbp13",
              nextEl: ".snbn13",
            }}
            pagination={{ el: ".spd458", clickable: true }}
          >
            {categories3.map((category, index) => (
              <SwiperSlide key={index}>
                <div className="collection-circle hover-img">
                  {/* Link is added directly in JSX */}
                  <Link href={`/shop-categories-top`} className="img-style">
                    <Image
                      className="lazyload"
                      data-src={category.imgSrc}
                      alt="collection-img"
                      src={category.imgSrc}
                      width={380}
                      height={380}
                    />
                  </Link>
                  <div className="collection-content text-center">
                    <div>
                      <Link href={`/shop-categories-top`} className="cls-title">
                        <h6 className="text">{category.title}</h6>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                    </div>
                    <div className="count text-secondary">{category.count}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-lg-none sw-pagination-categories sw-dots type-circle justify-content-center spd458"></div>
          </Swiper>
          <div className="nav-prev-categories d-none d-lg-flex nav-sw style-line nav-sw-left snbp13">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-categories d-none d-lg-flex nav-sw style-line nav-sw-right snbn13">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
