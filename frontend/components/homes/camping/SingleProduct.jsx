"use client";
import ColorSelect from "@/components/productDetails/ColorSelect";
import QuantitySelect from "@/components/productDetails/QuantitySelect";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider1 from "@/components/productDetails/sliders/Slider1";
import { products44 } from "@/data/products";
import { useContextElement } from "@/context/Context";
const imgs = [
  {
    id: 1,
    color: "gray",
    src: "/images/products/camping/camping-11.jpg",
    alt: "",
    width: 736,
    height: 980,
  },
  {
    id: 2,
    color: "gray",
    src: "/images/products/camping/camping-12.jpg",
    alt: "",
    width: 736,
    height: 980,
  },
  {
    id: 3,
    color: "red",
    src: "/images/products/camping/camping-13.jpg",
    alt: "",
    width: 600,
    height: 800,
  },
];

const colorOptions = [
  {
    id: "gray",
    value: "gray",
    color: "gray",
  },
  {
    id: "red",
    value: "red",
    color: "red",
  },
];
export default function SingleProduct() {
  const [activeColor, setActiveColor] = useState("gray");
  const [quantity, setQuantity] = useState(1); // Initial quantity is 1
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
      <div className="container">
        <div className="row flat-single-home flat-single-home-default">
          {/* Product default */}
          <div className="col-md-6">
            <div className="tf-product-media-wrap sticky-top">
              <Slider1
                activeColor={activeColor}
                setActiveColor={setActiveColor}
                slideItems={imgs}
                thumbSlidePerViewOnMobile={3.2}
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
                    <div className="text text-btn-uppercase">Camping</div>
                    <h3 className="name">{products44[0].title}</h3>
                    <div className="tf-product-info-rate">
                      <div className="list-star-default">
                        <i className="icon icon-star" />
                        <i className="icon icon-star" />
                        <i className="icon icon-star" />
                        <i className="icon icon-star" />
                        <i className="icon icon-star" />
                      </div>
                      <div className="text text-caption-1">(1.234 reviews)</div>
                    </div>
                    <div className="tf-product-info-sold">
                      <div className="tf-product-pre-order text-btn-uppercase">
                        Best seller
                      </div>
                      <div className="d-flex gap-4 align-items-center">
                        <i className="icon icon-lightning" />
                        <div className="text text-caption-1 text-secondary text-line-clamp-1">
                          Selling fast! 22 people have this in their carts.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tf-product-info-price">
                    <h4 className="price-on-sale">
                      ${products44[0].price.toFixed(2)}
                    </h4>
                    <div className="old-price old-price-sold">
                      ${products44[0].oldPrice.toFixed(2)}
                    </div>
                    <div className="badges-on-sale text-btn-uppercase">
                      -25%
                    </div>
                  </div>
                </div>
                <div className="tf-product-info-choose-option">
                  <ColorSelect
                    setActiveColor={setActiveColor}
                    activeColor={activeColor}
                    colorOptions={[...colorOptions]}
                  />
                  <div className="tf-product-info-quantity">
                    <div className="title mb_12">Quantity:</div>
                    <QuantitySelect
                      quantity={
                        isAddedToCartProducts(products44[0].id)
                          ? cartProducts.filter(
                              (elm) => elm.id == products44[0].id
                            )[0].quantity
                          : quantity
                      }
                      setQuantity={(qty) => {
                        if (isAddedToCartProducts(products44[0].id)) {
                          updateQuantity(products44[0].id, qty);
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
                          addProductToCart(products44[0].id, quantity)
                        }
                        className="btn-style-2 flex-grow-1 fw-6 btn-add-to-cart"
                      >
                        <span>
                          {isAddedToCartProducts(products44[0].id)
                            ? "Already Added"
                            : "Add to Cart"}
                        </span>
                      </a>
                      <a
                        href="#compare"
                        data-bs-toggle="offcanvas"
                        onClick={() => addToCompareItem(products44[0].id)}
                        aria-controls="compare"
                        className="box-icon hover-tooltip compare btn-icon-action"
                      >
                        <span className="icon icon-gitDiff" />
                        <span className="tooltip text-caption-2">
                          {" "}
                          {isAddedtoCompareItem(products44[0].id)
                            ? "Already compared"
                            : "Compare"}
                        </span>
                      </a>
                      <a
                        onClick={() => addToWishlist(products44[0].id)}
                        className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                      >
                        <span className="icon icon-heart" />
                        <span className="tooltip text-caption-2">
                          {isAddedtoWishlist(products44[0].id)
                            ? "Already Wishlished"
                            : "Wishlist"}
                        </span>
                      </a>
                    </div>
                    <a href="#" className="btn-style-3 text-btn-uppercase">
                      Buy it now
                    </a>
                  </div>
                  <div>
                    <Link
                      href={`/product-detail/${products44[0].id}`}
                      className="btn-line"
                    >
                      View Full details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /tf-product-info-list */}
        </div>
      </div>
    </section>
  );
}
