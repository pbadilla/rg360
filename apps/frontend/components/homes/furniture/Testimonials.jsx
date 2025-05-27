"use client";

import { testimonialsWithProduct3 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import { Pagination } from "swiper/modules";
export default function Testimonials() {
  const { setQuickViewItem } = useContextElement();
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Customer Say!</h3>
          <p className="subheading">
            Our customers adore our products, and we constantly aim to delight
            them.
          </p>
        </div>

        <Swiper
          dir="ltr"
          spaceBetween={15}
          slidesPerView={2}
          breakpoints={{
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 1.3,
              spaceBetween: 30,
            },
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd53",
          }}
          className="swiper tf-sw-testimonial wow fadeInUp"
        >
          {testimonialsWithProduct3.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item hover-img">
                <div className="img-style">
                  <Image
                    data-src={testimonial.imgSrc}
                    alt={testimonial.alt}
                    src={testimonial.imgSrc}
                    width={351}
                    height={468}
                  />
                  <a
                    href="#quickView"
                    onClick={() => setQuickViewItem(testimonial)}
                    data-bs-toggle="modal"
                    className="box-icon hover-tooltip center"
                  >
                    <span className="icon icon-eye" />
                    <span className="tooltip">Quick View</span>
                  </a>
                </div>
                <div className="content">
                  <div className="content-top">
                    <div className="list-star-default">
                      <i className="icon icon-star" />
                      <i className="icon icon-star" />
                      <i className="icon icon-star" />
                      <i className="icon icon-star" />
                      <i className="icon icon-star" />
                    </div>
                    <p className="text-secondary">{testimonial.quote}</p>
                    <div className="box-author">
                      <div className="text-title author">
                        {testimonial.author}
                      </div>
                    </div>
                  </div>
                  <div className="box-avt">
                    <div className="avatar avt-60 round">
                      <Image
                        alt="avt"
                        src={testimonial.avatarSrc}
                        width={600}
                        height={800}
                      />
                    </div>
                    <div className="box-price">
                      <p className="text-title text-line-clamp-1">
                        {testimonial.productTitle}
                      </p>
                      <div className="text-button price">
                        ${testimonial.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="sw-pagination-testimonial sw-dots type-circle d-flex justify-content-center spd53" />
      </div>
    </section>
  );
}
