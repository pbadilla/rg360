import React from "react";
import Image from "next/image";
export default function Marquee2() {
  return (
    <section className="flat-spacing pt-0">
      <div className="tf-marquee marquee-style4">
        <div className="marquee-wrapper">
          <div className="initial-child-container">
            {/* 1 */}
            <div className="marquee-child-item">
              <Image
                alt=""
                src="/images/products/sneaker/item-3.jpg"
                width={112}
                height={48}
              />
            </div>
            <div className="marquee-child-item">
              <h3 className="text-uppercase">Embrace Endless Possibilities</h3>
            </div>
            <div className="marquee-child-item">
              <Image
                alt=""
                src="/images/products/sneaker/item-2.jpg"
                width={90}
                height={48}
              />
            </div>
            <div className="marquee-child-item">
              <h3 className="text-uppercase">Simplify Your Style Statement</h3>
            </div>
            <div className="marquee-child-item">
              <Image
                alt=""
                src="/images/products/sneaker/item-1.jpg"
                width={101}
                height={48}
              />
            </div>
            <div className="marquee-child-item">
              <h3 className="text-uppercase">Embrace New Horizons</h3>
            </div>
            {/* 2 */}
            <div className="marquee-child-item">
              <Image
                alt=""
                src="/images/products/sneaker/item-3.jpg"
                width={112}
                height={48}
              />
            </div>
            <div className="marquee-child-item">
              <h3 className="text-uppercase">Embrace Endless Possibilities</h3>
            </div>
            <div className="marquee-child-item">
              <Image
                alt=""
                src="/images/products/sneaker/item-2.jpg"
                width={90}
                height={48}
              />
            </div>
            <div className="marquee-child-item">
              <h3 className="text-uppercase">Simplify Your Style Statement</h3>
            </div>
            <div className="marquee-child-item">
              <Image
                alt=""
                src="/images/products/sneaker/item-1.jpg"
                width={101}
                height={48}
              />
            </div>
            <div className="marquee-child-item">
              <h3 className="text-uppercase">Embrace New Horizons</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
