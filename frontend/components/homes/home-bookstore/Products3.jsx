"use client";
import { products49 } from "@/data/products";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
export default function Products3() {
  const { setQuickViewItem } = useContextElement();

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section type-space-2 wow fadeInUp">
          <h3>Best Sale 2024</h3>
        </div>
        <div className="tf-grid-layout sm-col-2 xl-col-3 column-gap-xl-28 row-gap-xl-16">
          {products49.map((product) => (
            <div
              key={product.id}
              className="card-product list-st-2 wow fadeInUp"
              data-wow-delay={product.wowDelay}
            >
              <div className="card-product-wrapper type-width-2">
                <Link
                  href={`/product-detail/${product.id}`}
                  className="product-img"
                >
                  <Image
                    className="lazyload img-product"
                    data-src={product.imgSrc}
                    alt="image-product"
                    src={product.imgSrc}
                    width={351}
                    height={468}
                  />
                  <Image
                    className="lazyload img-hover"
                    data-src={product.imgSrc}
                    alt="image-product"
                    src={product.imgSrc}
                    width={351}
                    height={468}
                  />
                </Link>
                {product.onSale && (
                  <div className="on-sale-wrap">
                    <span className="on-sale-item">{product.onSale}</span>
                  </div>
                )}
              </div>
              <div className="card-product-info justify-content-center">
                <Link
                  href={`/product-detail/${product.id}`}
                  className="title link"
                >
                  {product.title}
                </Link>
                <div className="bottom">
                  <div className="inner-left">
                    <div className="box-rating">
                      <ul className="list-star">
                        {[...Array(product.rating)].map((_, index) => (
                          <li key={index} className="icon icon-star" />
                        ))}
                      </ul>
                      <span className="text-caption-1 text-secondary">
                        ({product.reviews})
                      </span>
                    </div>
                    <span className="price py-4">
                      {product.oldPrice && (
                        <span className="old-price">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}{" "}
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <a
                    href="#quickView"
                    onClick={() => setQuickViewItem(product)}
                    data-bs-toggle="modal"
                    className="box-icon"
                  >
                    <svg
                      width={25}
                      height={24}
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.2187 10.3327V5.99935C16.2187 4.85008 15.7622 3.74788 14.9495 2.93522C14.1369 2.12256 13.0347 1.66602 11.8854 1.66602C10.7361 1.66602 9.63394 2.12256 8.82129 2.93522C8.00863 3.74788 7.55208 4.85008 7.55208 5.99935V10.3327M4.30208 8.16602H19.4687L20.5521 21.166H3.21875L4.30208 8.16602Z"
                        stroke="#181818"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
