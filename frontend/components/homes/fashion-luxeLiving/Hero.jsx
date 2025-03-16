"use client";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="slider-padding">
      <div className="tf-slideshow slider-style2 slider-radius-3 slider-video">
        <div className="wrap-slider">
          <video
            src="/images/video/bg-video1.mp4"
            autoPlay
            muted
            playsInline
            loop
          />
          <div className="box-content">
            <div className="container">
              <div className="content-slider">
                <div className="box-title-slider">
                  <div
                    className="heading text-white title-display wow fadeInUp"
                    data-wow-delay="0s"
                  >
                    Winter Warmth
                  </div>
                  <p
                    className="body-text-1 subheading text-white wow fadeInUp"
                    data-wow-delay=".1s"
                  >
                    Stay cozy and fashionable with our winter collection.
                  </p>
                </div>
                <div
                  className="box-btn-slider wow fadeInUp"
                  data-wow-delay=".2s"
                >
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
    </div>
  );
}
