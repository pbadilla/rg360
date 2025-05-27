"use client";
import { slides13 } from "@/data/heroSlides";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        loop
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2000,
        }}
        speed={2000}
        pagination={{
          clickable: true,
          el: ".spd24",
        }}
      >
        {slides13.map((slide) => (
          <SwiperSlide className="swiper-slide" key={slide.id}>
            <div className="wrap-slider">
              <Image
                src={slide.imageSrc}
                alt={slide.alt}
                className="lazyload"
                width={1920}
                height={756}
              />
              <div className="box-content type-2 type-3">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <p className="fade-item fade-item-1 fw-bold text-white title-display font-5">
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
      <div className="wrap-pagination stype-space-3">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center spd24" />
        </div>
      </div>
    </div>
  );
}
