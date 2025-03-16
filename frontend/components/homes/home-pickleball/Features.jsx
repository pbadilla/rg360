"use client";

import { iconboxItems } from "@/data/features";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <section className={"flat-spacing-9 bg-main"}>
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-sw-iconbox"
          spaceBetween={15}
          breakpoints={{
            1200: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            576: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd3",
          }}
        >
          {iconboxItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="tf-icon-box style-2">
                <div className="icon-box line-2">
                  <span className={`icon text-white ${item.icon}`} />
                </div>
                <div className="content">
                  <h6 className="text-white">{item.title}</h6>
                  <p className="text-secondary-2">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-iconbox spd3 sw-dots type-circle justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
