"use client";
import Link from "next/link";
import { collectionsData3 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
export default function Collections() {
  return (
    <section className="flat-spacing-2">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Shop By Activity</h3>
          <p className="subheading">
            Browse our Top Trending: the hottest picks loved by all.
          </p>
        </div>
        <div
          className="flat-collection-circle wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div className="swiper tf-sw-collection">
            <Swiper
              slidesPerView={5} // For default screens (large screens)
              spaceBetween={15} // Default space between slides
              breakpoints={{
                1200: {
                  slidesPerView: 5, // For large screens
                  spaceBetween: 20, // Larger space on larger screens
                },
                992: {
                  slidesPerView: 4, // For medium (tablet) screens
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3, // For mobile screens
                  spaceBetween: 15,
                },
                0: {
                  slidesPerView: 2, // For mobile screens
                  spaceBetween: 15,
                },
              }}
              modules={[Pagination, Navigation]}
              pagination={{
                clickable: true,
                el: ".spd8",
              }}
              navigation={{
                prevEl: ".snbp3",
                nextEl: ".snbn3",
              }}
              dir="ltr"
            >
              {collectionsData3.map((collection, index) => (
                <SwiperSlide key={index}>
                  <div className="collection-circle hover-img">
                    <Link
                      href={`/shop-collection`} // Direct link added here
                      className="img-style radius-12"
                    >
                      <Image
                        className="lazyload"
                        data-src={collection.image}
                        alt="collection-img"
                        src={collection.image}
                        width={468}
                        height={624}
                      />
                    </Link>
                    <div className="collection-content text-center">
                      <div>
                        <Link href={`/shop-collection`} className="cls-title">
                          <h6 className="text">{collection.title}</h6>
                          <i className="icon icon-arrowUpRight" />
                        </Link>
                      </div>
                      <div className="count text-secondary">
                        {collection.itemCount} items
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="d-flex d-lg-none sw-pagination-collection sw-dots type-circle justify-content-center spd8" />
          </div>
          <div className="nav-prev-collection d-none d-lg-flex nav-sw style-line nav-sw-left snbp3">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-collection d-none d-lg-flex nav-sw style-line nav-sw-right snbn3">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
