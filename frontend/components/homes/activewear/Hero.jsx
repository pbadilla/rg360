"use client";

import { slidesData4 } from "@/data/heroSlides";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
export default function Hero() {
  return (
    <div className="slider-padding">
      <div className="tf-slideshow slider-default slider-effect-fade slider-position slider-nav-sw slider-radius-1">
        <Swiper
          spaceBetween={15}
          dir="ltr"
          className="swiper tf-sw-slideshow"
          breakpoints={{
            768: {
              spaceBetween: 0,
            },
          }}
          loop={false}
          autoplay={false}
          centeredSlides={false}
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            el: ".spd9",
          }}
          navigation={{
            prevEl: ".snbp4",
            nextEl: ".snbn4",
          }}
        >
          {slidesData4.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="wrap-slider slider-group">
                {slide.images.map((image, idx) => (
                  <Image
                    key={idx}
                    alt="fashion-slideshow"
                    src={image}
                    width={910}
                    height={780}
                  />
                ))}
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
                        href={`/shop-default-grid`} // Directly adding the link here
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
            <div className="sw-dots sw-pagination-slider type-circle white-circle-line justify-content-center spd9" />
          </div>
        </div>
        <div className="navigation-prev-slider nav-sw nav-sw-left lg snbp4">
          <i className="icon icon-arrLeft" />
        </div>
        <div className="navigation-next-slider nav-sw nav-sw-right lg snbn4">
          <i className="icon icon-arrRight" />
        </div>
      </div>
    </div>
  );
}
