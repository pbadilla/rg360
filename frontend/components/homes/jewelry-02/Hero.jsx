import { banners } from "@/data/collections";
import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="">
      <div className="container">
        <div
          className="swiper tf-sw-mobile"
          data-screen={767}
          data-preview={1}
          data-space={15}
        >
          <div className="swiper-wrapper grid-cls-v2">
            {banners.map((banner, index) => (
              <div key={index} className={`swiper-slide ${banner.className}`}>
                <div className="banner-cls hover-img">
                  <div className="img-style">
                    <Image
                      data-src={banner.imgSrc}
                      alt={banner.alt}
                      src={banner.imgSrc}
                      width={946}
                      height={1260}
                    />
                  </div>
                  <div className="cls-content">
                    <div className="box-title-cls wow fadeInUp">
                      <h3>
                        <Link
                          href={`/shop-default-grid`}
                          className="text-white link"
                        >
                          {banner.title}
                        </Link>
                      </h3>
                      <p className="text-white">{banner.description}</p>
                    </div>
                    <div
                      className="wow fadeInUp"
                      data-wow-delay={banner.wowDelay}
                    >
                      <Link
                        href={`/shop-default-grid`}
                        className="tf-btn btn-fill btn-white radius-4"
                      >
                        <span className="text">{banner.btnText}</span>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sw-pagination-mb sw-dots type-circle justify-content-center d-md-none d-flex" />
        </div>
      </div>
    </section>
  );
}
