"use client";
import { slides4 } from "@/data/heroSlides";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Hero() {
  return (
    <div className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={false}
        className="swiper tf-sw-slideshow"
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd45",
        }}
        dir="ltr"
      >
        {slides4.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="wrap-slider">
              <Image
                alt={slide.imgAlt}
                src={slide.imgSrc}
                width={slide.imgWidth}
                height={slide.imgHeight}
              />
              <div className="box-content">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <p className="fade-item fade-item-1 subheading text-btn-uppercase text-white">
                      {slide.subheading}
                    </p>
                    <div className="fade-item fade-item-2 heading text-white title-display">
                      {slide.title.split("\n").map((line, index) => (
                        <span key={index}>
                          {line}
                          {index !== slide.title.split("\n").length - 1 && (
                            <br />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="fade-item fade-item-3 box-btn-slider">
                    <Link
                      href={`/shop-default-grid`}
                      className="tf-btn btn-fill btn-white"
                    >
                      <span className="text">{slide.btnText}</span>
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
          <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center spd45" />
        </div>
      </div>
    </div>
  );
}
