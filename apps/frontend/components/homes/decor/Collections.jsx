"use client";

import { collections7 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "swiper/modules";
export default function Collections() {
  return (
    <section className="flat-spacing">
      <div className="container-full2">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Shop by Collections</h3>
          <p className="subheading">
            Browse our Top Trending: the hottest picks loved by all.
          </p>
        </div>
        <div className="flat-sw-navigation wow fadeInUp" data-wow-delay="0.1s">
          <Swiper
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="swiper tf-sw-collection"
            modules={[Navigation]}
            navigation={{
              prevEl: ".snbp7",
              nextEl: ".snbn7",
            }}
            dir="ltr"
          >
            {collections7.map((collection, index) => (
              <SwiperSlide key={index}>
                <div className="collection-position-2 style-7 hover-img">
                  <Link href={`/shop-collection`} className="img-style">
                    <Image
                      className="lazyload"
                      data-src={collection.imgSrc}
                      alt={`banner-cls-${index + 1}`}
                      src={collection.imgSrc}
                      width={657}
                      height={875}
                    />
                  </Link>
                  <div className="content text-center">
                    <h4 className="title">
                      <Link
                        href={`/shop-collection`}
                        className="link text-white"
                      >
                        {collection.title}
                      </Link>
                    </h4>
                    <span className="text-title text-white">
                      {collection.productCount}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="nav-prev-collection d-none d-lg-flex nav-sw style-line nav-sw-left snbp7">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-collection d-none d-lg-flex nav-sw style-line nav-sw-right snbn7">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
