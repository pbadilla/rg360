"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LookbookProduct from "@/components/common/LookbookProduct";
import { lookbookProducts } from "@/data/products";
export default function Lookbook() {
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
        data-src="/images/banner/banner-lookbook-1.jpg"
        alt="banner"
        src="/images/banner/banner-lookbook-1.jpg"
        width={1920}
        height={574}
      />
      <div className="lookbook-item">
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
            <LookbookProduct product={lookbookProducts[6]} />
          </div>
        </div>
      </div>
    </section>
  );
}
