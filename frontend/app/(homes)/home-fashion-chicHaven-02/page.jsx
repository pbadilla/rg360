import Features from "@/components/common/Features";
import MarqueeSection from "@/components/common/MarqueeSection";
import Products2 from "@/components/common/Products2";
import ShopGram from "@/components/common/ShopGram2";
import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header5 from "@/components/headers/Header5";
import Topbar5 from "@/components/headers/Topbar5";
import Banner from "@/components/homes/fashion-chicHaven-02/Banner";
import Categories from "@/components/homes/fashion-chicHaven-02/Categories";
import Hero from "@/components/homes/fashion-chicHaven-02/Hero";
import Products from "@/components/homes/fashion-chicHaven-02/Products";
import SingleProduct from "@/components/homes/fashion-chicHaven-02/SingleProduct";
import React from "react";

export const metadata = {
  title:
    "Home Fashion Chichaven 02 || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function HomeFashionChicHavenPage2() {
  return (
    <>
      <Topbar5 />
      <Header5 />
      <Hero />
      <Products />
      <MarqueeSection />
      <Categories />
      <Products2 title="week’s highlights" parentClass="flat-spacing" />
      <SingleProduct />
      <Testimonials />
      <Banner />
      <Features parentClass="flat-spacing" />
      <ShopGram />
      <Footer1 />
    </>
  );
}
