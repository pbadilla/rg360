"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products25 } from "@/data/products";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2({ parentClass = "flat-spacing" }) {
  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center">
          <p className="wow fadeInUp">Cushioned Running Socks</p>
          <h3 className="heading wow fadeInUp">Today's Top Picks</h3>
          <p className="subheading text-secondary wow fadeInUp">
            Browse our Top Trending: the hottest picks loved by all.
          </p>
        </div>

        <Swiper
          className="swiper tf-sw-latest"
          dir="ltr"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 15 },

            768: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 30 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd77",
          }}
        >
          {products25.map((product, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <ProductCard1 product={product} />
            </SwiperSlide>
          ))}

          <div className="sw-pagination-latest sw-dots type-circle justify-content-center spd77" />
        </Swiper>
      </div>
    </section>
  );
}
