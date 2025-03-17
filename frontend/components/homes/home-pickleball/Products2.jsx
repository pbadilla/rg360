"use client";

import ProductCard1 from "@/components/productCards/ProductCard1";
import { products55 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
export default function Products2() {
  return (
    <section className="layout-sw-center pl-xl flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h2 className="heading text-uppercase font-4 fw-semibold">
            Best Sellers
          </h2>
          <p className="subheading text-secondary">
            Fresh styles just in! Elevate your look.
          </p>
        </div>
      </div>
      <Swiper
        dir="ltr"
        className="swiper tf-sw-categories"
        loop
        centeredSlides
        slidesPerGroupAuto
        initialSlide={2}
        spaceBetween={15}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          575: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 3.2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 5.75,
            spaceBetween: 30,
          },
        }}
      >
        {/* item 1 */}
        {products55.map((product, i) => (
          <SwiperSlide key={i} className="swiper-slide">
            <ProductCard1 isNotImageRatio product={product} />
          </SwiperSlide>
        ))}

        <div className="sec-btn text-center">
          <Link href={`/shop-default-grid`} className="btn-line">
            View All Products
          </Link>
        </div>
      </Swiper>
    </section>
  );
}
