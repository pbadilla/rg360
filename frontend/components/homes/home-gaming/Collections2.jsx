"use client";

import { collections17 } from "@/data/collections";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
export default function Collections2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-sw-recent"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              spaceBetween: 30,
              slidesPerView: 3,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd26",
          }}
        >
          {collections17.map((collection) => (
            <SwiperSlide className="swiper-slide" key={collection.id}>
              <div
                className="collection-default hover-button abs-left-bottom type-2 hover-img wow fadeInUp"
                data-wow-delay={collection.delay}
              >
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={collection.imageSrc}
                    alt={collection.alt}
                    src={collection.imageSrc}
                    width={410}
                    height={546}
                  />
                </a>
                <div className="content text-start">
                  <div className="box-title">
                    <h5 className="title">
                      <Link
                        href={`/shop-default-grid`}
                        className="link text-white fw-bold"
                      >
                        {collection.title}
                      </Link>
                    </h5>
                    <p className="text-white body-text">
                      {collection.description}
                    </p>
                  </div>
                  <div className="box-btn">
                    <Link
                      href={`/shop-default-grid`}
                      className="tf-btn btn-fill btn-white btn-md"
                    >
                      <span className="text">Shop now</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-pagination-recent sw-dots type-circle justify-content-center spd26" />
        </Swiper>
      </div>
    </section>
  );
}
