"use client";
import { testimonials11 } from "@/data/testimonials";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Testimonials() {
  return (
    <section className="mt--75 mt--xxl-148 position-relative z-5">
      <div className="container">
        <div className="s-testimonial d-md-flex">
          <div className="content-left mb-md-0">
            <div className="heading-section">
              <h3 className="heading wow fadeInUp">Customer Reviews</h3>
              <p className="subheading body-text-1 wow fadeInUp">
                Honest opinions from satisfied customers.
              </p>
            </div>
            <div className="box-btn">
              <a href="#" className="tf-btn btn-fill btn-reset btn-md">
                <span className="text"> Read all testimonials </span>
                <i className="icon icon-arrowUpRight" />
              </a>
            </div>
          </div>
          <Swiper
            className="swiper tf-sw-testimonial"
            modules={[Navigation]}
            navigation={{
              prevEl: ".snbp39",
              nextEl: ".snbn39",
            }}
            dir="ltr"
          >
            {/* item 1 */}
            {testimonials11.map((testimonial) => (
              <SwiperSlide className="swiper-slide" key={testimonial.id}>
                <div className="testimonial-item-2">
                  <div className="content-top">
                    <div className="list-star-default">
                      {Array.from({ length: testimonial.rating }, (_, i) => (
                        <i key={i} className="icon icon-star" />
                      ))}
                    </div>
                    <h4 className="fw-medium">"{testimonial.review}"</h4>
                  </div>
                  <div className="box-author">
                    <div className="avt">
                      <Image
                        alt=""
                        src={testimonial.avatarSrc}
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className="info">
                      <h6>{testimonial.name}</h6>
                      <p className="text-caption-1">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="box-navigation style-2">
              <div className="nav-prev-testimonial nav-sw style-line nav-sw-left snbp39">
                <i className="icon icon-arrLeft" />
              </div>
              <div className="nav-next-testimonial nav-sw style-line nav-sw-right snbn39">
                <i className="icon icon-arrRight" />
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
