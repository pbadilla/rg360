"use client";

import { galleryItems } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
export default function Collections() {
  const { setQuickViewItem } = useContextElement();
  return (
    <section>
      <Swiper
        dir="ltr"
        centeredSlides={true}
        loop={true}
        slidesPerView={4}
        breakpoints={{
          1300: {
            slidesPerView: 4,
          },
          968: {
            slidesPerView: 3.7,
          },
          668: {
            slidesPerView: 2.7,
          },
          0: {
            slidesPerView: 1.2,
          },
        }}
        spaceBetween={10}
      >
        {galleryItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="gallery-item rounded-0 hover-overlay hover-img">
              <div className="img-style">
                <Image
                  className="lazyload img-hover"
                  data-src={item.imgSrc}
                  alt={item.alt}
                  src={item.imgSrc}
                  width={708}
                  height={709}
                />
              </div>
              <div className="gallery-content">
                <a href="#" className="cls-btn">
                  <h6 className="text">{item.text}</h6>
                  <i className="icon icon-arrowUpRight" />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
