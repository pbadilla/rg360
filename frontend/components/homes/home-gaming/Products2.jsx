"use client";

import ProductCard1 from "@/components/productCards/ProductCard1";
import { products53 } from "@/data/products";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
export default function Products2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-2 type-2 wow fadeInUp">
          <h3 className="heading font-5 fw-bold">Features Product</h3>
          <Link href={`/shop-collection`} className="btn-line">
            View All Products
          </Link>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-collection"
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
          spaceBetween={15}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd27",
          }}
        >
          {products53.map((product, i) => (
            <SwiperSlide className="swiper-slide" key={i}>
              <ProductCard1 isNotImageRatio product={product} />
            </SwiperSlide>
          ))}

          <div className="sw-pagination-collection sw-dots type-circle justify-content-center spd27" />
        </Swiper>
      </div>
    </section>
  );
}
