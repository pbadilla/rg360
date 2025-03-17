import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Collections() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div
          className="wow fadeInUp swiper tf-sw-mobile"
          data-screen={767}
          data-preview={1}
          data-space={15}
        >
          <div className="swiper-wrapper grid-cls-v2">
            <div className="swiper-slide item1">
              <div className="collection-position-2 hover-img">
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src="/images/collections/grid-cls/women-cls3.jpg"
                    alt="banner-cls"
                    src="/images/collections/grid-cls/women-cls3.jpg"
                    width={945}
                    height={945}
                  />
                </a>
                <div className="content">
                  <Link href={`/shop-categories-top`} className="cls-btn">
                    <h6 className="text">Women</h6>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="swiper-slide item2">
              <div className="collection-position-2 hover-img">
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src="/images/collections/grid-cls/men-cls3.jpg"
                    alt="banner-cls"
                    src="/images/collections/grid-cls/men-cls3.jpg"
                    width={942}
                    height={450}
                  />
                </a>
                <div className="content">
                  <Link href={`/shop-categories-top`} className="cls-btn">
                    <h6 className="text">Men</h6>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="swiper-slide item3">
              <div className="collection-position-2 hover-img">
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src="/images/collections/grid-cls/accessories-cls2.jpg"
                    alt="banner-cls"
                    src="/images/collections/grid-cls/accessories-cls2.jpg"
                    width={945}
                    height={450}
                  />
                </a>
                <div className="content">
                  <Link href={`/shop-categories-top`} className="cls-btn">
                    <h6 className="text">Accessories</h6>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="sw-pagination-mb sw-dots type-circle justify-content-center d-md-none d-flex" />
        </div>
      </div>
    </section>
  );
}
