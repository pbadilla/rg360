"use client";
import { slides16 } from "@/data/heroSlides";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-style2 slider-effect-fade">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        loop
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd41",
        }}
      >
        {slides16.map((slide) => (
          <SwiperSlide className="swiper-slide" key={slide.id}>
            <div className="wrap-slider">
              <Image
                alt={slide.alt}
                src={slide.imageSrc}
                width={slide.width}
                height={slide.height}
              />
              <div className="box-content">
                <div className="container">
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <div
                        className="fade-item fade-item-1 heading title-display"
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      ></div>
                      <p className="fade-item fade-item-2 body-text-1">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination stype-space-2">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle justify-content-center spd41" />
        </div>
      </div>
    </section>
  );
}
