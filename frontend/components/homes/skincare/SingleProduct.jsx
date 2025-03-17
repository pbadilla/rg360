"use client";
import ColorSelect from "@/components/productDetails/ColorSelect";
import QuantitySelect from "@/components/productDetails/QuantitySelect";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider1 from "@/components/productDetails/sliders/Slider1";
import { products44 } from "@/data/products";
import { useContextElement } from "@/context/Context";
import Slider4 from "@/components/productDetails/sliders/Slider4";
import VariantPicker from "@/components/productDetails/VarientSelect";

const imgs = [
  {
    id: 1,
    variant: "30ml",
    src: "/images/products/beauty-cosmetic/beauty41.jpg",
    alt: "",
    width: 773,
    height: 1030,
  },
  {
    id: 2,
    variant: "100ml",
    src: "/images/products/beauty-cosmetic/beauty42.jpg",
    alt: "",
    width: 773,
    height: 1030,
  },
  {
    id: 3,
    variant: "100ml",
    src: "/images/products/beauty-cosmetic/beauty43.jpg",
    alt: "",
    width: 773,
    height: 1030,
  },
  {
    id: 4,
    variant: "30ml",
    src: "/images/products/beauty-cosmetic/beauty44.jpg",
    alt: "",
    width: 773,
    height: 1030,
  },
  {
    id: 5,
    variant: "30ml",
    src: "/images/products/beauty-cosmetic/beauty45.jpg",
    alt: "",
    width: 773,
    height: 1030,
  },
];

const variants = [{ size: "30ml" }, { size: "100ml" }];

export default function SingleProduct() {
  const [selectedVariant, setSelectedVariant] = useState(variants[0].size);
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
              <Slider4
                slideItems={imgs}
                activeVarient={selectedVariant}
                setActiveVarient={setSelectedVariant}
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
                    <div className="text text-btn-uppercase">Skin Care</div>
                    <h3 className="name">{products44[3].title}</h3>
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
                      ${products44[3].price.toFixed(2)}
                    </h4>
                    <div className="old-price old-price-sold">
                      ${products44[3].oldPrice.toFixed(2)}
                    </div>
                    <div className="badges-on-sale text-btn-uppercase">
                      -25%
                    </div>
                  </div>
                </div>
                <div className="tf-product-info-choose-option">
                  <VariantPicker
                    selectedVariant={selectedVariant}
                    setSelectedVariant={setSelectedVariant}
                    variants={variants}
                  />
                  <div className="tf-product-info-quantity">
                    <div className="title mb_12">Quantity:</div>
                    <QuantitySelect
                      quantity={
                        isAddedToCartProducts(products44[3].id)
                          ? cartProducts.filter(
                              (elm) => elm.id == products44[3].id
                            )[0].quantity
                          : quantity
                      }
                      setQuantity={(qty) => {
                        if (isAddedToCartProducts(products44[3].id)) {
                          updateQuantity(products44[3].id, qty);
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
                          addProductToCart(products44[3].id, quantity)
                        }
                        className="btn-style-2 flex-grow-1 fw-6 btn-add-to-cart"
                      >
                        <span>
                          {isAddedToCartProducts(products44[3].id)
                            ? "Already Added"
                            : "Add to Cart"}
                        </span>
                      </a>
                      <a
                        href="#compare"
                        data-bs-toggle="offcanvas"
                        onClick={() => addToCompareItem(products44[3].id)}
                        aria-controls="compare"
                        className="box-icon hover-tooltip compare btn-icon-action"
                      >
                        <span className="icon icon-gitDiff" />
                        <span className="tooltip text-caption-2">
                          {" "}
                          {isAddedtoCompareItem(products44[3].id)
                            ? "Already compared"
                            : "Compare"}
                        </span>
                      </a>
                      <a
                        onClick={() => addToWishlist(products44[3].id)}
                        className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                      >
                        <span className="icon icon-heart" />
                        <span className="tooltip text-caption-2">
                          {isAddedtoWishlist(products44[3].id)
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
                      href={`/product-detail/${products44[3].id}`}
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
