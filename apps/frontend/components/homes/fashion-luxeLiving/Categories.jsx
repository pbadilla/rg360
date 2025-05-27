import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Categories() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Shop by categories</h3>
        </div>
        <div className="grid-cls grid-cls-v1">
          <div className="item1 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/grid-cls/women-cls.jpg"
                alt="banner-cls"
                src="/images/collections/grid-cls/women-cls.jpg"
                width={615}
                height={819}
              />
            </a>
            <div className="content">
              <Link href={`/shop-categories-top`} className="cls-btn">
                <h6 className="text">Women</h6>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
          <div className="item2 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/grid-cls/promotion-cls.jpg"
                alt="banner-cls"
                src="/images/collections/grid-cls/promotion-cls.jpg"
                width={615}
                height={387}
              />
            </a>
            <div className="content">
              <Link href={`/shop-categories-top`} className="cls-btn">
                <h6 className="text">Promotion</h6>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
          <div className="item3 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/grid-cls/accessories-cls.jpg"
                alt="banner-cls"
                src="/images/collections/grid-cls/accessories-cls.jpg"
                width={615}
                height={387}
              />
            </a>
            <div className="content">
              <Link href={`/shop-categories-top`} className="cls-btn">
                <h6 className="text">Accessories</h6>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
          <div className="item4 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/grid-cls/men-cls.jpg"
                alt="banner-cls"
                src="/images/collections/grid-cls/men-cls.jpg"
                width={615}
                height={819}
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
      </div>
    </section>
  );
}
