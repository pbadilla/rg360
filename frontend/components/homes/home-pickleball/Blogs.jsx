"use client";
import { blogPosts8 } from "@/data/blogs";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
export default function Blogs() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center">
          <h2 className="heading wow fadeInUp font-4 text-uppercase fw-semibold">
            News insight
          </h2>
          <p className="subheading wow fadeInUp">
            Browse our Top Trending: the hottest picks loved by all.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-latest"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd33",
          }}
        >
          {blogPosts8.map((post) => (
            <SwiperSlide className="swiper-slide" key={post.id}>
              <div
                className="wg-blog style-1 hover-image wow fadeInUp"
                data-wow-delay={post.delay}
              >
                <div className="image">
                  <Image
                    className="lazyload"
                    data-src={post.imageSrc}
                    alt={post.alt}
                    src={post.imageSrc}
                    width={615}
                    height={461}
                  />
                </div>
                <div className="content">
                  <p className="text-btn-uppercase text-secondary-2">
                    {post.date}
                  </p>
                  <div>
                    <h6 className="title fw-5">
                      <Link className="link" href={`/blog-detail/${post.id}`}>
                        {post.title}
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-pagination-latest sw-dots type-circle justify-content-center spd33" />
        </Swiper>
      </div>
    </section>
  );
}
