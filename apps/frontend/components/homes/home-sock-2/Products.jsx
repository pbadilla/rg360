"use client";

import ProductCard1 from "@/components/productCards/ProductCard1";
import { products61 } from "@/data/products";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-4 wow fadeInUp align-items-center">
          <h3 className="heading">Features Product</h3>
          <Link href={`/shop-collection`} className="btn-line">
            View All Collection
          </Link>
        </div>
        <Swiper
          spaceBetween={15}
          dir="ltr"
          className="swiper tf-sw-latest"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd42",
          }}
        >
          {products61.map((product, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <ProductCard1 product={product} />
            </SwiperSlide>
          ))}

          <div className="sw-pagination-latest sw-dots type-circle justify-content-center spd42" />
        </Swiper>
      </div>
    </section>
  );
}
