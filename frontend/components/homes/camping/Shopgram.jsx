"use client";
import { products28 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Shopgram() {
  return (
    <section>
      <div className="container-full3">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Shop By Instagram</h3>
          <p className="subheading text-secondary">
            Elevate your wardrobe with fresh finds today!
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-shop-gallery"
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 8 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            920: { slidesPerView: 5, spaceBetween: 10 },
            1024: { slidesPerView: 6, spaceBetween: 10 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd16",
          }}
        >
          {products28.map((item, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div
                className="gallery-item hover-overlay hover-img wow fadeInUp"
                data-wow-delay={item.wowDelay}
              >
                <div className="img-style">
                  <Image
                    className="lazyload img-hover"
                    data-src={item.imgSrc}
                    alt="image-gallery"
                    src={item.imgSrc}
                    width={460}
                    height={459}
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

          <div className="sw-pagination-gallery sw-dots type-circle justify-content-center spd16" />
        </Swiper>
      </div>
    </section>
  );
}
