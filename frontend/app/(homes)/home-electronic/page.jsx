import Brands from "@/components/common/Brands";
import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header11 from "@/components/headers/Header11";
import Topbar6 from "@/components/headers/Topbar6";
import Banner from "@/components/homes/electronic/Banner";
import Categories from "@/components/homes/electronic/Categories";
import Collections from "@/components/homes/electronic/Collections";
import Collections2 from "@/components/homes/electronic/Collections2";
import Hero from "@/components/homes/electronic/Hero";
import Products from "@/components/homes/electronic/Products";
import Products2 from "@/components/homes/electronic/Products2";
import Products3 from "@/components/homes/electronic/Products3";
import Products4 from "@/components/homes/electronic/Products4";
import React from "react";

export const metadata = {
  title:
    "Home Electronics || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function HomeElectronicPage() {
  return (
    <>
      <Topbar6 />
      <Header11 />
      <Hero />
      <Categories />
      <Products />
      <Collections />
      <Products2 />
      <Banner />
      <Products3 />
      <Products4 />
      <Collections2 />
      <Features parentClass="flat-spacing-4 line-top-container" />
      <Brands parentClass="flat-spacing-5 line-top" />
      <Footer1 dark />
    </>
  );
}
