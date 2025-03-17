import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="tf-slideshow slider-center">
      <div className="wrap-slider h-600">
        <Image
          alt="fashion-slideshow"
          src="/images/slider/slider-beauty.jpg"
          width={1920}
          height={885}
        />
        <div className="box-content">
          <div className="container">
            <div className="content-slider">
              <div className="box-title-slider">
                <div
                  className="heading title-display wow fadeInUp"
                  data-wow-delay="0s"
                >
                  Eye-Catching <br />
                  Looks
                </div>
                <p
                  className="body-text-1 subheading wow fadeInUp"
                  data-wow-delay=".1s"
                >
                  Achieve effortless style every day with our casual chic
                  pieces.
                </p>
              </div>
              <div className="box-btn-slider wow fadeInUp" data-wow-delay=".2s">
                <Link href={`/shop-default-grid`} className="tf-btn btn-fill">
                  <span className="text">Explore Collection</span>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <a href="#downSection" className="btn-scroll-next">
          <i className="icon icon-arrow-down" />
        </a>
      </div>
    </section>
  );
}
