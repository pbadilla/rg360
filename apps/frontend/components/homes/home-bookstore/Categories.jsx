import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function Categories() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="grid-cls grid-cls-4">
          <div className="item1 collection-default style-1 text-center hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/cls-bookstore-1.jpg"
                alt="banner-cls"
                src="/images/collections/cls-bookstore-1.jpg"
                width={938}
                height={528}
              />
            </a>
            <div className="content">
              <h3 className="title wow fadeInUp">
                <Link href={`/shop-collection`} className="link">
                  Big Sale Alert!
                </Link>
              </h3>
              <p className="desc mb-xl-12 text-clamp-md-2 wow fadeInUp">
                Enjoy massive discounts of up to 60% on a wide range of
                <br className="d-xxl-block d-none" />
                bestselling books across all genres.
              </p>
              <div className="wow fadeInUp">
                <Link href={`/shop-collection`} className="btn-line">
                  Shop the Sale
                </Link>
              </div>
            </div>
          </div>
          <div className="item2 collection-default style-1 text-center hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/cls-bookstore-2.jpg"
                alt="banner-cls"
                src="/images/collections/cls-bookstore-2.jpg"
                width={938}
                height={528}
              />
            </a>
            <div className="content">
              <h3 className="title wow fadeInUp">
                <Link href={`/shop-collection`} className="link">
                  New Releases
                </Link>
              </h3>
              <p className="desc mb-xl-12 text-clamp-md-2 wow fadeInUp">
                Be the first to explore the latest arrivals in fiction,
                non-fiction, <br className="d-xxl-block d-none" />
                and more. Discover your next favorite read today!
              </p>
              <div className="wow fadeInUp">
                <Link href={`/shop-collection`} className="btn-line">
                  New Arrivals
                </Link>
              </div>
            </div>
          </div>
          <div className="item3 collection-default style-1 style-row type-space-xl hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/cls-bookstore-3.jpg"
                alt="banner-cls"
                src="/images/collections/cls-bookstore-3.jpg"
                width={968}
                height={540}
              />
            </a>
            <div className="content">
              <h3 className="title wow fadeInUp">
                <Link href={`/shop-collection`} className="link">
                  The Most Anticipated
                </Link>
              </h3>
              <p className="desc mb-xl-12 wow fadeInUp">
                Discover the year’s most eagerly awaited books that everyone is
                talking about. From gripping novels to insightful non-fiction,
                these titles are set <br />
                to inspire, entertain, and captivate your imagination.
              </p>
              <div className="wow fadeInUp">
                <Link href={`/shop-default-grid`} className="tf-btn btn-fill">
                  <span className="text">Explore Now </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
