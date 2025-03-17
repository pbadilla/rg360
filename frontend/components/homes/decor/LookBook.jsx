"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import LookbookProduct from "@/components/common/LookbookProduct";
import { lookbookProducts } from "@/data/products";
import { useEffect } from "react";
export default function LookBook() {
  useEffect(() => {
    const customDropdown = () => {
      const updateDropdownClass = () => {
        const dropdowns = document.querySelectorAll(".dropdown-custom");

        dropdowns.forEach((dropdown) => {
          if (window.innerWidth <= 991) {
            dropdown.classList.add("dropup");
            dropdown.classList.remove("dropend");
          } else {
            dropdown.classList.add("dropend");
            dropdown.classList.remove("dropup");
          }
        });
      };

      updateDropdownClass();
      window.addEventListener("resize", updateDropdownClass);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", updateDropdownClass);
      };
    };

    customDropdown();
  }, []);

  return (
    <section>
      <Swiper
        className="flat-sw-pagination swiper tf-sw-lookbook sw-lookbook-wrap"
        dir="ltr"
        spaceBetween={0}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd20",
        }}
      >
        <SwiperSlide className="swiper-slide">
          <div className="banner-lookbook">
            <Image
              className="lazyload"
              data-src="/images/banner/banner-lb-furniture1.jpg"
              alt="banner"
              src="/images/banner/banner-lb-furniture1.jpg"
              width={1920}
              height={600}
            />
            <div className="lookbook-item position3">
              <div className="dropdown dropup-center dropdown-custom">
                <div
                  role="dialog"
                  className="tf-pin-btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  <span />
                </div>
                <div className="dropdown-menu">
                  <LookbookProduct product={lookbookProducts[0]} />
                </div>
              </div>
            </div>
            <div className="lookbook-item position4">
              <div className="dropdown dropup-center dropdown-custom">
                <div
                  role="dialog"
                  className="tf-pin-btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span />
                </div>
                <div className="dropdown-menu">
                  <LookbookProduct product={lookbookProducts[1]} />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="banner-lookbook">
            <Image
              className="lazyload"
              data-src="/images/banner/banner-lb-furniture2.jpg"
              alt="banner"
              src="/images/banner/banner-lb-furniture2.jpg"
              width={1920}
              height={600}
            />
            <div className="lookbook-item position3">
              <div className="dropdown dropup-center dropdown-custom">
                <div
                  role="dialog"
                  className="tf-pin-btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span />
                </div>
                <div className="dropdown-menu">
                  <LookbookProduct product={lookbookProducts[2]} />
                </div>
              </div>
            </div>
            <div className="lookbook-item position4">
              <div className="dropdown dropup-center dropdown-custom">
                <div
                  role="dialog"
                  className="tf-pin-btn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span />
                </div>
                <div className="dropdown-menu">
                  <LookbookProduct product={lookbookProducts[3]} />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <div className="sw-pagination-lookbook sw-dots type-circle white-circle-line justify-content-center spd20" />
      </Swiper>
    </section>
  );
}
