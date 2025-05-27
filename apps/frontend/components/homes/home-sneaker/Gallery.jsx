"use client";
import { products60 } from "@/data/products";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
export default function Gallery() {
  return (
    <section className="py_20 pt-0">
      <div className="container-full4">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Follow us on instagram</h3>
          <p className="subheading text-secondary">@Modave</p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-shop-gallery"
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd40",
          }}
          spaceBetween={8}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {products60.map((item) => (
            <SwiperSlide className="swiper-slide" key={item.id}>
              <div
                className="gallery-item radius-16 hover-overlay hover-img wow fadeInUp"
                data-wow-delay={item.delay}
              >
                <div className="img-style">
                  <Image
                    className="lazyload img-hover"
                    data-src={item.imgSrc}
                    alt={item.alt}
                    src={item.imgSrc}
                    width={item.width}
                    height={item.height}
                  />
                </div>
                <Link
                  href={`/product-detail/${item.id}`}
                  className="box-icon hover-tooltip"
                >
                  <span className="icon icon-eye" />
                  <span className="tooltip">View Product</span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-gallery sw-dots type-circle justify-content-center spd40" />
        </Swiper>
      </div>
    </section>
  );
}
