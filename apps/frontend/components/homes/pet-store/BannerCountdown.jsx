import React from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/common/Countdown";
export default function BannerCountdown() {
  return (
    <section className="section-flash-sale">
      <div className="container">
        <div className="wrap">
          <div className="left">
            <h1 className="heading wow fadeInUp">Flash Sale!</h1>
            <p className="body-text-1 wow fadeInUp">
              Big Savings Up to 25% Off at the Shop
            </p>
            <ul>
              <li>
                <h6 className="fw-6 wow fadeInUp">
                  <Link href={`/shop-categories-top`} className="link">
                    For Dog
                  </Link>
                </h6>
              </li>
              <li>
                <h6 className="fw-6 wow fadeInUp" data-wow-delay="0.1s">
                  <Link href={`/shop-categories-top`} className="link">
                    For Cat
                  </Link>
                </h6>
              </li>
              <li>
                <h6 className="fw-6 wow fadeInUp" data-wow-delay="0.2s">
                  <Link href={`/shop-categories-top`} className="link">
                    Small Pet
                  </Link>
                </h6>
              </li>
            </ul>
          </div>
          <div className="image">
            <Image
              className="lazyload"
              data-src="/images/section/flash-sale.png"
              alt=""
              src="/images/section/flash-sale.png"
              width={581}
              height={580}
            />
          </div>
          <div className="right text-center">
            <h3 className="fw-6">Up To 25%</h3>
            <p className="body-text-1">
              Get 20% off if you spend 120$ or more!
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
