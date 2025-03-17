"use client";
import { products23 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function ShopGram() {
  return (
    <section>
      <div className="container-full2">
        <Swiper
          className="tf-sw-shop-gallery"
          breakpoints={{
            1024: {
              slidesPerView: 6,
            },
            768: {
              slidesPerView: 4,
            },
            480: {
              slidesPerView: 2,
            },
          }}
          spaceBetween={8}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd68",
          }}
        >
          {products23.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="gallery-item hover-overlay hover-img wow fadeInUp"
                data-wow-delay={item.delay}
              >
                <div className="img-style">
                  <Image
                    className="lazyload img-hover"
                    data-src={item.imgSrc}
                    alt={item.alt}
                    src={item.imgSrc}
                    width={593}
                    height={592}
                  />
                </div>
                <Link
                  href={`/product-detail/${item.id}`}
                  className="box-icon hover-tooltip"
                >
                  <span className="icon icon-eye" />
                  <span className="tooltip">View Product</span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-gallery sw-dots type-circle justify-content-center spd68" />
        </Swiper>
      </div>
    </section>
  );
}
