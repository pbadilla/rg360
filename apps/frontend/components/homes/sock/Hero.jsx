"use client";
import { sliderData4 } from "@/data/heroSlides";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="tf-slideshow slideshow-effect slider-nav-sw slider-effect-fade bg-surface">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-effect"
        modules={[EffectFade, Pagination, Navigation]}
        effect="fade"
        pagination={{
          clickable: true,
          el: ".spd75",
        }}
        navigation={{
          prevEl: ".snbp15",
          nextEl: ".snbn15",
        }}
      >
        {sliderData4.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slider-effect wrap-slider">
              <div className="content-left">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 col-xl-5 col-12">
                      <div className="box-content">
                        <div className="content-slider">
                          <div className="box-title-slider">
                            <div className="fade-item fade-item-2 heading title-display">
                              {slide.title}
                            </div>
                            <p className="fade-item fade-item-2 body-text-1 desc">
                              {slide.description}
                            </p>
                          </div>
                          <div className="fade-item fade-item-3 box-btn-slider">
                            <Link
                              href={`/shop-default-grid`}
                              className="tf-btn btn-fill"
                            >
                              <span className="text">Explore Collection</span>
                              <i className="icon icon-arrowUpRight" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="img-slider">
                <Image
                  className="lazyload"
                  data-src={slide.imgSrc}
                  alt="fashion-slideshow"
                  src={slide.imgSrc}
                  width={1441}
                  height={1200}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="wrap-pagination d-block">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-square justify-content-md-start justify-content-center spd75" />
        </div>
      </div>
      <div className="nav-prev-slider nav-sw nav-sw-left lg snbp15">
        <i className="icon icon-arrLeft" />
      </div>
      <div className="nav-next-slider nav-sw nav-sw-right lg snbn15">
        <i className="icon icon-arrRight" />
      </div>
    </div>
  );
}
