"use client";

import { testimonials3 } from "@/data/testimonials";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
export default function Testimonials3({
  parentClass = "flat-spacing bg-surface",
}) {
  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Customer Say!</h3>
          <p className="subheading">
            Our customers adore our products, and we constantly aim to delight
            them.
          </p>
        </div>
        <Swiper
          className="tf-sw-testimonial wow fadeInUp"
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          modules={[Pagination]}
          pagination={{ el: ".spd445", clickable: true }}
          dir="ltr"
        >
          {testimonials3.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item style-2 style-3">
                <div className="content-top">
                  <div className="box-icon">
                    <i className="icon icon-quote" />
                  </div>
                  <div className="text-title">{item.textTitle}</div>
                  <p className="text-secondary">{item.content}</p>
                  <div className="box-rate-author">
                    <div className="list-star-default">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <i key={i} className="icon icon-star" />
                        ))}
                    </div>
                    <div className="box-author">
                      <div className="text-title author">{item.author}</div>
                      <svg
                        className="icon"
                        width={20}
                        height={21}
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.875 11.6255L8.75 13.5005L13.125 9.12549"
                          stroke="#3DAB25"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 18.5005C14.1421 18.5005 17.5 15.1426 17.5 11.0005C17.5 6.85835 14.1421 3.50049 10 3.50049C5.85786 3.50049 2.5 6.85835 2.5 11.0005C2.5 15.1426 5.85786 18.5005 10 18.5005Z"
                          stroke="#3DAB25"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="box-avt">
                  <div className="avatar avt-60 round">
                    <Image
                      alt="avatar"
                      src={item.avatar}
                      width={90}
                      height={91}
                    />
                  </div>
                  <div className="box-price">
                    <p className="text-title text-line-clamp-1">
                      {item.priceTitle}
                    </p>
                    <div className="text-button price">{item.price}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-testimonial sw-dots type-circle d-flex justify-content-center spd445"></div>
        </Swiper>
      </div>
    </section>
  );
}
