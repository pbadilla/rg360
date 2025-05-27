import Features from "@/components/common/Features";
import MarqueeSection2 from "@/components/common/MarqueeSection2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar3 from "@/components/headers/Topbar3";
import BannerTab from "@/components/homes/activewear/BannerTab";
import Collections from "@/components/homes/activewear/Collections";
import Hero from "@/components/homes/activewear/Hero";
import Lookbook from "@/components/homes/activewear/Lookbook";
import Products from "@/components/homes/activewear/Products";
import Products2 from "@/components/homes/activewear/Products2";
import ShopGram from "@/components/homes/activewear/ShopGram";
import Testimonials from "@/components/homes/activewear/Testimonials";
import React from "react";

export const metadata = {
  title:
    "Home Active Wear || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function HomeActivemearPage() {
  return (
    <>
      <Topbar3 />
      <Header1 fullWidth />
      <Hero />
      <MarqueeSection2 parentClass="tf-marquee border-0" />
      <Collections />
      <Products />
      <Lookbook />
      <BannerTab />
      <Products2 />
      <Testimonials />
      <Features parentClass="flat-spacing line-top-container" />
      <ShopGram />
      <Footer1 border={false} />
    </>
  );
}
