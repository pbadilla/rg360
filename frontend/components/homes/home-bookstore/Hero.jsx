"use client";
import { sliderItems } from "@/data/heroSlides";
import Link from "next/link";
import React from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        autoplay={{
          delay: 2000,
        }}
        loop
        modules={[Navigation, Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={2000}
        navigation={{
          prevEl: ".snbp12",
          nextEl: ".snbn12",
        }}
        pagination={{
          clickable: true,
          el: ".spd12",
        }}
      >
        {sliderItems.map((item) => (
          <SwiperSlide key={item.id} className="swiper-slide">
            <div className="wrap-slider">
              <Image
                className="lazyload"
                data-src={item.imageSrc}
                alt="fashion-slideshow"
                src={item.imageSrc}
                width={item.width}
                height={item.height}
              />
              <div className="box-content type-2">
                <div className="content-slider gap-lg-40">
                  <div className="box-title-slider">
                    <div className="fade-item fade-item-1 heading title-display text-white">
                      {item.title}
                    </div>
                    <p className="fade-item fade-item-2 body-text-1 text-white">
                      {item.description}
                    </p>
                  </div>
                  <div className="fade-item fade-item-3 box-btn-slider">
                    <Link
                      href={`/shop-default-grid`} // Link added directly in JSX
                      className="tf-btn btn-fill btn-white"
                    >
                      <span className="text">Explore Collection</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="navigation-prev-slider nav-sw nav-sw-left lg snbp12">
          <i className="icon icon-arrLeft" />
        </div>
        <div className="navigation-next-slider nav-sw nav-sw-right lg snbn12">
          <i className="icon icon-arrRight" />
        </div>
      </Swiper>
      <div className="wrap-pagination stype-space-3">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle white-circle-line justify-content-center spd12" />
        </div>
      </div>
    </section>
  );
}
