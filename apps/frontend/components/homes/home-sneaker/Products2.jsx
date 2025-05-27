"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products59 } from "@/data/products";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
export default function Products2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center">
          <h3 className="heading wow fadeInUp">Best Sellers</h3>
          <p className="subheading wow fadeInUp">
            Fresh styles just in! Elevate your look.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-recent"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd38",
          }}
        >
          {products59.map((product, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <ProductCard1 product={product} />
            </SwiperSlide>
          ))}

          <div className="sw-pagination-recent sw-dots type-circle justify-content-center spd38" />
          <div className="sec-btn text-center">
            <Link href={`/shop-default-grid`} className="btn-line">
              View All Products
            </Link>
          </div>
        </Swiper>
      </div>
    </section>
  );
}
