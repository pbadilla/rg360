"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { products } from "@/data/products";
import ProductCard1 from "../productCards/ProductCard1";
export default function RelatedProducts() {
  return (
    <section className="flat-spacing">
      <div className="container flat-animate-tab">
        <ul
          className="tab-product justify-content-sm-center wow fadeInUp"
          data-wow-delay="0s"
          role="tablist"
        >
          <li className="nav-tab-item" role="presentation">
            <a href="#ralatedProducts" className="active" data-bs-toggle="tab">
              Ralated Products
            </a>
          </li>
          <li className="nav-tab-item" role="presentation">
            <a href="#recentlyViewed" data-bs-toggle="tab">
              Recently Viewed
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className="tab-pane active show"
            id="ralatedProducts"
            role="tabpanel"
          >
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
                el: ".spd4",
              }}
            >
              {products.slice(0, 4).map((product, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <ProductCard1 product={product} />
                </SwiperSlide>
              ))}

              <div className="sw-pagination-latest spd4  sw-dots type-circle justify-content-center" />
            </Swiper>
          </div>
          <div className="tab-pane" id="recentlyViewed" role="tabpanel">
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
                el: ".spd5",
              }}
            >
              {products.slice(4).map((product, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <ProductCard1 product={product} />
                </SwiperSlide>
              ))}

              <div className="sw-pagination-latest spd5  sw-dots type-circle justify-content-center" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
