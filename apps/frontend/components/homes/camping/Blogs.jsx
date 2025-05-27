import { newsItems } from "@/data/blogs";
import React from "react";
import Image from "next/image";
import Link from "next/link";
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
        <div className="tf-grid-layout md-col-2">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="news-item hover-image wow fadeInUp"
              data-wow-delay={item.wowDelay}
            >
              <div className="image">
                <Image
                  className="lazyload"
                  data-src={item.imgSrc}
                  alt=""
                  src={item.imgSrc}
                  width={456}
                  height={303}
                />
              </div>
              <div className="content">
                <p className="text-btn-uppercase text-secondary-2">
                  {item.date}
                </p>
                <h6 className="title">
                  <Link className="link" href={`/blog-detail/${item.id}`}>
                    {item.title}
                  </Link>
                </h6>
                <p>{item.description}</p>
                <Link
                  href={`/blog-detail/${item.id}`}
                  className="link text-btn-uppercase bot-button"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
