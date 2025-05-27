"use client";

import { slides9 } from "@/data/heroSlides";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Hero() {
  return (
    <div className="slider-padding">
      <div className="tf-slideshow slider-default slider-position slider-effect-fade slider-radius-2">
        <Swiper
          dir="ltr"
          className="swiper tf-sw-slideshow"
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd65",
          }}
        >
          {slides9.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="wrap-slider">
                <Image
                  alt={slide.alt}
                  src={slide.imgSrc}
                  width={1841}
                  height={680}
                />
                <div className="box-content">
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <div
                        className="fade-item fade-item-1 heading title-display text-white"
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      />
                      <p className="fade-item fade-item-2 body-text-1 text-white">
                        {slide.description}
                      </p>
                    </div>
                    <div className="fade-item fade-item-3 box-btn-slider">
                      <Link
                        href={`/shop-default-grid`}
                        className="tf-btn btn-fill btn-white"
                      >
                        <span className="text">Shop Now</span>
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
            <div className="sw-dots sw-pagination-slider type-circle white-circle-line justify-content-center spd65" />
          </div>
        </div>
      </div>
    </div>
  );
}
