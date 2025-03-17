import Features2 from "@/components/common/Features2";
import Footer1 from "@/components/footers/Footer1";
import Header17 from "@/components/headers/Header17";
import Topbar11 from "@/components/headers/Topbar11";
import Banner from "@/components/homes/home-sneaker/Banner";
import Banner2 from "@/components/homes/home-sneaker/Banner2";
import BannerTab from "@/components/homes/home-sneaker/BannerTab";
import Brands from "@/components/homes/home-sneaker/Brands";
import Gallery from "@/components/homes/home-sneaker/Gallery";
import Hero from "@/components/homes/home-sneaker/Hero";
import Marquee from "@/components/homes/home-sneaker/Marquee";
import Marquee2 from "@/components/homes/home-sneaker/Marquee2";
import Products from "@/components/homes/home-sneaker/Products";
import Products2 from "@/components/homes/home-sneaker/Products2";
import SingleProduct from "@/components/homes/home-sneaker/SingleProduct";
import Testimonials from "@/components/homes/home-sneaker/Testimonials";
import React from "react";

export const metadata = {
  title:
    "Home Sneaker || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};
export default function page() {
  return (
    <>
      <Topbar11 />
      <Header17 />
      <Marquee />
      <Hero />
      <Brands />
      <Products />
      <Banner />
      <BannerTab />
      <Products2 />
      <Marquee2 />
      <SingleProduct />
      <Banner2 />
      <Testimonials />
      <Features2 parentClass="flat-spacing" />
      <Gallery />
      <Footer1 dark />
    </>
  );
}
