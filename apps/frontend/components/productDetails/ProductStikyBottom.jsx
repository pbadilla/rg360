"use client";
import { useContextElement } from "@/context/Context";
import { products41 } from "@/data/products";
import Image from "next/image";
import React, { useState } from "react";
import QuantitySelect from "./QuantitySelect";
import SizeSelect2 from "./SideSelect2";

export default function ProductStikyBottom() {
  const {
    addProductToCart,
    isAddedToCartProducts,

    cartProducts,
    updateQuantity,
  } = useContextElement();
  const [quantity, setQuantity] = useState(1); // Initial quantity is 1

  return (
    <div className="tf-sticky-btn-atc">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form
              className="form-sticky-atc"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="tf-sticky-atc-product">
                <div className="image">
                  <Image
                    className="lazyload"
                    alt=""
                    src={products41[2].imgSrc}
                    width={600}
                    height={800}
                  />
                </div>
                <div className="content">
                  <div className="text-title">{products41[2].title}</div>
                  <div className="text-caption-1 text-secondary-2">
                    Green, XS, Cotton
                  </div>
                  <div className="text-title">
                    ${products41[2].price.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="tf-sticky-atc-infos">
                <SizeSelect2 />
                <div className="tf-sticky-atc-quantity d-flex gap-12 align-items-center">
                  <div className="tf-sticky-atc-infos-title text-title">
                    Quantity:
                  </div>
                  <QuantitySelect
                    styleClass="style-1"
                    quantity={
                      isAddedToCartProducts(products41[2].id)
                        ? cartProducts.filter(
                            (elm) => elm.id == products41[2].id
                          )[0].quantity
                        : quantity
                    }
                    setQuantity={(qty) => {
                      if (isAddedToCartProducts(products41[2].id)) {
                        updateQuantity(products41[2].id, qty);
                      } else {
                        setQuantity(qty);
                      }
                    }}
                  />
                </div>
                <div className="tf-sticky-atc-btns">
                  <a
                    onClick={() => addProductToCart(products41[2].id, quantity)}
                    className="tf-btn w-100 btn-reset radius-4 btn-add-to-cart"
                  >
                    <span className="text text-btn-uppercase">
                      {" "}
                      {isAddedToCartProducts(products41[2].id)
                        ? "Already Added"
                        : "Add to cart -"}
                    </span>
                    <span className="tf-qty-price total-price">
                      $
                      {isAddedToCartProducts(products41[2].id)
                        ? (
                            products41[2].price *
                            cartProducts.filter(
                              (elm) => elm.id == products41[2].id
                            )[0].quantity
                          ).toFixed(2)
                        : (products41[2].price * quantity).toFixed(2)}
                    </span>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
