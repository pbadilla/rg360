import Footer1 from "@/components/footers/Footer1";
import Header14 from "@/components/headers/Header14";
import Topbar8 from "@/components/headers/Topbar8";
import Banner from "@/components/homes/home-bookstore/Banner";
import BannerCollection from "@/components/homes/home-bookstore/BannerCollection";
import Categories from "@/components/homes/home-bookstore/Categories";
import Collections from "@/components/homes/home-bookstore/Collections";
import Features2 from "@/components/homes/home-bookstore/Features2";
import Hero from "@/components/homes/home-bookstore/Hero";
import NewsLetter from "@/components/homes/home-bookstore/NewsLetter";
import Products from "@/components/homes/home-bookstore/Products";
import Products2 from "@/components/homes/home-bookstore/Products2";
import Products3 from "@/components/homes/home-bookstore/Products3";
import React from "react";

export const metadata = {
  title:
    "Home Bookstore || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};
export default function page() {
  return (
    <>
      <Header14 />
      <Topbar8 />
      <Hero />
      <Categories />
      <Collections />
      <Products />
      <Banner />
      <Products2 />
      <BannerCollection />
      <Products3 />
      <Features2 />
      <NewsLetter />
      <Footer1 />
    </>
  );
}
