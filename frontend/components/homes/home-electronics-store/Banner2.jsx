import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function Banner2() {
  return (
    <section className="">
      <div className="container">
        <div className="wg-big-save type-space-2">
          <Image
            className="lazyload"
            data-src="/images/banner/banner-electronic-1.jpg"
            alt="img"
            src="/images/banner/banner-electronic-1.jpg"
            width={1935}
            height={750}
          />
          <div className="content">
            <p className="type-sale text-button fw-6 text-clip">
              TECH SOUND PRO STUDIO
            </p>
            <h1 className="heading fw-7 wow fadeInUp text-clip font-5">
              Feel The Beat, <br />
              Live The Sound
            </h1>
            <p className="body-text-1 sub-text wow fadeInUp text-clip">
              Immerse Yourself in Every Note and Feel the Power <br />
              of Superior Sound Quality!
            </p>
            <Link
              href={`/shop-default-grid`}
              className="tf-btn btn-md btn-white wmax"
            >
              <span className="text">Shop Now</span>
              <i className="icon icon-arrowUpRight" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
