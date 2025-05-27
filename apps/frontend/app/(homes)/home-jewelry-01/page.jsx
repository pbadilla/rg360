import Features from "@/components/common/Features";
import Testimonials3 from "@/components/common/Testimonials3";
import Footer1 from "@/components/footers/Footer1";
import Header10 from "@/components/headers/Header10";
import Topbar3 from "@/components/headers/Topbar3";
import Blogs from "@/components/homes/jewelry-01/Blogs";
import Categories from "@/components/homes/jewelry-01/Categories";
import Collections from "@/components/homes/jewelry-01/Collections";
import Hero from "@/components/homes/jewelry-01/Hero";
import Products4 from "@/components/homes/jewelry-01/Products";
import Products2 from "@/components/homes/jewelry-01/Products2";
import Shopgram from "@/components/homes/jewelry-01/Shopgram";
import Tiktok from "@/components/homes/jewelry-01/Tiktok";
import React from "react";

export const metadata = {
  title:
    "Home Jewelry 01 || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function HomeJeweleryPage1() {
  return (
    <>
      <Topbar3 />
      <Header10 />
      <Hero />
      <Tiktok parentClass="flat-spacing" />
      <Categories />
      <Products4 parentClass="flat-spacing pt-0" />
      <Collections />
      <Products2 parentClass="flat-spacing pt-0" />
      <Testimonials3 />
      <Blogs />
      <Features parentClass="flat-spacing pt-0" />
      <Shopgram />
      <Footer1 />
    </>
  );
}
