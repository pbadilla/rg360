import React from "react";
import Link from "next/link";
import CountdownTimer from "@/components/common/Countdown";
export default function BannerCountdown() {
  return (
    <section
      className="bg-surface flat-spacing-8 flat-countdown-banner-2"
      style={{ backgroundImage: 'url("/images/banner/banner-countdown.png")' }}
    >
      <div className="container">
        <div className="box-content">
          <div className="box-title">
            <h3>Limited-Time Deals On!</h3>
            <p className="text-secondary">
              Up to 50% Off Selected Styles. Don't Miss Out.
            </p>
          </div>
          <div className="tf-countdown-lg">
            <div
              className="js-countdown"
              data-timer={1007500}
              data-labels="Days,Hours,Mins,Secs"
            >
              <CountdownTimer style={2} />
            </div>
          </div>
          <div className="btn-banner">
            <Link href={`/shop-default-grid`} className="tf-btn btn-fill">
              <span className="text">Shop Now</span>
              <i className="icon icon-arrowUpRight" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
