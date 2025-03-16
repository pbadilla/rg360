"use client";
import { blogs } from "@/data/blogs";
import Link from "next/link";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Blogs() {
  return (
    <section className="flat-spacing">
      <div className="container container-3">
        <div className="heading-section-4 style-2 wow fadeInUp">
          <h3 className="fw-7 font-5">News &amp; Reviews</h3>
          <Link href={`/shop-collection`} className="btn-line">
            View All Products
          </Link>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-collection"
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1.7,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd23",
          }}
        >
          {blogs.map((collection) => (
            <SwiperSlide className="swiper-slide" key={collection.id}>
              <div
                className="collection-position-2 style-5 has-overlay hover-img wow fadeInUp"
                data-wow-delay={collection.delay}
              >
                <Link href={`/shop-default-grid`} className="img-style">
                  <Image
                    className="lazyload"
                    data-src={collection.imageSrc}
                    alt="banner-cls"
                    src={collection.imageSrc}
                    width={675}
                    height={900}
                  />
                </Link>
                <div className="content text-start">
                  <span className="text-btn-uppercase text-white">
                    {collection.date}
                  </span>
                  <h4 className="title">
                    <Link
                      href={`/shop-default-grid`}
                      className="link text-white"
                    >
                      {collection.title}
                    </Link>
                  </h4>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-pagination-collection sw-dots type-circle justify-content-center spd23" />
        </Swiper>
      </div>
    </section>
  );
}
