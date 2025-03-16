import { blogPosts3 } from "@/data/blogs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Blogs() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="flat-img-with-text-v4">
          <div className="banner-cls rounded-0 hover-img">
            <div className="img-style">
              <Image
                data-src="/images/collections/banner-collection/banner-cls20.jpg"
                alt="banner-cls"
                src="/images/collections/banner-collection/banner-cls20.jpg"
                width={870}
                height={660}
              />
            </div>
            <div className="cls-content">
              <div className="box-title-cls">
                <h3>
                  <Link href={`/shop-default-grid`} className="text-white link">
                    Super Sale Up To %50
                  </Link>
                </h3>
                <p className="text-white">Reserved for special occasions</p>
              </div>
              <div>
                <Link
                  href={`/shop-default-grid`}
                  className="tf-btn btn-fill btn-white"
                >
                  <span className="text">Shop Now</span>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relatest-post">
            {blogPosts3.map((post) => (
              <div
                key={post.id}
                className="relatest-post-item style-row hover-image wow fadeInUp"
                data-wow-delay={post.delay}
              >
                <div className="content">
                  <h5 className="title">
                    <Link className="link" href={`/blog-detail/${post.id}`}>
                      {post.title}
                    </Link>
                  </h5>
                  <div className="meta">
                    <div className="meta-item gap-8">
                      <p className="text-caption-1">{post.date}</p>
                    </div>
                    <div className="meta-item gap-8">
                      <p className="text-caption-1">
                        by{" "}
                        <a className="link" href="#">
                          {post.author}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="image">
                  <Image
                    className="lazyload"
                    data-src={post.imgSrc}
                    alt=""
                    src={post.imgSrc}
                    width={168}
                    height={126}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
