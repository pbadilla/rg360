import { categories2 } from "@/data/collections";
import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Collections() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Shop by categories</h3>
        </div>
        <div className="grid-cls grid-cls-v1">
          {categories2.map((category) => (
            <div
              key={category.id}
              className={`item${category.id} collection-position-2 hover-img`}
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src={category.imgSrc}
                  alt={category.alt}
                  src={category.imgSrc}
                  width={category.width}
                  height={category.height}
                />
              </a>
              <div className="content">
                <Link href={`/shop-categories-top`} className="cls-btn">
                  <h6 className="text">{category.title}</h6>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
