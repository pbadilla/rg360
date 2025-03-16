"use client";
import { testimonials8 } from "@/data/testimonials";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Testimonials() {
  return (
    <section className="flat-spacing bg_F4F4F5">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading font-5 fw-bold">Customer Say!</h3>
          <p className="subheading">
            Our customers adore our products, and we constantly aim to delight
            them.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-testimonial wow fadeInUp"
          data-wow-delay="0.1s"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd22",
          }}
        >
          {testimonials8.map((testimonial) => (
            <SwiperSlide className="swiper-slide" key={testimonial.id}>
              <div className="testimonial-item style-2 rounded-0 border-0">
                <div className="content-top">
                  <div className="list-star-default">
                    {Array.from({ length: testimonial.stars }, (_, i) => (
                      <i key={i} className="icon icon-star" />
                    ))}
                  </div>
                  <p className="text-secondary">{testimonial.review}</p>
                  <div className="box-author">
                    <div className="text-title author">
                      {testimonial.author}
                    </div>
                    <svg
                      className="icon"
                      width={20}
                      height={21}
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_15758_14563)">
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
                      </g>
                      <defs>
                        <clipPath id="clip0_15758_14563">
                          <rect
                            width={20}
                            height={20}
                            fill="white"
                            transform="translate(0 0.684082)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="box-avt">
                  <div className="avatar avt-60 round">
                    <Image
                      alt="avt"
                      src={testimonial.avatarSrc}
                      width={450}
                      height={450}
                    />
                  </div>
                  <div className="box-price">
                    <p className="text-title text-line-clamp-1">
                      {testimonial.productName}
                    </p>
                    <div className="text-button price">{testimonial.price}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-pagination-testimonial sw-dots type-circle d-flex justify-content-center spd22" />
        </Swiper>
      </div>
    </section>
  );
}
