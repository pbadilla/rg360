import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Banner() {
  return (
    <section className="">
      <div className="container">
        <div className="wg-big-save">
          <Image
            className="lazyload"
            data-src="/images/section/big-save.jpg"
            alt="img"
            src="/images/section/big-save.jpg"
            width={1291}
            height={360}
          />
          <div className="content">
            <h3 className="heading wow fadeInUp">
              Big Savings Up To 25% Off <br />
              At The Modave Shop
            </h3>
            <div className="text body-text-1 wow fadeInUp">
              25% off select long-lasting edible chews
            </div>
            <Link
              href={`/shop-default-grid`}
              className="tf-btn btn-fill wow fadeInUp"
            >
              <span className="text">Buy at a discount - 25%</span>
              <i className="icon icon-arrowUpRight" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
