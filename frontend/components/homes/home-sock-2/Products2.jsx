"use client";

import ProductCard1 from "@/components/productCards/ProductCard1";
import { products62 } from "@/data/products";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-2 wow fadeInUp align-items-center">
          <h3 className="heading">Best Seller</h3>
          <Link href={`/shop-collection`} className="btn-line">
            View All Collection
          </Link>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-products"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          spaceBetween={15}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd52",
          }}
        >
          {products62.map((product, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <ProductCard1 product={product} />
            </SwiperSlide>
          ))}

          <div className="sw-pagination-products sw-dots type-circle justify-content-center spd52" />
        </Swiper>
      </div>
    </section>
  );
}
