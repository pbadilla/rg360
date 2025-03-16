import Link from "next/link";
import React from "react";
import Image from "next/image";
import CountdownTimer from "@/components/common/Countdown";
export default function Delivery() {
  return (
    <section className="">
      <div className="container">
        <div className="wg-free-delivery type-space-2 align-items-center tf-grid-layout md-col-2 gap-0 bg-brown-3">
          <div className="free-delivery-img">
            <Image
              className="lazyload"
              data-src="/images/section/limited-time.jpg"
              alt="limited-time-img"
              src="/images/section/limited-time.jpg"
              width={968}
              height={726}
            />
          </div>
          <div className="free-delivery-info">
            <div className="type-sale text-btn-uppercase text-primary">
              Up to 50% Off Selected
            </div>
            <h3 className="free-delivery-heading fw-7 font-5">
              Limited-Time Deals On!
            </h3>
            <p className="text text-secondary">
              Hurry Up! Grab These Exclusive Limited-Time Deals Before <br />
              They're Gone!
            </p>
            <div className="tf-countdown-lg style-1">
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
