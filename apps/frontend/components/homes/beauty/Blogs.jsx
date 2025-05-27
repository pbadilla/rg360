"use client";

import { blogItems } from "@/data/blogs";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Blogs() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">News insight</h3>
          <p className="subheading text-secondary">
            Browse our Top Trending: the hottest picks loved by all.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-recent"
          spaceBetween={15}
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 3,
            },
            480: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {blogItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="wg-blog style-1 hover-image wow fadeInUp"
                data-wow-delay={item.delay}
              >
                <div className="image">
                  <Image
                    className="lazyload"
                    data-src={item.imgSrc}
                    alt=""
                    src={item.imgSrc}
                    width={450}
                    height={338}
                  />
                </div>
                <div className="content">
                  <p className="text-btn-uppercase text-secondary-2">
                    {item.date}
                  </p>
                  <div>
                    <h6 className="title fw-5">
                      <Link className="link" href={`/blog-detail/${item.id}`}>
                        {item.title}
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
