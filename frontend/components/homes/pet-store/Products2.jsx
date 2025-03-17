"use client";
import { products35 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/common/Countdown";
import { useContextElement } from "@/context/Context";
export default function Products2() {
  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section-2 wow fadeInUp">
          <h3>Deals Of The Day</h3>
          <div className="d-flex gap-12">
            <div className="nav-prev-collection d-none d-lg-flex nav-sw style-line nav-sw-left">
              <i className="icon icon-arrLeft" />
            </div>
            <div className="nav-next-collection d-none d-lg-flex nav-sw style-line nav-sw-right">
              <i className="icon icon-arrRight" />
            </div>
          </div>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-collection wow fadeInUp"
          data-wow-delay="0.1s"
          spaceBetween={30}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },

            0: {
              slidesPerView: 1,
            },
          }}
        >
          {products35.map((product, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="card-product list-st-3">
                <div className="inner-wrapper-card">
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
                        width={600}
                        height={800}
                      />
                      <Image
                        className="lazyload img-hover"
                        data-src={product.imgHoverSrc}
                        alt="image-product"
                        src={product.imgHoverSrc}
                        width={600}
                        height={800}
                      />
                    </Link>
                    <div className="on-sale-wrap">
                      <span className="on-sale-item">{product.sale}</span>
                    </div>
                  </div>
                  <div className="box-progress-stock">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "70%" }}
                        aria-valuenow={70}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="stock-status d-flex justify-content-between align-items-center">
                      <div className="stock-item text-caption-1">
                        <span className="stock-label text-secondary-2">
                          Available:
                        </span>
                        <span className="stock-value">{product.available}</span>
                      </div>
                      <div className="stock-item text-caption-1">
                        <span className="stock-label text-secondary-2">
                          Sold:
                        </span>
                        <span className="stock-value">{product.sold}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-product-info">
                  <div className="archive-info-top">
                    <div className="inner-top">
                      <Link
                        href={`/product-detail/${product.id}`}
                        className="title link"
                      >
                        {product.title}
                      </Link>
                      <div className="box-rating">
                        <ul className="list-star">
                          {[...Array(product.rating)].map((_, i) => (
                            <li key={i} className="icon icon-star" />
                          ))}
                        </ul>
                        <span className="text-caption-1 text-secondary">
                          (1.234)
                        </span>
                      </div>
                      <span className="price">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="inner-bottom">
                      <p className="description text-secondary text-caption-1 text-line-clamp-2">
                        {product.description}
                      </p>
                      <div className="list-product-btn">
                        <a
                          className="btn-main-product"
                          onClick={() => addProductToCart(product.id)}
                        >
                          {isAddedToCartProducts(product.id)
                            ? "Already Added"
                            : "ADD TO CART"}
                        </a>
                        <a
                          onClick={() => addToWishlist(product.id)}
                          className="box-icon wishlist btn-icon-action"
                        >
                          <span className="icon icon-heart" />
                          <span className="tooltip">
                            {isAddedtoWishlist(product.id)
                              ? "Already Wishlished"
                              : "Wishlist"}
                          </span>
                        </a>
                        <a
                          href="#compare"
                          onClick={() => addToCompareItem(product.id)}
                          data-bs-toggle="offcanvas"
                          aria-controls="compare"
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
                      </div>
                    </div>
                  </div>
                  <div className="archive-info-bottom">
                    <div className="text-btn-uppercase fw-6 letter-1 d-none d-lg-block">
                      Offer <br />
                      ends in:
                    </div>
                    <div className="countdown-box">
                      <div
                        className="js-countdown"
                        data-timer={product.countdown}
                        data-labels="Days,Hours,Mins,Secs"
                      >
                        <CountdownTimer style={2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
