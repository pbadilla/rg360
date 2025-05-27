"use client";
import Link from "next/link";
import { products6 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import { Pagination } from "swiper/modules";
export default function LookBook() {
  const { setQuickViewItem } = useContextElement();
  return (
    <section>
      <div className="container-full2">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Trendsetters' Lookbook</h3>
          <p className="subheading text-secondary">
            Discover the latest trends and classic styles in our Fashion Forward{" "}
            <br />
            Lookbook. Elevate your style today!
          </p>
        </div>
        <Swiper
          className="swiper tf-sw-lookbook sw-lookbook-wrap"
          dir="ltr"
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            1024: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd37",
          }}
        >
          {products6.map((slide, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="hover-img cls-lookbook">
                <Link
                  href={`/product-detail/${slide.id}`}
                  className="img-style"
                >
                  <Image
                    className="lazyload"
                    alt={slide.imgAlt}
                    src={slide.imgSrcBanner}
                    width={slide.imgWidth}
                    height={slide.imgHeight}
                  />
                </Link>
                <div className={`lookbook-item ${slide.positionClass}`}>
                  <div className="dropup-center dropup">
                    <div
                      role="dialog"
                      className="tf-pin-btn"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span />
                    </div>
                    <div className="dropdown-menu">
                      <div className="loobook-product">
                        <div className="img-style">
                          <Image
                            alt="img"
                            src={slide.imgSrc}
                            width={300}
                            height={400}
                          />
                        </div>
                        <div className="content">
                          <div className="info">
                            <Link
                              href={`/product-detail/${slide.id}`}
                              className="text-title text-line-clamp-1 link"
                            >
                              {slide.title}
                            </Link>
                            <div className="price text-button">
                              ${slide.price.toFixed(2)}
                            </div>
                          </div>
                          <a
                            href="#quickView"
                            onClick={() => setQuickViewItem(slide)}
                            data-bs-toggle="modal"
                            className="btn-lookbook btn-line"
                          >
                            Quick View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-lookbook sw-dots type-circle justify-content-center spd37" />
        </Swiper>
      </div>
    </section>
  );
}
