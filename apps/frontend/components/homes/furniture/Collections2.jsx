"use client";

import { collections9 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Collections2() {
  return (
    <section>
      <Swiper
        slidesPerView={2}
        spaceBetween={12}
        className="swiper tf-sw-collection"
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
        dir="ltr"
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd50",
        }}
      >
        {collections9.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="banner-cls-discover rounded-0 hover-img">
              <Link href={`/shop-default-grid`} className="img-style">
                <Image
                  className="lazyload"
                  data-src={item.imgSrc}
                  alt="cls-tiktok"
                  src={item.imgSrc}
                  width={954}
                  height={636}
                />
              </Link>
              <div className="cls-content">
                <div className="box-title-top">
                  <p className="subtitle text-btn-uppercase text-white wow fadeInUp">
                    {item.subtitle}
                  </p>
                  <h3 className="title">
                    <Link
                      href={`/shop-default-grid`}
                      className="link text-white wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      {item.title}
                    </Link>
                  </h3>
                </div>
                <div className="wow fadeInUp" data-wow-delay="0.2s">
                  <Link
                    href={`/shop-default-grid`}
                    className="tf-btn btn-md btn-white"
                  >
                    <span className="text">{item.buttonText}</span>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="d-flex d-lg-none sw-pagination-collection sw-dots type-circle justify-content-center spd50" />
      </Swiper>
    </section>
  );
}
