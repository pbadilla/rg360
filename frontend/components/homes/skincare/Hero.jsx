"use client";

import { slides6 } from "@/data/heroSlides";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Hero() {
  return (
    <section className="tf-slideshow slider-center slider-effect-fade">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        slidesPerView={1} // data-preview={1}
        breakpoints={{
          768: { slidesPerView: 1 }, // data-tablet={1}
          480: { slidesPerView: 1 }, // data-mobile={1}
        }}
        centeredSlides={false} // data-centered="false"
        spaceBetween={0} // data-space={0}
        loop={true} // data-loop="true"
        autoplay={false} // data-auto-play="false"
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd73",
        }}
      >
        {slides6.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <Image
                alt={slide.alt}
                src={slide.imgSrc}
                width={1920}
                height={885}
              />
              <div className="box-content">
                <div className="container">
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <div
                        className="fade-item fade-item-1 heading text-white title-display"
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      />
                      <p className="fade-item fade-item-3 body-text-1 subheading text-white">
                        {slide.description}
                      </p>
                    </div>
                    <div className="fade-item fade-item-3 box-btn-slider">
                      <Link
                        href={`/shop-default-grid`} // Directly in JSX
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
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle white-circle-line justify-content-center spd73" />
        </div>
      </div>
    </section>
  );
}
