"use client";

import Image from "next/image";

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
    <section className="banner-lookbook">
      <Image
        className="lazyload"
        data-src="/images/banner/banner-lb-gaming.jpg"
        alt="banner"
        src="/images/banner/banner-lb-gaming.jpg"
        width={1920}
        height={692}
      />
      <div className="lookbook-item position5">
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
            <LookbookProduct product={lookbookProducts[10]} />
          </div>
        </div>
      </div>
    </section>
  );
}
