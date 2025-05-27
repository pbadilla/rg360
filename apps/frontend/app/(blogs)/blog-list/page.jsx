import BlogDefault from "@/components/blogs/BlogDefault";
import BlogList from "@/components/blogs/BlogList";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Link from "next/link";
import React from "react";

export default function BlogListPage() {
  return (
    <>
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Blog Default</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>
                  <a className="link" href="#">
                    Blog
                  </a>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Blog List</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BlogList />
      <Footer1 />
    </>
  );
}
