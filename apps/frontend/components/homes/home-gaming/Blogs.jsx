"use client";
import { blogPosts7 } from "@/data/blogs";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
export default function Blogs() {
  return (
    <section>
      <div className="container">
        <div className="heading-section-2 align-items-center type-2 wow fadeInUp">
          <h3 className="heading font-5 fw-bold">News &amp; Reviews</h3>
          <Link href={`/shop-collection`} className="btn-line">
            View All
          </Link>
        </div>
        <Swiper
          className="swiper tf-sw-partner"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd29",
          }}
          dir="ltr"
        >
          {blogPosts7.map((post) => (
            <SwiperSlide className="swiper-slide" key={post.id}>
              <div
                className="wg-blog style-abs hover-image wow fadeInUp"
                data-wow-delay={post.delay}
              >
                <Link href={`/blog-detail/${post.id}`} className="image">
                  <Image
                    className="lazyload"
                    data-src={post.imageSrc}
                    alt={post.alt}
                    src={post.imageSrc}
                    width={630}
                    height={472}
                  />
                </Link>
                <div className="content">
                  <p className="text-btn-uppercase text-secondary-2 text-white">
                    {post.date}
                  </p>
                  <h4 className="title fw-5">
                    <Link
                      className="link text-white"
                      href={`/blog-detail/${post.id}`}
                    >
                      {post.title}
                    </Link>
                  </h4>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-pagination-partner sw-dots type-circle justify-content-center spd29" />
        </Swiper>
      </div>
    </section>
  );
}
