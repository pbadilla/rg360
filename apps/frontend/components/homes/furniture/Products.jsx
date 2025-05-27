"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products12 } from "@/data/products";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";

const tabItems = ["New Arrivals", "Best Seller", "On Sale"];
export default function Products() {
  const [activeItem, setActiveItem] = useState(tabItems[0]); // Default the first item as active
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    document.getElementById("newArrivals").classList.remove("filtered");
    setTimeout(() => {
      setSelectedItems(
        products12.filter((elm) => elm.tabFilterOptions.includes(activeItem))
      );

      document.getElementById("newArrivals").classList.add("filtered");
    }, 300);
  }, [activeItem]);

  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="flat-animate-tab">
          <ul
            className="tab-product justify-content-sm-center wow fadeInUp"
            data-wow-delay="0s"
          >
            {tabItems.map((item) => (
              <li key={item} className="nav-tab-item" role="presentation">
                <a
                  href={`#`} // Generate href dynamically
                  className={activeItem === item ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    setActiveItem(item);
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane active show tabFilter filtered"
              id="newArrivals"
              role="tabpanel"
            >
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {selectedItems.map((product, i) => (
                  <ProductCard1 key={i} product={product} />
                ))}
              </div>
              <div className="sec-btn text-center">
                <Link href={`/shop-default-grid`} className="btn-line">
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
