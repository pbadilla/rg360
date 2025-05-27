"use client";
import ProductCard2 from "@/components/productCards/ProductCard2";
import { products3 } from "@/data/products";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Lookbook() {
  useEffect(() => {
    const hoverWrap = document.querySelector(".bundle-hover-wrap");
    const pinItems = document.querySelectorAll(".bundle-pin-item");
    const hoverItems = document.querySelectorAll(".bundle-hover-item");

    if (hoverWrap) {
      const handleMouseOver = (event) => {
        hoverWrap.classList.add("has-hover");

        const targetId = event.target.id;

        // Ensure targetId is valid
        if (targetId) {
          const hoverItem = hoverWrap.querySelector(`.${event.target.id}`); // Matches class with spaces
          if (hoverItem) hoverItem.style.display = "block";

          hoverItems.forEach((item) => {
            if (item !== hoverItem) {
              item.classList.add("no-hover");
            }
          });
        }
      };

      const handleMouseLeave = () => {
        hoverWrap.classList.remove("has-hover");
        hoverItems.forEach((item) => {
          item.classList.remove("no-hover");
          item.style.display = ""; // Reset the display property if modified
        });
      };

      pinItems.forEach((pinItem) => {
        pinItem.addEventListener("mouseover", handleMouseOver);
        pinItem.addEventListener("mouseleave", handleMouseLeave);
      });

      // Cleanup to avoid memory leaks
      return () => {
        pinItems.forEach((pinItem) => {
          pinItem.removeEventListener("mouseover", handleMouseOver);
          pinItem.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    }
  }, []);
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row flat-with-text-lookbook wrap-lookbook-hover">
          <div className="col-lg-6 col-md-7">
            <div className="banner-img">
              <Image
                className="lazyload"
                data-src="/images/banner/banner-lookbook-2.jpg"
                alt="banner"
                src="/images/banner/banner-lookbook-2.jpg"
                width={630}
                height={840}
              />
              <div className="tf-pin-btn style-dark pin-1 bundle-pin-item swiper-button">
                <span id="pin1" />
              </div>
              <div className="tf-pin-btn style-dark pin-2 bundle-pin-item swiper-button">
                <span id="pin2" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-5">
            <div className="lookbook-content">
              <div className="box-title">
                <h3 className="title wow fadeInUp">Trendsetters' Lookbook</h3>
                <p className="sub-desc text-secondary wow fadeInUp">
                  Discover the latest trends and classic styles in our Fashion
                  Forward Lookbook. Elevate your style today!
                </p>
              </div>
              <Swiper
                dir="ltr"
                className="swiper tf-sw-lookbook bundle-hover-wrap"
                spaceBetween={15}
                slidesPerView={2}
                breakpoints={{
                  1024: { slidesPerView: 2, spaceBetween: 30 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  0: { slidesPerView: 2, spaceBetween: 15 },
                }}
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  el: ".spd48",
                }}
              >
                {products3.map((item, i) => (
                  <SwiperSlide key={i}>
                    <ProductCard2 addedClass={`pin${i + 1}`} product={item} />
                  </SwiperSlide>
                ))}
                <div className="sw-pagination-lookbook sw-dots type-circle justify-content-center spd48" />
              </Swiper>
              <div className="total-lb wow fadeInUp">
                <Link href={`/shop-default-grid`} className="tf-btn btn-reset">
                  <span className="text">Buy at a discount - $69.99</span>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
