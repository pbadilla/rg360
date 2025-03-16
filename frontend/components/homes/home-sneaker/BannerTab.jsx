"use client";
import { products58 } from "@/data/products";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
export default function BannerTab() {
  useEffect(() => {
    const offsetX = 20;
    const offsetY = 20;

    const handleMouseMove = (e) => {
      const hoverImage = e.currentTarget.querySelector(".hover-image");
      if (hoverImage) {
        hoverImage.style.top = `${e.clientY + offsetY}px`;
        hoverImage.style.left = `${e.clientX + offsetX}px`;
      }
    };

    const handleMouseEnter = (e) => {
      const hoverImage = e.currentTarget.querySelector(".hover-image");
      if (hoverImage) {
        hoverImage.style.transform = "scale(1)";
        hoverImage.style.opacity = "1";
      }
    };

    const handleMouseLeave = (e) => {
      const hoverImage = e.currentTarget.querySelector(".hover-image");
      if (hoverImage) {
        hoverImage.style.transform = "scale(0)";
        hoverImage.style.opacity = "0";
      }
    };

    const elements = document.querySelectorAll(".hover-cursor-img");
    elements.forEach((el) => {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  const { setQuickViewItem } = useContextElement();

  return (
    <section className="flat-spacing pb-0">
      <div className="container">
        <div className="row flat-img-with-text-v2">
          <div className="col-lg-7 col-md-6">
            <div className="banner-left">
              <div className="box-title wow fadeInUp">
                <h3>
                  Step Up Your Game: Discover{" "}
                  <br className="d-xl-block d-none" />
                  The Latest Sneaker Trends
                </h3>
                <p>
                  Explore Our Must-Have Styles: The Hottest Picks Loved by
                  Sneakerheads.
                </p>
              </div>
              <ul className="tab-banner" role="tablist">
                {products58.map((item) => (
                  <li
                    className={`nav-tab-item wow fadeInUp ${
                      item.isActive ? "active" : ""
                    }`}
                    data-wow-delay={item.delay}
                    role="presentation"
                    key={item.id}
                  >
                    <a
                      href={"#" + item.href}
                      className={`nav-tab-link hover-cursor-img ${
                        item.isActive ? "active" : ""
                      }`}
                      data-bs-toggle="tab"
                    >
                      <h5 className="title text-line-clamp-1">{item.title}</h5>
                      <div className="arr-link">
                        <span className="text-btn-uppercase text-more">
                          More
                        </span>
                        <i className="icon icon-arrowUpRight" />
                      </div>
                      <div className="hover-image">
                        <Image
                          alt="Hover Image"
                          src={item.imgSrc}
                          width={item.width}
                          height={item.height}
                        />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="wow fadeInUp">
                <Link href={`/shop-collection`} className="btn-line">
                  View All Products
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-6">
            <div className="banner-right flat-animate-tab">
              <div className="tab-content">
                {products58.map((product, i) => (
                  <div
                    key={i}
                    className={`tab-pane ${
                      product.isActive ? "active show" : ""
                    }`}
                    id={product.href}
                    role="tabpanel"
                  >
                    <div className="collection-position-2 hover-img">
                      <a className="img-style">
                        <Image
                          className="lazyload"
                          alt="banner-cls"
                          src={product.imgSrc}
                          width={473}
                          height={630}
                        />
                        <div className="on-sale-wrap">
                          <span className="on-sale-item">-25%</span>
                        </div>
                      </a>
                      <div className="content cls-content">
                        <div className="cls-info">
                          <Link
                            href={`/product-detail/${product.id}`}
                            className="text-title link text-line-clamp-1"
                          >
                            {product.title}
                          </Link>
                          <div className="price">
                            <span className="old-price">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="new-price">
                              {" "}
                              ${product.oldPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <a
                          href="#quickView"
                          onClick={() => setQuickViewItem(product)}
                          data-bs-toggle="modal"
                          className="cls-btn text-btn-uppercase"
                        >
                          Quick View
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
