"use client";
import Link from "next/link";
import { categorySlides } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Categories() {
  return (
    <section className="flat-spacing bg-beige">
      <div className="container">
        <div className="heading-section-2 wow fadeInUp">
          <h3 className="heading text-white">Shop by Categories</h3>
        </div>
      </div>
      <div
        className="container-full slider-layout-right wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <Swiper
          spaceBetween={15}
          slidesPerView={2.2}
          breakpoints={{
            768: { slidesPerView: 3.2, spaceBetween: 20 },
            1024: { slidesPerView: 6.2, spaceBetween: 20 },
          }}
          dir="ltr"
        >
          {categorySlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="collection-position-2 hover-img">
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={slide.imgSrc}
                    alt={slide.imgAlt}
                    src={slide.imgSrc}
                    width={363}
                    height={483}
                  />
                </a>
                <div className="content">
                  <Link href={`/shop-categories-top`} className="cls-btn">
                    <h6 className="text">{slide.btnText}</h6>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
