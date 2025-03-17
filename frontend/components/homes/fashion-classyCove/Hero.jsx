"use client";
import { slideshowItems } from "@/data/heroSlides";
import React from "react";
import { EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        modules={[EffectFade, Pagination]}
        dir="ltr"
        effect="fade"
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={false}
        centeredSlides={false}
        className="swiper tf-sw-slideshow"
        pagination={{
          clickable: true,
          el: ".spd32",
        }}
      >
        {slideshowItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="wrap-slider">
              <Image
                alt={item.alt}
                src={item.imgSrc}
                width={1920}
                height={803}
              />
              <div className="box-content">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <p className="fade-item fade-item-1 subheading text-btn-uppercase2">
                      {item.subheading}
                    </p>
                    <div
                      className="fade-item fade-item-2 heading title-display"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></div>
                  </div>
                  <div className="fade-item fade-item-3 box-btn-slider">
                    <Link
                      href={`/shop-default-grid`}
                      className="tf-btn btn-fill"
                    >
                      <span className="text">{item.btnText}</span>
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
          <div className="sw-dots sw-pagination-slider type-circle justify-content-center spd32" />
        </div>
      </div>
    </div>
  );
}
