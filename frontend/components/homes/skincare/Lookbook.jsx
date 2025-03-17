"use client";

import { products11 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useContextElement } from "@/context/Context";
import { Pagination } from "swiper/modules";
export default function Lookbook() {
  const { setQuickAddItem } = useContextElement();
  const swiperRef = useRef(null);
  useEffect(() => {
    const hoverWrap = document.querySelector(".bundle-hover-wrap");
    const pinItems = document.querySelectorAll(".bundle-pin-item");
    const hoverItems = document.querySelectorAll(".bundle-hover-item");

    if (hoverWrap) {
      const handleMouseOver = (event) => {
        hoverWrap.classList.add("has-hover");

        const targetId = event.target.id;

        // Ensure targetId is valid
        if (targetId) {
          const hoverItem = hoverWrap.querySelector(`.${event.target.id}`); // Matches class with spaces
          if (hoverItem) hoverItem.style.display = "block";

          hoverItems.forEach((item) => {
            if (item !== hoverItem) {
              item.classList.add("no-hover");
            }
          });
        }
      };

      const handleMouseLeave = () => {
        hoverWrap.classList.remove("has-hover");
        hoverItems.forEach((item) => {
          item.classList.remove("no-hover");
          item.style.display = ""; // Reset the display property if modified
        });
      };

      pinItems.forEach((pinItem) => {
        pinItem.addEventListener("mouseover", handleMouseOver);
        pinItem.addEventListener("mouseleave", handleMouseLeave);
      });

      // Cleanup to avoid memory leaks
      return () => {
        pinItems.forEach((pinItem) => {
          pinItem.removeEventListener("mouseover", handleMouseOver);
          pinItem.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    }
  }, []);
  const goToSecondSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Swiper uses 0-based indexing, so 1 refers to the 2nd slide.
    }
  };
  return (
    <section>
      <div className="flat-with-text-lookbook-v2 wrap-lookbook-hover">
        <div className="lookbook-content">
          <div className="box-title">
            <h3 className="title wow fadeInUp">Unbeatable Beauty Deals</h3>
            <p className="sub-desc text-secondary wow fadeInUp">
              Shopping for skincare at the drugstore can be overwhelming. Buy
              it, try it, toss it, repeat. Sound familiar? Discover skincare
              tailored just for you
            </p>
          </div>
          <Swiper
            spaceBetween={15}
            slidesPerView={1}
            breakpoints={{
              0: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
            }}
            modules={[Pagination]}
            pagination={{
              el: ".spd457",
              clickable: true,
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="bundle-hover-wrap"
            dir="ltr"
          >
            {products11.map((product, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`card-product bundle-hover-item wow fadeInUp  pin${
                    index + 1
                  }`}
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
                        width={600}
                        height={800}
                      />
                      <Image
                        className="lazyload img-hover"
                        data-src={product.imgHover}
                        alt="image-product"
                        src={product.imgHover}
                        width={600}
                        height={800}
                      />
                    </Link>
                    <div className="on-sale-wrap">
                      <span className="on-sale-item">-25%</span>
                    </div>
                    <div className="list-btn-main">
                      <a
                        href="#quickAdd"
                        onClick={() => setQuickAddItem(product.id)}
                        data-bs-toggle="modal"
                        className="btn-main-product"
                      >
                        Quick View
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
                      <span className="old-price">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-pagination-lookbook sw-dots type-circle justify-content-center spd457"></div>
          </Swiper>
          <div className="total-lb wow fadeInUp">
            <a
              href="#addToCart"
              data-bs-toggle="modal"
              className="tf-btn btn-reset"
            >
              <span className="text">Add set to cart</span>
              <i className="icon icon-arrowUpRight" />
            </a>
          </div>
        </div>
        <div className="banner-img">
          <Image
            className="lazyload"
            data-src="/images/banner/banner-lookbook-8.jpg"
            alt="banner"
            src="/images/banner/banner-lookbook-8.jpg"
            width={1440}
            height={1080}
          />
          <div
            className="tf-pin-btn style-hover pin-1 bundle-pin-item swiper-button"
            onClick={() => goToSecondSlide(0)}
          >
            <span id="pin1" />
          </div>
          <div
            className="tf-pin-btn style-hover pin-2 bundle-pin-item swiper-button"
            onClick={() => goToSecondSlide(1)}
          >
            <span id="pin2" />
          </div>
          <div
            className="tf-pin-btn style-hover pin-3 bundle-pin-item swiper-button"
            onClick={() => goToSecondSlide(2)}
          >
            <span id="pin3" />
          </div>
        </div>
      </div>
    </section>
  );
}
