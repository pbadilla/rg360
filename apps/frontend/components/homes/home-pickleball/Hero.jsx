"use client";
import { slides14 } from "@/data/heroSlides";
import React from "react";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2000,
        }}
        speed={2000}
        pagination={{
          clickable: true,
          el: ".spd30",
        }}
        style={{ maxWidth: "100vw", overflow: "hidden" }}
      >
        {slides14.map((slide) => (
          <SwiperSlide className="swiper-slide" key={slide.id}>
            <div className="wrap-slider">
              <Image
                src={slide.imageSrc}
                alt={slide.alt}
                className="lazyload"
                width={1920}
                height={916}
              />
              <div className="box-content type-2">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <p className="fade-item fade-item-1 text-caption-1 text-uppercase fw-semibold text-white lh-xl-20 font-2">
                      {slide.caption}
                    </p>
                    <p
                      className="fade-item fade-item-2 fw-semibold text-white title-display-2 text-uppercase font-4"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    ></p>
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
          <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center spd30" />
        </div>
      </div>
    </div>
  );
}
