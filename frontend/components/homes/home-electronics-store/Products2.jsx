"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products51 } from "@/data/products";
import Link from "next/link";
import React from "react";

export default function Products2() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-4 wow fadeInUp">
          <h3 className="fw-7 font-5">Best Sellers</h3>
          <Link href={`/shop-collection`} className="btn-line">
            View All Products
          </Link>
        </div>
        <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-3">
          {products51.map((product, i) => (
            <ProductCard1 isNotImageRatio product={product} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
