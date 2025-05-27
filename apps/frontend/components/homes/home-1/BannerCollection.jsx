import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function BannerCollection() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          <div className="collection-default hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/banner-collection/banner-cls1.jpg"
                alt="banner-cls"
                src="/images/collections/banner-collection/banner-cls1.jpg"
                width={945}
                height={709}
              />
            </a>
            <div className="content">
              <h3 className="title wow fadeInUp">
                <Link href={`/shop-collection`} className="link">
                  Crossbody bag
                </Link>
              </h3>
              <p className="desc wow fadeInUp">
                From beach to party: Perfect styles for every occasion.
              </p>
              <div className="wow fadeInUp">
                <Link href={`/shop-collection`} className="btn-line">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="collection-position hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/banner-collection/banner-cls2.jpg"
                alt="banner-cls"
                src="/images/collections/banner-collection/banner-cls2.jpg"
                width={945}
                height={945}
              />
            </a>
            <div className="content">
              <h3 className="title">
                <Link
                  href={`/shop-collection`}
                  className="link text-white wow fadeInUp"
                >
                  Capsule Collection
                </Link>
              </h3>
              <p className="desc text-white wow fadeInUp">
                Reserved for special occasions
              </p>
              <div className="wow fadeInUp">
                <Link
                  href={`/shop-collection`}
                  className="btn-line style-white"
                >
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
