import React from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/common/Countdown";
export default function BannerCountdown() {
  return (
    <section className="">
      <div className="container">
        <div className="wg-free-delivery align-items-center tf-grid-layout md-col-2 gap-0">
          <div className="free-delivery-info text-center">
            <h3 className="free-delivery-heading text-white">
              Get Free Delivery 60 Days
            </h3>
            <p className="text text-white">
              Shop now and take advantage of this special offer to get your
              favorite items delivered to your doorstep at no extra cost.
            </p>
            <div className="tf-countdown style-2">
              <div
                className="js-countdown"
                data-timer={1007500}
                data-labels="Days,Hours,Mins,Secs"
              >
                <CountdownTimer style={2} />
              </div>
            </div>
            <Link
              href={`/shop-default-grid`}
              className="tf-btn btn-fill btn-white"
            >
              <span className="text">Buy at a discount</span>
              <i className="icon icon-arrowUpRight" />
            </Link>
          </div>
          <div className="free-delivery-img">
            <Image
              className="lazyload"
              data-src="/images/section/delivery-1.jpg"
              alt="delivery-img"
              src="/images/section/delivery-1.jpg"
              width={969}
              height={690}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
