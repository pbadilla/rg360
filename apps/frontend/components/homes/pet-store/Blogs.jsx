"use client";
import { blogPosts5 } from "@/data/blogs";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Blogs() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">News insight</h3>
          <p className="subheading text-secondary">
            Browse our Top Trending: the hottest picks loved by all.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-latest"
          spaceBetween={30}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd70",
          }}
        >
          {blogPosts5.map((post, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div
                className="wg-blog style-1 hover-image wow fadeInUp"
                data-wow-delay={post.delay}
              >
                <div className="image">
                  <Image
                    className="lazyload"
                    data-src={post.imgSrc}
                    alt=""
                    src={post.imgSrc}
                    width={615}
                    height={462}
                  />
                </div>
                <div className="content">
                  <p className="text-btn-uppercase text-secondary-2">
                    {post.date}
                  </p>
                  <div>
                    <h6 className="title fw-5">
                      <Link className="link" href={`/blog-detail/${post.id}`}>
                        {post.title}
                      </Link>
                    </h6>
                    <div className="body-text">{post.description}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-latest sw-dots type-circle justify-content-center spd70" />
        </Swiper>
      </div>
    </section>
  );
}
