"use client";
import { collectionData3 } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Collections() {
  return (
    <section>
      <Swiper
        dir="ltr"
        slidesPerView={3} // equivalent to data-preview={3}
        breakpoints={{
          1024: {
            slidesPerView: 3, // equivalent to data-tablet={2}
          },
          768: {
            slidesPerView: 2, // equivalent to data-mobile={1}
          },
          0: {
            slidesPerView: 1, // equivalent to data-mobile={1}
          },
        }}
        spaceBetween={8} // equivalent to data-space={8}
        className="swiper tf-sw-collection"
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd74",
        }}
      >
        {collectionData3.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="collection-position-2 style-lg hover-img">
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src={item.imgSrc}
                  alt={item.alt}
                  src={item.imgSrc}
                  width={951}
                  height={1194}
                />
              </a>
              <div className="content">
                <div>
                  <Link
                    href={`/shop-collection`}
                    className="cls-btn wmax mx-auto"
                  >
                    <h4 className="text">{item.title}</h4>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-pagination-collection sw-dots type-circle justify-content-center spd74" />
      </Swiper>
    </section>
  );
}
