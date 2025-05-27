import React from "react";
import Link from "next/link";
import CountdownTimer from "@/components/common/Countdown";
export default function BannerCountdown() {
  return (
    <section
      className="flat-banner-parallax-v3"
      style={{ backgroundImage: 'url("/images/banner/banner-camping.jpg")' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="fl-content">
              <div className="title-top">
                <h3 className="title">Limited-Time Deals On!</h3>
                <p className="text-secondary">
                  Up to 50% Off Selected Styles. Don't Miss Out.
                </p>
                <div className="tf-countdown-lg">
                  <div
                    className="js-countdown"
                    data-timer={1007500}
                    data-labels="Days,Hours,Mins,Secs"
                  >
                    <CountdownTimer style={2} />
                  </div>
                </div>
              </div>
              <div>
                <Link href={`/shop-default-grid`} className="tf-btn btn-fill">
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
