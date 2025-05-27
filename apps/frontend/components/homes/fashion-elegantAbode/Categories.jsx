"use client";
import { collectionData } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
export default function Categories() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-2 wow fadeInUp">
          <h3 className="heading">Explore Collections</h3>
          <Link href={`/shop-collection`} className="btn-line py_8">
            View All Collection
          </Link>
        </div>
      </div>
      <div className="container-full slider-layout-right">
        <Swiper
          className="swiper tf-sw-collection"
          spaceBetween={15}
          loop={true}
          breakpoints={{
            1024: {
              slidesPerView: 5.1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.1,
              spaceBetween: 20,
            },
            0: {
              slidesPerView: 2.1,
              spaceBetween: 15,
            },
          }}
          dir="ltr"
        >
          {collectionData.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="collection-position-2 style-3 hover-img wow fadeInUp"
                data-wow-delay={item.delay}
              >
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={item.imageSrc}
                    alt={`banner-cls-${item.id}`}
                    src={item.imageSrc}
                    width={600}
                    height={800}
                  />
                </a>
                <div className="content">
                  <Link href={`/shop-collection`} className="cls-btn">
                    <h6 className="text">{item.title}</h6>
                    <span className="count-item text-secondary">
                      {item.itemCount} items
                    </span>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
