import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Banner() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="banner-cls-discover hover-img">
          <a href="#" className="img-style">
            <Image
              className="lazyload"
              data-src="/images/banner/discover-decor.jpg"
              alt="cls-tiktok"
              src="/images/banner/discover-decor.jpg"
              width={1290}
              height={480}
            />
          </a>
          <div className="cls-content">
            <div className="box-title-top">
              <p className="subtitle text-btn-uppercase text-white wow fadeInUp">
                sumMer 2024 collection
              </p>
              <h3 className="title">
                <a
                  href="#"
                  className="link text-white wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  Super Sale Up To %50
                </a>
              </h3>
              <p className="desc text-white wow fadeInUp" data-wow-delay="0.2s">
                Reserved for special occasions
              </p>
            </div>
            <div className="wow fadeInUp" data-wow-delay="0.3s">
              <Link
                href={`/shop-default-grid`}
                className="tf-btn btn-md btn-white"
              >
                <span className="text">discover Now</span>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
