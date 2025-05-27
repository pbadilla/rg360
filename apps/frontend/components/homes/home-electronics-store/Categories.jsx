"use client";
import { collections16 } from "@/data/collections";
import Link from "next/link";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Categories() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading font-5 fw-bold">Shop By Categories</h3>
          <p className="subheading text-secondary">
            Our customers adore our products, and we constantly aim to delight
            them.
          </p>
        </div>
        <div className="flat-collection-circle">
          <Swiper
            dir="ltr"
            className="swiper tf-sw-recent"
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 2 },
              575: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true,
              el: ".spd20",
            }}
            navigation={{
              prevEl: ".snbp20",
              nextEl: ".snbn20",
            }}
          >
            {collections16.map((collection) => (
              <SwiperSlide key={collection.id} className="swiper-slide">
                <div className="collection-position-2 style-8 hover-img">
                  <a className="img-style">
                    <Image
                      className="lazyload"
                      data-src={collection.imageSrc}
                      alt="electronic-cls"
                      src={collection.imageSrc}
                      width={collection.width}
                      height={collection.height}
                    />
                  </a>
                  <div className="top">
                    <h5 className="font-5 fw-7 mb_4">{collection.title}</h5>
                    <p className="text-secondary">{collection.productCount}</p>
                  </div>
                  <div className="content d-flex justify-content-center">
                    <Link
                      href={`/shop-default-grid`} // Link added directly in JSX
                      className="btn-style-6 wow fadeInUp text-button"
                    >
                      <span className="text">Shop Now</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="sw-pagination-recent sw-dots type-circle justify-content-center spd20" />
          </Swiper>
          <div className="nav-next-recent d-none d-lg-flex nav-sw style-line nav-sw-left space-2 snbp20">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-prev-recent d-none d-lg-flex nav-sw style-line nav-sw-right space-2 snbn20">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
