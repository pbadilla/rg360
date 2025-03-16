"use client";

import { Swiper, SwiperSlide } from "swiper/react";

const benefits = [
  {
    icon: "icon-return",
    text: "Risk-free shopping with easy returns.",
  },
  {
    icon: "icon-shipping",
    text: "Risk-free shopping with easy returns.",
  },
  {
    icon: "icon-headset",
    text: "24/7 support, always here just for you.",
  },
  {
    icon: "icon-sealCheck",
    text: "Risk-free shopping with easy returns.",
  },
];

export default function Benefits() {
  return (
    <div className="wg-benefit">
      <div className="container">
        <Swiper
          spaceBetween={15}
          breakpoints={{
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          dir="ltr"
          className="swiper tf-sw-iconbox"
        >
          {benefits.map((benefit, index) => (
            <SwiperSlide key={index}>
              <div className="benefit-item">
                <div className="icon-box">
                  <span className={`icon ${benefit.icon}`} />
                </div>
                <p className="text-caption-1">{benefit.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
