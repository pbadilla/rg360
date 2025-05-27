"use client";
import { products48 } from "@/data/products";
import Link from "next/link";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
export default function Products2() {
  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section align-items-center wow fadeInUp">
          <h3 className="heading mb_12">Everyone's Talking About</h3>
          <p className="subheading text-secondary">
            Explore the Hottest Reads That Are Making Waves Today.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-recent"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd17",
          }}
        >
          {products48.map((product) => (
            <SwiperSlide key={product.id} className="swiper-slide">
              <div
                className="card-product wow fadeInUp"
                data-wow-delay={product.wowDelay}
              >
                <div className="card-product-wrapper">
                  <Link
                    href={`/product-detail/${product.id}`}
                    className="product-img"
                  >
                    <Image
                      className="lazyload img-product"
                      data-src={product.imgSrc}
                      alt="image-product"
                      src={product.imgSrc}
                      width={product.width}
                      height={product.height}
                    />
                    <Image
                      className="lazyload img-hover"
                      data-src={product.imgSrc}
                      alt="image-product"
                      src={product.imgSrc}
                      width={product.width}
                      height={product.height}
                    />
                  </Link>
                  {product.onSale && (
                    <div className="on-sale-wrap">
                      <span className="on-sale-item">{product.onSale}</span>
                    </div>
                  )}
                  {product.marqueeText && (
                    <div className="marquee-product bg-main">
                      <div className="marquee-wrapper">
                        <div className="initial-child-container">
                          {[...Array(5)].map((_, index) => (
                            <React.Fragment key={index}>
                              <div className="marquee-child-item">
                                <p className="font-2 text-btn-uppercase fw-6 text-white">
                                  {product.marqueeText}
                                </p>
                              </div>
                              <div className="marquee-child-item">
                                <span className="icon icon-lightning text-critical" />
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      <div className="marquee-wrapper">
                        <div className="initial-child-container">
                          {[...Array(5)].map((_, index) => (
                            <React.Fragment key={index}>
                              <div className="marquee-child-item">
                                <p className="font-2 text-btn-uppercase fw-6 text-white">
                                  {product.marqueeText}
                                </p>
                              </div>
                              <div className="marquee-child-item">
                                <span className="icon icon-lightning text-critical" />
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="list-product-btn">
                    <a
                      onClick={() => addToWishlist(product.id)}
                      className="box-icon wishlist btn-icon-action"
                    >
                      <span className="icon icon-heart" />
                      <span className="tooltip">
                        {" "}
                        {isAddedtoWishlist(product.id)
                          ? "Already Wishlished"
                          : "Wishlist"}
                      </span>
                    </a>
                    <a
                      href="#compare"
                      data-bs-toggle="offcanvas"
                      aria-controls="compare"
                      onClick={() => addToCompareItem(product.id)}
                      className="box-icon compare btn-icon-action"
                    >
                      <span className="icon icon-gitDiff" />
                      <span className="tooltip">
                        {" "}
                        {isAddedtoCompareItem(product.id)
                          ? "Already compared"
                          : "Compare"}
                      </span>
                    </a>
                    <a
                      href="#quickView"
                      data-bs-toggle="modal"
                      onClick={() => setQuickViewItem(product)}
                      className="box-icon quickview tf-btn-loading"
                    >
                      <span className="icon icon-eye" />
                      <span className="tooltip">Quick View</span>
                    </a>
                  </div>
                  <div className="list-btn-main">
                    <a
                      onClick={() => addProductToCart(product.id)}
                      className="btn-main-product"
                    >
                      {isAddedToCartProducts(product.id)
                        ? "Already Added"
                        : "ADD TO CART"}
                    </a>
                  </div>
                </div>
                <div className="card-product-info">
                  <Link
                    href={`/product-detail/${product.id}`}
                    className="title link"
                  >
                    {product.title}
                  </Link>
                  <span className="price">
                    {product.oldPrice && (
                      <span className="old-price">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}{" "}
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-pagination-recent sw-dots type-circle justify-content-center spd17" />
        </Swiper>
      </div>
    </section>
  );
}
