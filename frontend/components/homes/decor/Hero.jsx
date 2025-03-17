"use client";

import { sliderData2 } from "@/data/heroSlides";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Hero() {
  return (
    <section className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd19",
        }}
        dir="ltr"
        className="swiper tf-sw-slideshow"
      >
        {sliderData2.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <Image
                alt="fashion-slideshow"
                src={slide.image}
                width={1920}
                height={803}
              />
              <div className="box-content">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <div className="fade-item fade-item-1 heading title-display text-white">
                      {slide.title}
                    </div>
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
          <div className="sw-dots sw-pagination-slider type-circle white-circle-line justify-content-center spd19" />
        </div>
      </div>
    </section>
  );
}
