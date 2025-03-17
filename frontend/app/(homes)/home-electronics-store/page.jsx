import Footer1 from "@/components/footers/Footer1";
import Header15 from "@/components/headers/Header15";
import Topbar9 from "@/components/headers/Topbar9";
import Banner from "@/components/homes/home-electronics-store/Banner";
import Banner2 from "@/components/homes/home-electronics-store/Banner2";
import Blogs from "@/components/homes/home-electronics-store/Blogs";
import Categories from "@/components/homes/home-electronics-store/Categories";
import Delivery from "@/components/homes/home-electronics-store/Delivery";
import Features from "@/components/homes/home-electronics-store/Features";
import Hero from "@/components/homes/home-electronics-store/Hero";
import Products from "@/components/homes/home-electronics-store/Products";
import Products2 from "@/components/homes/home-electronics-store/Products2";
import Testimonials from "@/components/homes/home-electronics-store/Testimonials";
import React from "react";

export const metadata = {
  title:
    "Home Electronics Store || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};
export default function page() {
  return (
    <>
      <Topbar9 />
      <Header15 />
      <Hero />
      <Categories />
      <Banner />
      <Products />
      <Banner2 />
      <Products2 />
      <Delivery />
      <Features parentClass="flat-spacing" />
      <Testimonials />
      <Blogs />
      <Footer1 dark />
    </>
  );
}
