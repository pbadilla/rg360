"use client";

import { slides2 } from "@/data/heroSlides";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Hero() {
  return (
    <section className="tf-slideshow slider-style2 slider-effect-fade">
      <Swiper
        dir="ltr"
        spaceBetween={0}
        loop={true}
        autoplay={false}
        breakpoints={{
          1024: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          320: { slidesPerView: 1 },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd30",
        }}
        className="swiper tf-sw-slideshow"
      >
        {slides2.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <Image
                alt={slide.alt}
                src={slide.imgSrc}
                width={1920}
                height={803}
              />
              <div className="box-content">
                <div className="container">
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <div className="fade-item fade-item-1 heading title-display">
                        {slide.heading.split("<br/>").map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                      <p className="fade-item fade-item-2 body-text-1">
                        {slide.text}
                      </p>
                    </div>
                    <div className="fade-item fade-item-3 box-btn-slider">
                      <Link
                        href={`/shop-default-grid`}
                        className="tf-btn btn-fill"
                      >
                        <span className="text">{slide.btnText}</span>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle justify-content-center spd30" />
        </div>
      </div>
    </section>
  );
}
