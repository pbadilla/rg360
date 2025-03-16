"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products54 } from "@/data/products";
import React, { useEffect, useState } from "react";
const tabItems = ["PADDLES", "BALLS", "WEARS", "SHOES", "ACCESSORIES"];
export default function Products() {
  const [activeItem, setActiveItem] = useState(tabItems[0]); // Default the first item as active
  const [selectedItems, setSelectedItems] = useState(products54);
  useEffect(() => {
    document.getElementById("newArrivals3").classList.remove("filtered");
    setTimeout(() => {
      setSelectedItems(
        products54.filter((elm) => elm.tabFilterOptions.includes(activeItem))
      );
      document.getElementById("newArrivals3").classList.add("filtered");
    }, 300);
  }, [activeItem]);
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-3 text-center wow fadeInUp">
          <h2 className="fw-semibold text-uppercase font-4 title">
            Features Product
          </h2>
          <ul className="tab-product justify-content-sm-center" role="tablist">
            {tabItems.map((item) => (
              <li key={item} className="nav-tab-item">
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
              className="tab-pane active show  tabFilter filtered"
              id="newArrivals3"
              role="tabpanel"
            >
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4 row-gap-lg-40">
                {selectedItems.map((product, i) => (
                  <ProductCard1 isNotImageRatio key={i} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
