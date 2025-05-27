import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Collections2() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          <div className="collection-position style-1 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/banner-collection/banner-cls33.jpg"
                alt="banner-cls"
                src="/images/collections/banner-collection/banner-cls33.jpg"
                width={946}
                height={480}
              />
            </a>
            <div className="content">
              <h3 className="title wow fadeInUp">
                <Link href={`/shop-default-grid`} className="link">
                  New Arrival
                </Link>
              </h3>
              <p className="desc wow fadeInUp">
                Reserved for special occasions
              </p>
              <div className="wow fadeInUp">
                <Link href={`/shop-default-grid`} className="btn-line">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="collection-position style-1 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/banner-collection/banner-cls34.jpg"
                alt="banner-cls"
                src="/images/collections/banner-collection/banner-cls34.jpg"
                width={946}
                height={480}
              />
            </a>
            <div className="content">
              <h3 className="title wow fadeInUp">
                <Link href={`/shop-default-grid`} className="link">
                  Gift Set
                </Link>
              </h3>
              <p className="desc wow fadeInUp">
                Reserved for special occasions
              </p>
              <div className="wow fadeInUp">
                <Link href={`/shop-default-grid`} className="btn-line">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
