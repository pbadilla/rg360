import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="tf-slideshow slider-center">
      <div className="wrap-slider">
        <Image
          alt="fashion-slideshow"
          src="/images/slider/slider-chicHaven.jpg"
          width={1920}
          height={800}
        />
        <div className="box-content">
          <div className="container">
            <div className="content-slider">
              <div className="box-title-slider">
                <div
                  className="heading text-white title-display wow fadeInUp"
                  data-wow-delay="0s"
                >
                  Elegant <br />
                  Office Wear
                </div>
                <p
                  className="body-text-1 subheading text-white wow fadeInUp"
                  data-wow-delay=".1s"
                >
                  Transform your workdays with modern suits and chic blouses.
                </p>
              </div>
              <div className="box-btn-slider wow fadeInUp" data-wow-delay=".2s">
                <Link
                  href={`/shop-default-grid`}
                  className="tf-btn btn-fill btn-white"
                >
                  <span className="text">Explore Collection</span>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
