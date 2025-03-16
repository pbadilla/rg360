import ProductCard1 from "@/components/productCards/ProductCard1";
import { products7 } from "@/data/products";
import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Products2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Discover Men's</h3>
          <p className="subheading text-secondary">
            Browse our Top Trending: the hottest picks loved by all.
          </p>
        </div>
        <div className="tf-grid-layout md-col-2">
          <div className="tf-grid-layout tf-col-2">
            {/* card product 1 */}
            {products7.map((product, i) => (
              <ProductCard1 product={product} key={i} />
            ))}
          </div>
          <div className="banner-discover-right">
            <div className="banner-cls-discover hover-img">
              <Link href={`/shop-default-grid`} className="img-style">
                <Image
                  className="lazyload"
                  data-src="/images/banner/discover-women.jpg"
                  alt="cls-tiktok"
                  src="/images/banner/discover-women.jpg"
                  width={900}
                  height={1563}
                />
              </Link>
              <div className="cls-content">
                <div className="box-title-top wow fadeInUp">
                  <h3 className="title">
                    <Link
                      href={`/shop-default-grid`}
                      className="link text-white"
                    >
                      Shop our top picks
                    </Link>
                  </h3>
                  <p className="subtitle text-white">
                    Reserved for special occasions
                  </p>
                </div>
                <div className="wow fadeInUp">
                  <Link
                    href={`/shop-default-grid`}
                    className="tf-btn btn-fill btn-white"
                  >
                    <span className="text">Shop Now</span>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
