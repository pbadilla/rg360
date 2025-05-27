import BannerTab2 from "@/components/common/BannerTab2";
import Categories from "@/components/common/Categories";
import Features from "@/components/common/Features";
import MarqueeSection2 from "@/components/common/MarqueeSection2";
import Products5 from "@/components/common/Products5";

import ShopGram4 from "@/components/common/ShopGram4";
import Testimonials2 from "@/components/common/Testimonials2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/homes/cosmetic/Banner";
import Collections from "@/components/homes/cosmetic/Collections";
import Hero from "@/components/homes/cosmetic/Hero";
import React from "react";

export const metadata = {
  title:
    "Home Cosmetic || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function HomeCosmeticPage() {
  return (
    <>
      <Header1 />
      <Hero />
      <MarqueeSection2 />
      <Collections />
      <Categories parentClass="" />
      <Products5 />
      <Banner />
      <BannerTab2 parentClass="flat-spacing" />
      <Testimonials2 />
      <Features parentClass="flat-spacing line-top-container" />
      <ShopGram4 />
      <Footer1 />
    </>
  );
}
