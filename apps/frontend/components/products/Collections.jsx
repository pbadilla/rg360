import React from "react";
import Pagination from "../common/Pagination";
import { collections11 } from "@/data/collections";
import Image from "next/image";
export default function Collections() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="tf-grid-layout tf-col-2 lg-col-4">
          {/* item 1 */}
          {collections11.map((item, index) => (
            <div
              key={index}
              className="collection-position-2 radius-lg style-3 hover-img"
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src={item.imgSrc}
                  alt={`banner-${item.text.toLowerCase()}`}
                  src={item.imgSrc}
                  width={450}
                  height={600}
                />
              </a>
              <div className="content">
                <a href="#" className="cls-btn">
                  <h6 className="text">{item.text}</h6>
                  <span className="count-item text-secondary">
                    {item.count}
                  </span>
                  <i className="icon icon-arrowUpRight" />
                </a>
              </div>
            </div>
          ))}
          {/* pagination */}
          <ul className="wg-pagination justify-content-center">
            <Pagination />
          </ul>
        </div>
      </div>
    </section>
  );
}
