import Footer1 from "@/components/footers/Footer1";
import Header13 from "@/components/headers/Header13";
import Topbar7 from "@/components/headers/Topbar7";
import Banner from "@/components/homes/home-baby/Banner";
import Blogs from "@/components/homes/home-baby/Blogs";
import Categories from "@/components/homes/home-baby/Categories";
import CollectionBanner from "@/components/homes/home-baby/CollectionBanner";
import Collections from "@/components/homes/home-baby/Collections";
import Features from "@/components/homes/home-baby/Features";
import Hero from "@/components/homes/home-baby/Hero";
import Products from "@/components/homes/home-baby/Products";
import Products2 from "@/components/homes/home-baby/Products2";
import React from "react";

export const metadata = {
  title: "Home Baby || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};
export default function page() {
  return (
    <>
      <Topbar7 />
      <Header13 />
      <Hero />
      <Collections />
      <Categories />
      <Products />
      <Features />
      <Banner />
      <Products2 />
      <Blogs />
      <CollectionBanner />
      <Footer1 dark />
    </>
  );
}
