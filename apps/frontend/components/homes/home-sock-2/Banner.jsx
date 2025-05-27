import React from "react";
import Image from "next/image";
export default function Banner() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="banner-text mb-md-0 d-md-flex flex-md-column justify-content-md-center h-md-100">
              <div className="box-title">
                <p className="text-btn-uppercase">
                  Socks Sale - Up to 50% Off!
                </p>
                <h2>
                  Discover Comfort in <br className="d-none d-md-block" />
                  Every Step
                </h2>
                <p className="body-text fw-normal font-2">
                  Upgrade your style with premium socks. From elegant office
                  wear to <br className="d-none d-xl-block" />
                  sporty options, we’ve got you covered!
                </p>
              </div>
              <div className="box-btn">
                <a
                  href="#"
                  className="btn-style-2 radius-12 btn-lg fw-semibold letter-0 font-2"
                >
                  <span className="text-caption-1 lh-xl-20 text text-uppercase fw-semibold">
                    Shop Now
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="tf-grid-layout tf-col-2 column-xl-gap-20">
              <div className="image hover-img">
                <a href="#" className="img-style w-100">
                  <Image
                    src="/images/banner/banner-sock-1.jpg"
                    data-=""
                    alt=""
                    className="lazyload"
                    width={300}
                    height={400}
                  />
                </a>
              </div>
              <div className="image hover-img">
                <a href="#" className="img-style w-100">
                  <Image
                    src="/images/banner/banner-sock-2.jpg"
                    data-=""
                    alt=""
                    className="lazyload"
                    width={300}
                    height={400}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
