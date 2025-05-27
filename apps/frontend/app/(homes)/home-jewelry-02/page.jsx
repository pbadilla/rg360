import Features from "@/components/common/Features";
import MarqueeSection2 from "@/components/common/MarqueeSection2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar5 from "@/components/headers/Topbar5";
import Categories from "@/components/homes/jewelry-02/Categories";
import Collections from "@/components/homes/jewelry-02/Collections";
import Hero from "@/components/homes/jewelry-02/Hero";
import NewsLetter from "@/components/homes/jewelry-02/NewsLetter";
import Products1 from "@/components/homes/jewelry-02/Products";
import Products2 from "@/components/homes/jewelry-02/Products2";
import Shopgram from "@/components/homes/jewelry-02/Shopgram";
import Testimonials from "@/components/homes/jewelry-02/Testimonials";
import React from "react";

export const metadata = {
  title:
    "Home Jewelry 02 || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function HomeJeweleryPage2() {
  return (
    <>
      <Topbar5 parentClass="tf-topbar style-2 line-bt" />
      <Header1 />
      <Hero />
      <Categories />
      <Products1 parentClass="flat-spacing pt-0" />
      <Collections />
      <Products2 parentClass="flat-spacing" />
      <Testimonials />
      <Features parentClass="flat-spacing line-top-containe pt-0" />
      <Shopgram />
      <MarqueeSection2 />
      <NewsLetter />
      <Footer1 />
    </>
  );
}
