"use client";
import { products63 } from "@/data/products";
import React from "react";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function ShopGram() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Shop Instagram</h3>
          <p className="subheading text-secondary">
            Elevate your wardrobe with fresh finds today!
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-shop-gallery"
          spaceBetween={8}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd53",
          }}
        >
          {products63.map((item) => (
            <SwiperSlide className="swiper-slide" key={item.id}>
              <div
                className="gallery-item hover-overlay hover-img wow fadeInUp"
                data-wow-delay={item.wowDelay}
              >
                <div className="img-style">
                  <Image
                    className="lazyload img-hover"
                    data-src={item.imgSrc}
                    alt={item.alt}
                    src={item.imgSrc}
                    width={375}
                    height={375}
                  />
                </div>
                <Link
                  href={`/product-detail/${item.id}`} // Hardcoded link
                  className="box-icon hover-tooltip"
                >
                  <span className="icon icon-eye" />
                  <span className="tooltip">View Product</span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-gallery sw-dots type-circle justify-content-center spd53" />
        </Swiper>
      </div>
    </section>
  );
}
