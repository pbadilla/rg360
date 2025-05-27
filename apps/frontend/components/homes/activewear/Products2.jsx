"use client";
import Link from "next/link";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products18 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function Products2() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Trendy Collection</h3>
          <p className="subheading text-secondary">
            Fresh styles just in! Elevate your look.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-recent"
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 15 },

            768: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 30 },
          }}
          spaceBetween={15}
          modules={[Pagination]}
          pagination={{ el: ".spd561", clickable: true }}
        >
          {products18.slice(4).map((product, i) => (
            <SwiperSlide key={i}>
              <ProductCard1 product={product} />
            </SwiperSlide>
          ))}

          <div className="sw-pagination-recent sw-dots type-circle justify-content-center spd561" />
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
