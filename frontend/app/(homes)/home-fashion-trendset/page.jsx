import Features from "@/components/common/Features";
import ShopGram from "@/components/common/ShopGram2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Banner from "@/components/homes/fashion-trendset/Banner";
import Blogs from "@/components/homes/fashion-trendset/Blogs";
import Collectons from "@/components/homes/fashion-trendset/Collectons";
import Hero from "@/components/homes/fashion-trendset/Hero";
import Products from "@/components/homes/fashion-trendset/Products";
import Products2 from "@/components/homes/fashion-trendset/Products2";
import Testimonials from "@/components/homes/fashion-trendset/Testimonials";
import React from "react";

export const metadata = {
  title:
    "Home Fashion Trendset || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function HomeFashionTrendsetPage() {
  return (
    <>
      <Header1 />
      <Topbar2 />
      <Hero />
      <Products />
      <Banner />
      <Products2 parentClass="flat-spacing" />
      <Collectons />
      <Testimonials />
      <Blogs />
      <Features />
      <ShopGram />
      <Footer1 />
    </>
  );
}
