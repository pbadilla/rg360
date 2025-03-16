import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function Banner() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          <div className="collection-position-2 style-7 hover-img">
            <Link href={`/shop-collection`} className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/cls-electronic-8.jpg"
                alt="electronic-cls"
                src="/images/collections/cls-electronic-8.jpg"
                width={945}
                height={945}
              />
            </Link>
            <div className="content space-lg align-items-center d-flex flex-column gap-12">
              <h3 className="title fw-7 font-5">
                <Link href={`/shop-collection`} className="link">
                  Phone Case Collection
                </Link>
              </h3>
              <span className="text-title text-secondary">
                Designed for every moment, made to last.
              </span>
              <Link
                href={`/shop-default-grid`}
                className="tf-btn btn-fill btn-md wmax"
              >
                <span className="text">Shop Now</span>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
          <div className="collection-position-2 style-5 hover-img">
            <Link href={`/shop-collection`} className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/cls-electronic-9.jpg"
                alt="electronic-cls"
                src="/images/collections/cls-electronic-9.jpg"
                width={945}
                height={945}
              />
            </Link>
            <div className="content justify-items-center gap-12">
              <h3 className="title fw-7 font-5">
                <Link href={`/shop-collection`} className="link">
                  Headphone Series
                </Link>
              </h3>
              <span className="text-title text-secondary">
                Immerse in sound, experience clarity.
              </span>
              <Link
                href={`/shop-default-grid`}
                className="tf-btn btn-fill btn-md wmax"
              >
                <span className="text">Shop Now</span>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
