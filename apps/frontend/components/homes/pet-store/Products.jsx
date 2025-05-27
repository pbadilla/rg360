"use client";
import ProductCard5 from "@/components/productCards/ProductCard5";
import { products34 } from "@/data/products";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";

const tabItems = ["For Cat", "For Dog", "Small Pet", "Pharmacy", "Sale"];
export default function Products() {
  const [activeItem, setActiveItem] = useState(tabItems[0]); // Default the first item as active

  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    document.getElementById("ForCat").classList.remove("filtered");
    setTimeout(() => {
      setSelectedItems(
        products34.filter((elm) => elm.tabFilterOptions.includes(activeItem))
      );

      document.getElementById("ForCat").classList.add("filtered");
    }, 300);
  }, [activeItem]);
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3>Today's Top Picks</h3>
          <ul
            className="tab-product-v2 justify-content-sm-center"
            role="tablist"
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
        </div>
        <div className="flat-animate-tab">
          <div className="tab-content">
            <div
              className="tab-pane active show tabFilter filtered"
              id="ForCat"
              role="tabpanel"
            >
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-5">
                {selectedItems.map((product, i) => (
                  <ProductCard5 product={product} key={i} />
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
