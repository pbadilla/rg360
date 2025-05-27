"use client";
import { collections18 } from "@/data/collections";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Collections() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-sw-collection"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1.7,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 45,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd50",
          }}
        >
          {collections18.map((collection) => (
            <SwiperSlide className="swiper-slide" key={collection.id}>
              <div
                className="collection-default abs-left-center rounded-0 hover-img wow fadeInUp"
                data-wow-delay={collection.wowDelay}
              >
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={collection.imgSrc}
                    alt={collection.alt}
                    src={collection.imgSrc}
                    width={600}
                    height={376}
                  />
                </a>
                <div className="content text-start">
                  <div className="box-title">
                    <h4 className="title">
                      <Link
                        href={`/shop-default-grid`} // Hardcoded link
                        className={`link ${
                          collection.textWhite ? "text-white" : ""
                        }`}
                      >
                        {collection.title}
                      </Link>
                    </h4>
                    <p className={collection.textWhite ? "text-white" : ""}>
                      {collection.description}
                    </p>
                  </div>
                  <div className="box-btn">
                    <Link
                      href={`/shop-default-grid`}
                      className={collection.btnClass}
                    >
                      {" "}
                      {/* Hardcoded link */}
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-collection sw-dots type-circle justify-content-center spd50" />
        </Swiper>
      </div>
    </section>
  );
}
