"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import LookbookProduct from "@/components/common/LookbookProduct";
import { lookbookProducts } from "@/data/products";
export default function Lookbook() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center">
          <h3 className="heading">Trendsetters' Lookbook</h3>
          <p className="subheading text-secondary">
            Discover the latest trends and classic styles in our Fashion Forward{" "}
            <br />
            Lookbook. Elevate your style today!
          </p>
        </div>
        <Swiper
          className="swiper tf-sw-lookbook sw-lookbook-wrap"
          dir="ltr"
          spaceBetween={15} // Default space
          loop={true}
          breakpoints={{
            1024: {
              slidesPerView: 2, // equivalent to data-preview={2}
              spaceBetween: 30, // equivalent to data-space-lg={30}
            },
            768: {
              slidesPerView: 2, // equivalent to data-tablet={2}
              spaceBetween: 30, // equivalent to data-space-md={30}
            },
            0: {
              slidesPerView: 1, // equivalent to data-mobile={1}
              spaceBetween: 15, // equivalent to data-space={15}
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd340",
            clickable: true,
          }}
        >
          <SwiperSlide className="swiper-slide">
            <div className="hover-img cls-lookbook">
              <a href="#" className="img-style rounded-0">
                <Image
                  className="lazyload aspect-ratio-1"
                  data-src="/images/banner/banner-lookbook-sm1.jpg"
                  alt="banner-cls"
                  src="/images/banner/banner-lookbook-sm1.jpg"
                  width={960}
                  height={1200}
                />
              </a>
              <div className="lookbook-item position1">
                <div className="dropup-center dropup">
                  <div
                    role="dialog"
                    className="tf-pin-btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span />
                  </div>
                  <div className="dropdown-menu">
                    <LookbookProduct
                      styleClass=""
                      product={lookbookProducts[4]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="hover-img cls-lookbook">
              <a href="#" className="img-style rounded-0">
                <Image
                  className="lazyload aspect-ratio-1"
                  data-src="/images/banner/banner-lookbook-sm2.jpg"
                  alt="banner-cls"
                  src="/images/banner/banner-lookbook-sm2.jpg"
                  width={945}
                  height={945}
                />
              </a>
              <div className="lookbook-item position2">
                <div className="dropup-center dropup">
                  <div
                    role="dialog"
                    className="tf-pin-btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span />
                  </div>
                  <div className="dropdown-menu">
                    <LookbookProduct
                      styleClass=""
                      product={lookbookProducts[5]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <div className="sw-pagination-lookbook sw-dots type-circle justify-content-center spd340 d-lg-none" />
        </Swiper>
      </div>
    </section>
  );
}
