"use client";
import { testimonials9 } from "@/data/testimonials";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="flat-sw-navigation flat-spacing bg-surface radius-20 px_15 home-gaming-testimonials">
          <Swiper
            dir="ltr"
            className="swiper tf-sw-testimonial"
            spaceBetween={30}
            modules={[Navigation]}
            navigation={{
              prevEl: ".snbp28",
              nextEl: ".snbn28",
            }}
          >
            {testimonials9.map((testimonial) => (
              <SwiperSlide className="swiper-slide" key={testimonial.id}>
                <div className="testimonial-item-v2 type-space-2 text-center">
                  <div className="quote-box">
                    <span className="icon icon-quote" />
                    <div className="text-btn-uppercase text-secondary-2">
                      Customer Say!
                    </div>
                  </div>
                  <h4>"{testimonial.quote}"</h4>
                  <div className="rate-box">
                    <div className="list-star-default">
                      {Array.from({ length: testimonial.rating }, (_, i) => (
                        <i key={i} className="icon icon-star" />
                      ))}
                    </div>
                    <h6>
                      {testimonial.name}
                      <span className="text-title text-se">
                        / {testimonial.role}
                      </span>
                    </h6>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="nav-prev-testimonial d-none d-lg-flex nav-sw style-line nav-sw-left space-md snbp28">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-testimonial d-none d-lg-flex nav-sw style-line nav-sw-right space-md snbn28">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
