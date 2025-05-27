"use client";
import { sliderItems2 } from "@/data/heroSlides";
import Link from "next/link";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
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
          el: ".spd19",
        }}
      >
        {sliderItems2.map((item) => (
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
              <div className="box-content type-3">
                <div className="container">
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <div className="tag fade-item fade-item-1 text-btn-uppercase text-primary">
                        {item.tag}
                      </div>
                      <div
                        className="fade-item fade-item-2 heading title-display font-5 fw-7"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      ></div>
                      <p
                        className="fade-item fade-item-3 body-text-1"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                    </div>
                    <div className="fade-item fade-item-4 box-btn-slider">
                      <Link
                        href={`/shop-default-grid`} // Link added directly in JSX
                        className="tf-btn btn-fill"
                      >
                        <span className="text">Shop Now</span>
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
      <div className="wrap-pagination d-block stype-space-3">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-square justify-content-center spd19" />
        </div>
      </div>
    </section>
  );
}
