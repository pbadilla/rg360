"use client";

import ProductCard1 from "@/components/productCards/ProductCard1";
import { products22 } from "@/data/products";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Today's Top Picks</h3>
          <p className="subheading text-secondary">
            Fresh styles just in! Elevate your look.
          </p>
        </div>
        <Swiper
          spaceBetween={15}
          slidesPerView="auto"
          breakpoints={{
            1200: { slidesPerView: 5 },
            992: { slidesPerView: 3 },
            0: { slidesPerView: 2 },
          }}
          className="swiper tf-sw-latest"
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd67",
          }}
          dir="ltr"
        >
          {products22.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard1 product={product} />
            </SwiperSlide>
          ))}
          <div className="sw-pagination-latest sw-dots type-circle justify-content-center spd67" />
        </Swiper>
      </div>
    </section>
  );
}
