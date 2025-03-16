"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products21 } from "@/data/products";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products1() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Deal of the day</h3>
          <p className="subheading text-secondary">
            Fresh styles just in! Elevate your look.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-recent"
          slidesPerView={4}
          spaceBetween={30}
          breakpoints={{
            1200: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 3,
            },
            0: {
              slidesPerView: 2,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd66",
          }}
        >
          {products21.map((product, i) => (
            <SwiperSlide key={i}>
              <ProductCard1 product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-pagination-recent sw-dots type-circle justify-content-center spd66" />
        </Swiper>
      </div>
    </section>
  );
}
