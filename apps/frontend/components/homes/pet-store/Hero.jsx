"use client";

import { slides11 } from "@/data/heroSlides";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="flat-spacing-7">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="tf-list-categories style-1">
              <Link href={`/shop-collection`} className="categories-title">
                <span className="icon-left icon-categories" />
                <span className="text">Shop By</span>
              </Link>
              <div className="list-categories-inner">
                <ul>
                  <li className="sub-categories2">
                    <Link href={`/shop-collection`} className="categories-item">
                      <span className="inner-left text-title">
                        <i className="icon icon-cat" />
                        For Cats
                      </span>
                      <i className="icon icon-arrRight" />
                    </Link>
                    <ul className="list-categories-inner">
                      <li>
                        <Link
                          href={`/shop-collection`}
                          className="categories-item"
                        >
                          <span className="inner-left text-title">
                            <i className="icon icon-cat" />
                            For Cats
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/shop-collection`}
                          className="categories-item"
                        >
                          <span className="inner-left text-title">
                            <i className="icon icon-cat" />
                            For Cats
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="sub-categories2">
                    <Link href={`/shop-collection`} className="categories-item">
                      <span className="inner-left text-title">
                        <i className="icon icon-dog" />
                        For Dogs
                      </span>
                      <i className="icon icon-arrRight" />
                    </Link>
                    <ul className="list-categories-inner">
                      <li>
                        <Link
                          href={`/shop-collection`}
                          className="categories-item"
                        >
                          <span className="inner-left text-title">
                            <i className="icon icon-dog" />
                            For Dogs
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/shop-collection`}
                          className="categories-item"
                        >
                          <span className="inner-left text-title">
                            <i className="icon icon-dog" />
                            For Dogs
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="sub-categories2">
                    <Link href={`/shop-collection`} className="categories-item">
                      <span className="inner-left text-title">
                        <i className="icon icon-fish" />
                        For Fish
                      </span>
                      <i className="icon icon-arrRight" />
                    </Link>
                    <ul className="list-categories-inner">
                      <li>
                        <Link
                          href={`/shop-collection`}
                          className="categories-item"
                        >
                          <span className="inner-left text-title">
                            <i className="icon icon-fish" />
                            For Fish
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/shop-collection`}
                          className="categories-item"
                        >
                          <span className="inner-left text-title">
                            <i className="icon icon-fish" />
                            For Fish
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="sub-categories2">
                    <Link href={`/shop-collection`} className="categories-item">
                      <span className="inner-left text-title">
                        <i className="icon icon-bird" />
                        For Bird
                      </span>
                      <i className="icon icon-arrRight" />
                    </Link>
                    <ul className="list-categories-inner">
                      <li>
                        <Link
                          href={`/shop-collection`}
                          className="categories-item"
                        >
                          <span className="inner-left text-title">
                            <i className="icon icon-bird" />
                            For Bird
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/shop-collection`}
                          className="categories-item"
                        >
                          <span className="inner-left text-title">
                            <i className="icon icon-bird" />
                            For Bird
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="sub-categories2">
                    <Link href={`/shop-collection`} className="categories-item">
                      <span className="inner-left text-title">
                        <i className="icon icon-sm-pet" />
                        Small Pet
                      </span>
                      <i className="icon icon-arrRight" />
                    </Link>
                    <ul className="list-categories-inner">
                      <li>
                        <Link
                          href={`/shop-collection`}
                          className="categories-item"
                        >
                          <span className="inner-left text-title">
                            <i className="icon icon-sm-pet" />
                            Small Pet
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/shop-collection`}
                          className="categories-item"
                        >
                          <span className="inner-left text-title">
                            <i className="icon icon-sm-pet" />
                            Small Pet
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href={`/shop-collection`} className="categories-item">
                      <span className="inner-left text-title">
                        <i className="icon icon-cheese" />
                        Food
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/shop-collection`} className="categories-item">
                      <span className="inner-left text-title">
                        <i className="icon icon-pharmacy" />
                        Pharmacy
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/shop-collection`} className="categories-item">
                      <span className="inner-left text-title">
                        <i className="icon icon-bone" />
                        Accessory
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="tf-slideshow slider-style2 slider-pet-store slider-position slider-effect-fade">
              <Swiper
                effect="fade"
                spaceBetween={0}
                loop={true}
                autoplay={{ delay: 2500 }}
                centeredSlides={false}
                modules={[Autoplay, EffectFade, Pagination]}
                className="swiper tf-sw-slideshow"
                pagination={{
                  clickable: true,
                  el: ".spd72",
                }}
                dir="ltr"
              >
                {slides11.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="wrap-slider">
                      <Image
                        alt="slideshow"
                        src={slide.imageSrc}
                        width={1441}
                        height={702}
                      />
                      <div className="box-content">
                        <div className="content-slider">
                          <div className="box-title-slider">
                            <h2
                              className="fade-item fade-item-1 heading"
                              dangerouslySetInnerHTML={{ __html: slide.title }}
                            ></h2>
                            <p className="fade-item fade-item-2 body-text-1 subheading">
                              {slide.description}
                            </p>
                          </div>
                          <div className="fade-item fade-item-3 box-btn-slider">
                            <Link
                              href={`/shop-default-grid`}
                              className="tf-btn btn-fill"
                            >
                              <span className="text">Shop Now</span>
                              <i className="icon icon-arrowUpRight" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="wrap-pagination d-block">
                <div className="container">
                  <div className="sw-dots sw-pagination-slider type-square justify-content-center spd72" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
