"use client";

import { slideData } from "@/data/heroSlides";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
export default function Hero() {
  return (
    <div className="tf-slideshow slider-style2 slider-position slider-nav-sw slider-pos-nav slider-effect-fade">
      <Swiper
        dir="ltr"
        spaceBetween={0}
        loop={true}
        breakpoints={{
          768: {
            spaceBetween: 10,
          },
          1024: {
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
          el: ".spd14",
        }}
        navigation={{
          prevEl: ".snbp6",
          nextEl: ".snbn6",
        }}
        className="swiper tf-sw-slideshow"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <Image
                alt="slideshow"
                src={slide.imgSrc}
                width={1921}
                height={680}
              />
              <div className="box-content">
                <div className="container">
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <div
                        className="fade-item fade-item-1 title-display heading text-white"
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      ></div>
                      <p className="fade-item fade-item-2 body-text-1 text-white">
                        {slide.description}
                      </p>
                    </div>
                    <div className="fade-item fade-item-3 box-btn-slider">
                      <Link
                        href={`/shop-default-grid`}
                        className="tf-btn btn-fill btn-white"
                      >
                        <span className="text">Explore Collection</span>
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
      <div className="wrap-pagination d-block">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-square white-square justify-content-center spd14" />
        </div>
      </div>
      <div className="navigation-prev-slider nav-sw nav-sw-left lg snbp6">
        <i className="icon icon-arrLeft" />
      </div>
      <div className="navigation-next-slider nav-sw nav-sw-right lg snbn6">
        <i className="icon icon-arrRight" />
      </div>
    </div>
  );
}
