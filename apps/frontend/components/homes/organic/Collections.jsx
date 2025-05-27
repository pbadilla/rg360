"use client";

import { collectionItems5 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Collections() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <Swiper
          dir="ltr"
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            1200: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1.7,
            },
          }}
          className="swiper tf-sw-collection"
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd64",
          }}
        >
          {collectionItems5.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="collection-position-2 style-5 style-7 hover-img wow fadeInUp"
                data-wow-delay={item.delay}
              >
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={item.imgSrc}
                    alt={item.alt}
                    src={item.imgSrc}
                    width={616}
                    height={819}
                  />
                </a>
                <div className="content">
                  <span className="text-title text-white">{item.title}</span>
                  <h4 className="title">
                    <Link href={`/shop-collection`} className="link text-white">
                      {item.description}
                    </Link>
                  </h4>
                  <div>
                    <Link
                      href={`/shop-collection`}
                      className="btn-line style-white"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-collection sw-dots type-circle justify-content-center spd64" />
        </Swiper>
      </div>
    </section>
  );
}
