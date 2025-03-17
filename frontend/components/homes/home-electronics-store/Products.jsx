"use client";

import ProductCard13 from "@/components/productCards/ProductCard13";
import { products50 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const tabItems = [
  "Headphone",
  "Earphone",
  "Speaker",
  "Chargers",
  "Cables",
  "Protection",
];
export default function Products() {
  const [activeItem, setActiveItem] = useState(tabItems[0]); // Default the first item as active
  const [selectedItems, setSelectedItems] = useState(products50);
  useEffect(() => {
    document.getElementById("newArrivals").classList.remove("filtered");
    setTimeout(() => {
      setSelectedItems(
        products50.filter((elm) => elm.tabFilterOptions.includes(activeItem))
      );
      document.getElementById("newArrivals").classList.add("filtered");
    }, 300);
  }, [activeItem]);
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="heading-section-4 flex-wrap wow fadeInUp">
          <h3 className="fw-7 font-5">Today's Top Picks</h3>
          <ul
            className="tab-product-v4 justify-content-sm-center"
            role="tablist"
          >
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
              id="newArrivals"
              role="tabpanel"
            >
              <Swiper
                dir="ltr"
                className="swiper tf-sw-latest"
                spaceBetween={15}
                breakpoints={{
                  0: { slidesPerView: 2 },
                  575: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  992: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  el: ".spd21",
                }}
              >
                {selectedItems.map((product, i) => (
                  <SwiperSlide className="swiper-slide" key={i}>
                    <ProductCard13 product={product} />
                  </SwiperSlide>
                ))}

                <div className="sw-pagination-latest sw-dots type-circle justify-content-center spd21" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
