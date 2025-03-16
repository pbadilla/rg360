"use client";

import { products20 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function ShopGram() {
  return (
    <section>
      <div className="container-full2">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Shop Instagram</h3>
          <p className="subheading text-secondary">
            Elevate your wardrobe with fresh finds today!
          </p>
        </div>
        <Swiper
          dir="ltr"
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 8 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            920: { slidesPerView: 5, spaceBetween: 10 },
            1024: { slidesPerView: 6, spaceBetween: 10 },
          }}
          className="swiper tf-sw-shop-gallery"
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd11",
          }}
        >
          {products20.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="gallery-item hover-overlay hover-img wow fadeInUp"
                data-wow-delay={item.wowDelay}
              >
                <div className="img-style">
                  <Image
                    className="lazyload img-hover"
                    data-src={item.imgSrc}
                    src={item.imgSrc}
                    alt={item.alt}
                    width={592}
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
          <div className="sw-pagination-gallery sw-dots type-circle justify-content-center spd11" />
        </Swiper>
      </div>
    </section>
  );
}
