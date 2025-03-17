"use client";
import { collectionItems3 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Collections() {
  return (
    <section id="downSection" className="flat-spacing">
      <div className="container">
        <Swiper
          dir="ltr"
          slidesPerView={3}
          breakpoints={{
            1300: {
              slidesPerView: 3,
            },
            924: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1.7,
            },
          }}
          spaceBetween={30}
        >
          {collectionItems3.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="collection-position-2 style-5 hover-img wow fadeInUp"
                data-wow-delay={item.delay}
              >
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={item.imgSrc}
                    alt={item.alt}
                    src={item.imgSrc}
                    width={615}
                    height={819}
                  />
                </a>
                <div className="content">
                  <h4 className="title">
                    {/* Hardcoded link directly in JSX */}
                    <Link
                      href={`/shop-default-grid`}
                      className="link text-white"
                    >
                      {item.title}
                    </Link>
                  </h4>
                  <span className="text-title text-white">{item.subtitle}</span>
                  <div>
                    {/* Hardcoded link directly in JSX */}
                    <Link
                      href={`/shop-default-grid`}
                      className="btn-line style-white"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
