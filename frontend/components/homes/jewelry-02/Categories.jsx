"use client";

import { categories4 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
export default function Categories() {
  const params = {
    slidesPerView: 6,
    breakpoints: {
      1024: {
        slidesPerView: 6,
      },
      768: {
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 3,
      },
      0: {
        slidesPerView: 2,
      },
    },
    spaceBetween: 15,
  };
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Popular Categories</h3>
        </div>
        <div className="flat-collection-circle wow fadeInUp">
          <div className="swiper tf-sw-categories">
            <Swiper
              {...params}
              modules={[Pagination, Navigation]}
              pagination={{
                clickable: true,
                el: ".spd60",
              }}
              navigation={{
                prevEl: ".snbp14",
                nextEl: ".snbn14",
              }}
              dir="ltr"
            >
              {categories4.map((category, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="collection-circle hover-img">
                    <Link
                      href={`/shop-categories-top`}
                      className="img-style radius-48"
                    >
                      <Image
                        className="lazyload"
                        data-src={category.imgSrc}
                        alt="collection-img"
                        src={category.imgSrc}
                        width={286}
                        height={285}
                      />
                    </Link>
                    <div className="collection-content text-center">
                      <Link href={`/shop-categories-top`} className="cls-title">
                        <h6 className="text">{category.title}</h6>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                      <div className="count text-secondary">
                        {category.itemsCount} items
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="d-flex d-lg-none sw-pagination-categories sw-dots type-circle justify-content-center spd60" />
          </div>
          <div className="nav-prev-categories d-none d-lg-flex nav-sw style-line nav-sw-left snbp14">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-categories d-none d-lg-flex nav-sw style-line nav-sw-right snbn14">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
