"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Banner() {
  return (
    <section>
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          <div
            className="collection-default abs-x-center abs-bottom hover-img wow fadeInUp"
            data-wow-delay="0s"
          >
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/banner/banner-sneaker-1.jpg"
                alt="banner-cls"
                src="/images/banner/banner-sneaker-1.jpg"
                width={630}
                height={630}
              />
            </a>
            <div className="content text-center">
              <div className="box-title">
                <h3 className="title">
                  <Link href={`/shop-default-grid`} className="link fw-medium">
                    Footwear Trends
                  </Link>
                </h3>
                <p className="">Elevate your look, comfort in every step.</p>
              </div>
              <div className="box-btn">
                <Link
                  href={`/shop-default-grid`}
                  className="tf-btn btn-fill btn-reset btn-md"
                >
                  <span className="text">Shop Now</span>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
          <div
            className="collection-default abs-x-center abs-top hover-img wow fadeInUp"
            data-wow-delay="0s"
          >
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/banner/banner-sneaker-2.jpg"
                alt="banner-cls"
                src="/images/banner/banner-sneaker-2.jpg"
                width={630}
                height={630}
              />
            </a>
            <div className="content text-center">
              <div className="box-title">
                <h3 className="title">
                  <Link href={`/shop-default-grid`} className="link fw-medium">
                    Sneaker Collection
                  </Link>
                </h3>
                <p className="">Step into style, walk with confidence.</p>
              </div>
              <div className="box-btn">
                <Link
                  href={`/shop-default-grid`}
                  className="tf-btn btn-fill btn-reset btn-md"
                >
                  <span className="text">Shop Now</span>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
