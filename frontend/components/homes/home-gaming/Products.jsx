"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products52 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
const tabItems = [
  "Headphone",
  "Mouse",
  "Keyboard",
  "Mousepad",
  "Cables",
  "Networking",
];
export default function Products() {
  const [activeItem, setActiveItem] = useState(tabItems[0]); // Default the first item as active
  const [selectedItems, setSelectedItems] = useState(products52);
  useEffect(() => {
    document.getElementById("newArrivals2").classList.remove("filtered");
    setTimeout(() => {
      setSelectedItems(
        products52.filter((elm) => elm.tabFilterOptions.includes(activeItem))
      );
      document.getElementById("newArrivals2").classList.add("filtered");
    }, 300);
  }, [activeItem]);
  return (
    <section>
      <div className="container">
        <div className="heading-section-4 wow fadeInUp">
          <div className="heading-left">
            <h3 className="heading font-5 fw-bold">Best Sellers</h3>
            <ul
              className="tab-product style-2 justify-content-sm-center mb-0"
              role="tablist"
            >
              {tabItems.map((item) => (
                <React.Fragment key={item}>
                  <li className="nav-tab-item">
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
                  </li>{" "}
                  <li className="text-line d-none d-sm-block">/</li>
                </React.Fragment>
              ))}
            </ul>
          </div>
          <Link href={`/shop-collection`} className="btn-line">
            View All Products
          </Link>
        </div>
        <div className="flat-animate-tab">
          <div className="tab-content">
            <div
              className="tab-pane active show   tabFilter filtered"
              id="newArrivals2"
              role="tabpanel"
            >
              <Swiper
                dir="ltr"
                className="swiper tf-sw-latest"
                spaceBetween={15}
                modules={[Pagination]}
                slidesPerView={4}
                pagination={{
                  clickable: true,
                  el: ".spd25",
                }}
                breakpoints={{
                  0: { slidesPerView: 2 },
                  575: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  992: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
              >
                {selectedItems.map((product, i) => (
                  <SwiperSlide className="swiper-slide" key={i}>
                    <ProductCard1 product={product} isNotImageRatio />
                  </SwiperSlide>
                ))}

                <div className="sw-pagination-latest sw-dots type-circle justify-content-center spd25" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
