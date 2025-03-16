"use client";

import { sliderData3 } from "@/data/heroSlides";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
export default function Hero() {
  return (
    <div className="tf-slideshow slider-default slider-position slider-effect-fade">
      <Swiper
        slidesPerView={1} // data-preview
        breakpoints={{
          768: {
            slidesPerView: 1, // data-tablet
          },
          480: {
            slidesPerView: 1, // data-mobile
          },
        }}
        spaceBetween={0} // data-space
        loop={false} // data-loop
        autoplay={false} // data-auto-play
        centeredSlides={false} // data-centered
        dir="ltr"
        className="swiper tf-sw-slideshow"
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
          el: ".spd51",
        }}
        navigation={{
          prevEl: ".snbp11",
          nextEl: ".snbn11",
        }}
      >
        {sliderData3.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <Image
                alt="fashion-slideshow"
                src={slide.imgSrc}
                width={1920}
                height={800}
              />
              <div className="box-content">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <h1 className="fade-item fade-item-1 heading text-white">
                      {slide.title}
                    </h1>
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
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle white-circle-line justify-content-center spd51" />
        </div>
      </div>
      <div className="navigation-prev-slider nav-sw nav-sw-left lg snbp11">
        <i className="icon icon-arrLeft" />
      </div>
      <div className="navigation-next-slider nav-sw nav-sw-right lg snbn11">
        <i className="icon icon-arrRight" />
      </div>
    </div>
  );
}
