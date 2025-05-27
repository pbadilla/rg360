import React from "react";
import Link from "next/link";
export default function Banner() {
  return (
    <section
      className="flat-banner-parallax style-2"
      style={{ backgroundImage: 'url("/images/banner/banner-parallax.jpg")' }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-8 col-12">
            <div className="fl-content rounded-0 bg-main text-center flat-spacing-9">
              <div className="title-top">
                <p className="text-btn-uppercase text-white">
                  sumMer 2024 collection
                </p>
                <h1 className="title font-4 text-uppercase text-white">
                  Super Sale Up To %50
                </h1>
                <p className="body-text text-white">
                  Reserved for special occasions
                </p>
              </div>
              <div>
                <Link
                  href={`/shop-default-grid`}
                  className="tf-btn btn-fill btn-lg btn-white"
                >
                  <span className="text">discover Now</span>
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
