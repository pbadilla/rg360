"use client";

import { products19 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { useContextElement } from "@/context/Context";
export default function Lookbook() {
  const { setQuickViewItem } = useContextElement();
  return (
    <section className="flat-spacing pt-0">
      <Swiper
        slidesPerView={3}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
        spaceBetween={0}
        className="swiper tf-sw-lookbook sw-lookbook-wrap"
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd10",
        }}
        dir="ltr"
      >
        {products19.map((item, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="hover-img cls-lookbook">
              <Link
                href={`/product-detail/${item.id}`}
                className="img-style rounded-0"
              >
                <Image
                  className="lazyload"
                  data-src={item.imgSrcBanner}
                  alt={item.imgAlt}
                  src={item.imgSrcBanner}
                  width={960}
                  height={1200}
                />
              </Link>
              <div className={`lookbook-item ${item.positionClass}`}>
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
                          alt="img"
                          src={item.imgSrc}
                          width={960}
                          height={1200}
                        />
                      </div>
                      <div className="content">
                        <div className="info">
                          <Link
                            href={`/product-detail/${item.id}`}
                            className="text-title text-line-clamp-1 link"
                          >
                            {item.title}
                          </Link>
                          <div className="price text-button">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                        <a
                          href="#quickView"
                          onClick={() => setQuickViewItem(item)}
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
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-pagination-lookbook sw-dots type-circle justify-content-center spd10" />
      </Swiper>
    </section>
  );
}
