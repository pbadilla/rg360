"use client";
import { slidesData } from "@/data/heroSlides";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Hero() {
  return (
    <section className="tf-slideshow slider-style2 slider-effect-fade">
      <Swiper
        className="swiper tf-sw-slideshow"
        centeredSlides={false}
        spaceBetween={0}
        loop={true}
        autoplay={false}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd33",
        }}
        dir="ltr"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="wrap-slider">
              <Image
                alt="fashion-slideshow"
                src={slide.imageSrc}
                width={1920}
                height={803}
              />
              <div className="box-content">
                <div className="container">
                  <div className="row">
                    <div className="col-md-7 col-sm-10">
                      <div className="content-slider card-box bg-main">
                        <div className="box-title-slider">
                          <div
                            className="fade-item fade-item-1 heading title-display text-white"
                            dangerouslySetInnerHTML={{
                              __html: slide.heading,
                            }}
                          />
                          <p className="fade-item fade-item-2 body-text-1 text-white">
                            {slide.description}
                          </p>
                        </div>
                        <div className="fade-item fade-item-3 box-btn-slider">
                          {/* Adding the link directly here */}
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
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle justify-content-center spd33" />
        </div>
      </div>
    </section>
  );
}
