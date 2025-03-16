"use client";
import React, { useState } from "react";

import { productMain } from "@/data/products";
import ProductCard1 from "../productCards/ProductCard1";
export default function SearchModal() {
  const [loading, setLoading] = useState(false);

  const [loadedItems, setLoadedItems] = useState(productMain.slice(0, 8));
  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoadedItems((pre) => [
        ...pre,
        ...productMain.slice(pre.length, pre.length + 4),
      ]);
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="modal fade modal-search" id="search">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Search</h5>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <form className="form-search" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="text">
              <input
                type="text"
                placeholder="Searching..."
                className=""
                name="text"
                tabIndex={0}
                defaultValue=""
                aria-required="true"
                required
              />
            </fieldset>
            <button className="" type="submit">
              <svg
                className="icon"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.35 21.0004L17 16.6504"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
          <div>
            <h5 className="mb_16">Feature keywords Today</h5>
            <ul className="list-tags">
              <li>
                <a href="#" className="radius-60 link">
                  Dresses
                </a>
              </li>
              <li>
                <a href="#" className="radius-60 link">
                  Dresses women
                </a>
              </li>
              <li>
                <a href="#" className="radius-60 link">
                  Dresses midi
                </a>
              </li>
              <li>
                <a href="#" className="radius-60 link">
                  Dress summer
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="mb_16">Recently viewed products</h6>
            <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
              {loadedItems.map((product, i) => (
                <ProductCard1 product={product} key={i} />
              ))}
            </div>
          </div>
          {/* Load Item */}

          {productMain.length == loadedItems.length ? (
            ""
          ) : (
            <div
              className="wd-load view-more-button text-center"
              onClick={() => handleLoad()}
            >
              <button
                className={`tf-loading btn-loadmore tf-btn btn-reset ${
                  loading ? "loading" : ""
                } `}
              >
                <span className="text text-btn text-btn-uppercase">
                  Load more
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
