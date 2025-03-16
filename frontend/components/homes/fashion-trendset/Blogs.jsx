"use client";
import { blogPosts2 } from "@/data/blogs";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Blogs() {
  return (
    <section>
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">News insight</h3>
          <p className="subheading text-secondary">
            Browse our Top Trending: the hottest picks loved by all.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-categories"
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            992: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd44",
          }}
        >
          {blogPosts2.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="new-item hover-img wow fadeInUp"
                data-wow-delay={item.wowDelay}
              >
                <div className="img-style">
                  <Image
                    alt={item.imgAlt}
                    src={item.imgSrc}
                    width={606}
                    height={404}
                  />
                </div>
                <div className="content">
                  <span className="text-btn-uppercase text-secondary-2">
                    {item.date}
                  </span>
                  <div className="title-box">
                    <h6 className="title">
                      <Link
                        href={`/blog-default`}
                        className="link text-line-clamp-2"
                      >
                        {item.title}
                      </Link>
                    </h6>
                    <p className="text-line-clamp-2 desc">{item.desc}</p>
                  </div>
                  <Link
                    href={`/blog-default`}
                    className="text-btn-uppercase link"
                  >
                    readmore
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-categories sw-dots type-circle justify-content-center spd44" />
        </Swiper>
      </div>
    </section>
  );
}
