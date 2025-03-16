import React from "react";
import Image from "next/image";
export default function Banner2() {
  return (
    <section className="position-relative">
      <div className="collection-default abs-x-center abs-top-2 rounded-0">
        <div className="image">
          <Image
            src="/images/banner/sneaker-full.jpg"
            data-=""
            alt=""
            className="lazyload w-100"
            width={1920}
            height={600}
          />
        </div>
        <div className="content text-center">
          <div className="box-title">
            <h6 className="fw-medium text-white">Find Your Perfect Fit</h6>
            <h2 className="fw-medium text-white">
              Explore stylish and comfortable <br />
              shoes for every occasion.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
