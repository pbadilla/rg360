import Features from "@/components/common/Features";
import ShopGram from "@/components/common/ShopGram";
import Testimonials from "@/components/common/Testimonials";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/homes/eleganceNest/Banner";
import Categories from "@/components/homes/eleganceNest/Categories";
import Collections from "@/components/homes/eleganceNest/Collections";
import Hero from "@/components/homes/eleganceNest/Hero";
import Products from "@/components/common/Products4";
import Products2 from "@/components/common/Products2";
import React from "react";
import CartTogglerSide from "@/components/common/CartTogglerSide";
import MarqueeSection2 from "@/components/common/MarqueeSection2";

export const metadata = {
  title:
    "Home Fashion Elegancenest || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function HomeFashionElegentNestPage() {
  return (
    <>
      <Header1 />
      <Hero />
      <MarqueeSection2 />
      <Categories />
      <Products />
      <Collections />
      <Products2 parentClass="flat-spacing pt-0" />
      <Banner />
      <Features />
      <Testimonials parentClass="" />
      <ShopGram parentClass="flat-spacing" />
      <Footer1 />
      <CartTogglerSide />
    </>
  );
}
