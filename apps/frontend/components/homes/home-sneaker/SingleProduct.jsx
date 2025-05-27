"use client";
import ColorSelect9 from "@/components/productDetails/ColorSelect9";
import QuantitySelect from "@/components/productDetails/QuantitySelect";
import SizeSelect from "@/components/productDetails/SizeSelect";

import Slider3 from "@/components/productDetails/sliders/Slider3";
import React, { useState } from "react";
import { products44 } from "@/data/products";
import { useContextElement } from "@/context/Context";
const swiperSlides = [
  {
    color: "orange",
    alt: "",
    src: "/images/products/sneaker/product-detail.jpg",
    width: 600,
    height: 600,
  },
  {
    color: "orange",
    alt: "",
    src: "/images/products/sneaker/product-detail-2.jpg",
    width: 600,
    height: 600,
  },
  {
    color: "orange",
    alt: "",
    src: "/images/products/sneaker/product-detail-3.jpg",
    width: 600,
    height: 600,
  },
  {
    color: "orange",
    alt: "",
    src: "/images/products/sneaker/product-detail-4.jpg",
    width: 600,
    height: 600,
  },
];
export default function SingleProduct() {
  const [quantity, setQuantity] = useState(1);
  const {
    quickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    cartProducts,
    updateQuantity,
  } = useContextElement();
  return (
    <section className="flat-spacing bg-surface">
      <div className="tf-main-product section-image-zoom type-space-2">
        <div className="container">
          <div className="row">
            {/* Product default */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap thumbs-bottom sticky-top">
                <Slider3
                  slidesPerView={5}
                  spaceBetween={0}
                  slideItems={swiperSlides}
                />
              </div>
            </div>
            {/* /Product default */}
            {/* tf-product-info-list */}
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-heading">
                    <div className="tf-product-info-name">
                      <div className="text text-btn-uppercase">Shoes</div>
                      <h3 className="name">{products44[4].title}</h3>
                      <div className="sub">
                        <div className="tf-product-info-rate">
                          <div className="list-star d-flex">
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                          </div>
                          <div className="text text-caption-1">
                            (134 reviews)
                          </div>
                        </div>
                        <div className="tf-product-info-sold">
                          <i className="icon icon-lightning" />
                          <div className="text text-caption-1">
                            18&nbsp;sold in last&nbsp;32&nbsp;hours
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tf-product-info-desc">
                      <div className="tf-product-info-price">
                        <h5 className="price-on-sale">
                          {" "}
                          ${products44[4].price.toFixed(2)}
                        </h5>
                        <div className="compare-at-price">
                          ${products44[4].oldPrice.toFixed(2)}
                        </div>
                        <div className="badges-on-sale text-btn-uppercase">
                          -25%
                        </div>
                      </div>
                      <p>
                        LaMelo Ball and PUMA are getting ready for Halloween
                        with the release of this special edition MB.03.
                      </p>
                      <div className="tf-product-info-liveview">
                        <i className="icon icon-eye" />
                        <p className="text-caption-1">
                          <span className="liveview-count">28</span> people are
                          viewing this right now
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tf-product-info-choose-option">
                    <div className="variant-picker-item">
                      <ColorSelect9 />
                    </div>
                    <SizeSelect />
                    <div className="tf-product-info-quantity">
                      <div className="title mb_12">Quantity:</div>
                      <QuantitySelect
                        quantity={
                          isAddedToCartProducts(products44[4].id)
                            ? cartProducts.filter(
                                (elm) => elm.id == products44[4].id
                              )[0].quantity
                            : quantity
                        }
                        setQuantity={(qty) => {
                          if (isAddedToCartProducts(products44[4].id)) {
                            updateQuantity(products44[4].id, qty);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <div className="tf-product-info-by-btn mb_10">
                        <a
                          href="#shoppingCart"
                          data-bs-toggle="modal"
                          onClick={() =>
                            addProductToCart(products44[4].id, quantity)
                          }
                          className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 btn-add-to-cart"
                        >
                          <span>
                            {" "}
                            {isAddedToCartProducts(products44[4].id)
                              ? "Already Added"
                              : "Add to Cart"}
                          </span>
                          <span className="tf-qty-price total-price">
                            ${products44[4].price.toFixed(2)}
                          </span>
                        </a>
                        <a
                          href="#compare"
                          data-bs-toggle="offcanvas"
                          aria-controls="compare"
                          onClick={() => addToCompareItem(products44[4].id)}
                          className="box-icon hover-tooltip compare btn-icon-action"
                        >
                          <span className="icon icon-gitDiff" />
                          <span className="tooltip text-caption-2">
                            {isAddedtoCompareItem(products44[4].id)
                              ? "Already compared"
                              : "Compare"}
                          </span>
                        </a>
                        <a
                          onClick={() => addToWishlist(products44[4].id)}
                          className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                        >
                          <span className="icon icon-heart" />
                          <span className="tooltip text-caption-2">
                            {isAddedtoWishlist(products44[4].id)
                              ? "Already Wishlished"
                              : "Wishlist"}
                          </span>
                        </a>
                      </div>
                      <a href="#" className="btn-style-3 text-btn-uppercase">
                        Buy it now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /tf-product-info-list */}
          </div>
        </div>
      </div>
    </section>
  );
}
