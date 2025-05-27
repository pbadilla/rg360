"use client";
import { collections4 } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Banner() {
  return (
    <section>
      <div className="container">
        <div className="row flat-img-with-text-v3">
          <div className="col-lg-6 col-md-5">
            <div className="banner-left">
              <div className="collection-position style-lg hover-img">
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src="/images/banner/banner-w-text3.jpg"
                    alt="banner"
                    src="/images/banner/banner-w-text3.jpg"
                    width={473}
                    height={630}
                  />
                </a>
                <div className="content">
                  <h3 className="title wow fadeInUp">
                    <Link href={`/shop-collection`} className="link text-white">
                      Capsule Collection
                    </Link>
                  </h3>
                  <p className="desc text-white wow fadeInUp">
                    Reserved for special occasions
                  </p>
                  <div className="wow fadeInUp">
                    <Link
                      href={`/shop-collection`}
                      className="btn-line style-white"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-7">
            <div className="banner-right">
              <div className="box-title">
                <div className="sub-title text-btn-uppercase wow fadeInUp">
                  Fresh &amp; Bold!
                </div>
                <h3 className="title wow fadeInUp">Elevate Your Wardrobe</h3>
                <p className="desc text-secondary wow fadeInUp">
                  Curated Fashion Just For You. Save Up To 30% Today
                </p>
              </div>
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  700: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                }}
                loop={false}
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  el: ".spd43",
                }}
                dir="ltr"
                className="swiper tf-sw-collection"
              >
                {collections4.map((collection) => (
                  <SwiperSlide key={collection.id}>
                    <div
                      className="collection-default hover-img wow fadeInUp"
                      data-wow-delay={collection.wowDelay}
                    >
                      <a className="img-style">
                        <Image
                          className="lazyload"
                          data-src={collection.imgSrc}
                          alt={collection.imgAlt}
                          src={collection.imgSrc}
                          width={450}
                          height={450}
                        />
                      </a>
                      <div className="content text-center">
                        <h6 className="title">
                          <Link href={`/shop-collection`} className="link">
                            {collection.title}
                          </Link>
                        </h6>
                        <div className="count">{collection.count}</div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="sw-pagination-collection sw-dots type-circle justify-content-center spd43" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
