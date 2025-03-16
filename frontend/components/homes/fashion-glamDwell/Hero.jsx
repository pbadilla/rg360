"use client";

import { slides5 } from "@/data/heroSlides";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="tf-slideshow slider-style2 slider-effect-fade">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow"
        spaceBetween={0} // Equivalent to data-space={0}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          768: {
            slidesPerView: 1, // Equivalent to data-tablet={1}
          },
          480: {
            slidesPerView: 1, // Equivalent to data-mobile={1}
          },
        }}
        centeredSlides={false} // Equivalent to data-centered="false"
        speed={2000}
        loop={true} // Equivalent to data-loop="true"
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Equivalent to data-auto-play="false"
        pagination={{
          clickable: true,
          el: ".spd35",
        }}
      >
        {slides5.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="wrap-slider">
              <Image
                alt={slide.alt}
                src={slide.imgSrc}
                width={1920}
                height={803}
              />
              <div className="box-content">
                <div className="container">
                  <div className="row">
                    <div className="col-xxl-6 col-md-7 col-sm-10">
                      <div className="content-slider card-box style-2">
                        <div className="box-title-slider">
                          <div className="fade-item fade-item-1 heading title-display">
                            {slide.title}
                          </div>
                          <p className="fade-item fade-item-2 body-text-1">
                            {slide.description}
                          </p>
                        </div>
                        <div className="fade-item fade-item-3 box-btn-slider">
                          {/* Link is added directly in JSX */}
                          <Link
                            href={`/shop-default-grid`}
                            className="tf-btn btn-fill"
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
          <div className="sw-dots sw-pagination-slider type-circle justify-content-center spd35" />
        </div>
      </div>
    </section>
  );
}
