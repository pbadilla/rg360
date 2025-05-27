"use client";

import { categories6 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
export default function Categories() {
  return (
    <section className="flat-spacing section-pet-store">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Complete Pet Essentials &amp; Care</h3>
          <p className="subheading">
            Everything You Need for the Health and Happiness of Your Pets
          </p>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          // loop={true}
          breakpoints={{
            1200: {
              slidesPerView: 4,
            },
            868: {
              slidesPerView: 3,
            },

            500: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd71",
          }}
          dir="ltr"
          className="swiper tf-sw-categories position-relative"
        >
          {categories6.map((category, index) => (
            <SwiperSlide key={index}>
              <div
                className={`wg-pet-store wow fadeInUp`}
                data-wow-delay={`${index * 0.1}s`}
              >
                <div className={`pet-store-heading ${category.bgColor}`}>
                  <div className="image">
                    <Image
                      alt=""
                      src={category.imageSrc}
                      width={117}
                      height={116}
                    />
                  </div>
                  <h5 className="text-white">{category.categoryName}</h5>
                </div>
                <div className="pet-store-list">
                  {category.items.map((item, idx) => (
                    <a key={idx} className="pet-store-item link" href="#">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex sw-pagination-categories sw-dots type-circle justify-content-center mt-3 spd71" />
        </Swiper>
      </div>
    </section>
  );
}
