"use client";
import { collectionItems } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Collections() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <Swiper
          dir="ltr"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            668: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="swiper tf-sw-collection sw-lookbook-wrap"
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd29",
          }}
        >
          {collectionItems.map((item, i) => (
            <SwiperSlide key={i}>
              <div
                className={`collection-position-3 hover-img wow fadeInUp ${
                  item.lookbook ? "cls-lookbook" : ""
                }`}
                data-wow-delay={item.wowDelay}
              >
                <a href={item.link || "#"} className="img-style">
                  <Image
                    className="lazyload"
                    src={item.imgSrc}
                    alt={item.alt}
                    width={615}
                    height={819}
                  />
                </a>
                {item.lookbook ? (
                  <div className="lookbook-item">
                    <div className="dropup-center dropup">
                      <div
                        role="dialog"
                        className="tf-pin-btn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span />
                      </div>
                      <div className="dropdown-menu">
                        <div className="loobook-product">
                          <div className="img-style">
                            <Image
                              src={item.lookbook.imgSrc}
                              alt="lookbook"
                              width={300}
                              height={400}
                            />
                          </div>
                          <div className="content">
                            <div className="info">
                              <a
                                href="#"
                                className="text-title text-line-clamp-1 link"
                              >
                                {item.lookbook.productTitle}
                              </a>
                              <div className="price text-button">
                                {item.lookbook.price}
                              </div>
                            </div>
                            <a
                              href={item.lookbook.quickViewLink}
                              data-bs-toggle="modal"
                              className="btn-lookbook btn-line"
                            >
                              Quick View
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="content">
                    <div className="archive-top">
                      <h4 className="title">
                        <Link
                          href={`/shop-collection`}
                          className="link"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        ></Link>
                      </h4>
                      <span className="text-btn-uppercase text-primary">
                        {item.subtitle}
                      </span>
                    </div>
                    <div className="archive-btn">
                      <Link href={`/shop-collection`} className="btn-line">
                        {item.btnText}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
          {/* Pagination */}
          <div className="sw-pagination-collection sw-dots type-circle justify-content-center spd29" />
        </Swiper>
      </div>
    </section>
  );
}
