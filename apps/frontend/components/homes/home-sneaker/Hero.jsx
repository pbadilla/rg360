"use client";
import { slides15 } from "@/data/heroSlides";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        modules={[Pagination, Autoplay]}
        autoplay
        loop
        pagination={{
          clickable: true,
          el: ".spd35",
        }}
      >
        {slides15.map((slide) => (
          <SwiperSlide className="swiper-slide" key={slide.id}>
            <div className="wrap-slider">
              <Image
                src={slide.imageSrc}
                alt={slide.alt}
                className="lazyload"
                width={1920}
                height={790}
              />
              <div className="box-content type-2 type-3">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <p className="fade-item fade-item-1 fw-medium text-white title-display">
                      {slide.title}
                    </p>
                    <p className="fade-item fade-item-2 body-text-1 text-white">
                      {slide.description}
                    </p>
                  </div>
                  <div className="fade-item fade-item-3 box-btn-slider">
                    <Link
                      href={`/shop-default-grid`}
                      className="tf-btn btn-fill btn-white"
                    >
                      <span className="text">{slide.buttonText}</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center spd35" />
        </div>
      </div>
    </div>
  );
}
