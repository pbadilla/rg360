import Footer1 from "@/components/footers/Footer1";
import Header15 from "@/components/headers/Header15";
import Topbar9 from "@/components/headers/Topbar9";
import Blogs from "@/components/homes/home-gaming/Blogs";
import Collections from "@/components/homes/home-gaming/Collections";
import Collections2 from "@/components/homes/home-gaming/Collections2";
import Features from "@/components/homes/home-gaming/Features";
import Hero from "@/components/homes/home-gaming/Hero";
import Lookbook from "@/components/homes/home-gaming/Lookbook";
import Products from "@/components/homes/home-gaming/Products";
import Products2 from "@/components/homes/home-gaming/Products2";
import Testimonials from "@/components/homes/home-gaming/Testimonials";
import React from "react";

export const metadata = {
  title: "Home Gaming || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};
export default function page() {
  return (
    <>
      <Topbar9 />
      <Header15 />
      <Hero />
      <Collections />
      <Products />
      <Collections2 />
      <Lookbook />
      <Products2 />
      <Testimonials />
      <Blogs />
      <Features />
      <Footer1 dark />
    </>
  );
}
