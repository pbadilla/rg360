import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function Banner() {
  return (
    <section className="">
      <div className="container">
        <div className="wg-library">
          <div className="library-info">
            <h3 className="library-heading">Enrich Your Library Today!</h3>
            <p className="text">
              Handpicked Titles in Finance, Psychology &amp; More - On Sale Now.
            </p>
            <Link href={`/shop-default-grid`} className="tf-btn btn-fill">
              <span className="text">View Collection</span>
              <i className="icon icon-arrowUpRight" />
            </Link>
          </div>
          <div className="library-img">
            <Image
              className="lazyload"
              data-src="/images/banner/banner-bookstore.jpg"
              alt="delivery-img"
              src="/images/banner/banner-bookstore.jpg"
              width={1275}
              height={510}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
