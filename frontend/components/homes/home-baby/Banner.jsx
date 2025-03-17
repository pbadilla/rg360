import React from "react";
import Image from "next/image";
export default function Banner() {
  return (
    <section className="flat-spacing pb-0">
      <div className="container">
        <div className="tf-grid-layout md-col-2 radius-20 gap-0 overflow-hidden">
          <div className="banner-text style-2 bg-brown-2 mb-0 d-md-flex flex-md-column justify-content-md-center h-md-100">
            <div className="box-title">
              <p className="text-btn-uppercase">Upholstery</p>
              <h2>
                Guide: Buying Shoes <br className="d-none d-md-block" />
                For Kids
              </h2>
              <p className="text-button fw-normal">
                Buying children’s shoes isn’t like buying shoes for yourself.
                Little feet grow fast, and kids are more likely to need
                weather-specific footwear than grown-ups - unless you also enjoy
                playing in puddles!
              </p>
            </div>
            <div className="box-btn">
              <a
                href="#"
                className="btn-style-2 radius-12 btn-lg fw-semibold letter-0"
              >
                <span className="text-caption-1 lh-xl-20 text text-uppercase font-2">
                  Shop Now
                </span>
              </a>
            </div>
          </div>
          <div className="image-100">
            <Image
              src="/images/banner/banner-baby.jpg"
              data-=""
              alt=""
              className="lazyload"
              width={645}
              height={484}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
