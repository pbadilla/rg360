import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Collectons() {
  return (
    <section className="flat-spacing bg-light-blue-3">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Explore Collections</h3>
        </div>
        <ul
          className="list-collection md-overflow-x wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <li className="cls-item">
            <div className="img-cls">
              <Image
                alt="img-cls"
                src="/images/collections/list-cls/cls-new.jpg"
                width={120}
                height={160}
              />
            </div>
            <Link href={`/shop-collection`} className="title-cls link">
              <h4 className="text">New in</h4>
              <span className="count text-btn-uppercase">12</span>
            </Link>
          </li>
          <li className="cls-item">
            <div className="img-cls">
              <Image
                alt="img-cls"
                src="/images/collections/list-cls/cls-promotion.jpg"
                width={60}
                height={80}
              />
            </div>
            <Link href={`/shop-collection`} className="title-cls link">
              <h4 className="text">Promotion</h4>
              <span className="count text-btn-uppercase">16</span>
            </Link>
          </li>
          <li className="cls-item">
            <div className="img-cls">
              <Image
                alt="img-cls"
                src="/images/collections/list-cls/cls-clothing.jpg"
                width={120}
                height={160}
              />
            </div>
            <Link href={`/shop-collection`} className="title-cls link">
              <h4 className="text">Clothing</h4>
              <span className="count text-btn-uppercase">20</span>
            </Link>
          </li>
          <li className="cls-item">
            <div className="img-cls">
              <Image
                alt="img-cls"
                src="/images/collections/list-cls/cls-shoes.jpg"
                width={120}
                height={160}
              />
            </div>
            <Link href={`/shop-collection`} className="title-cls link">
              <h4 className="text">Shoes</h4>
              <span className="count text-btn-uppercase">06</span>
            </Link>
          </li>
          <li className="cls-item">
            <div className="img-cls">
              <Image
                alt="img-cls"
                src="/images/collections/list-cls/cls-bag.jpg"
                width={120}
                height={160}
              />
            </div>
            <Link href={`/shop-collection`} className="title-cls link">
              <h4 className="text">Bags</h4>
              <span className="count text-btn-uppercase">14</span>
            </Link>
          </li>
          <li className="cls-item">
            <div className="img-cls">
              <Image
                alt="img-cls"
                src="/images/collections/list-cls/cls-accessories.jpg"
                width={120}
                height={160}
              />
            </div>
            <Link href={`/shop-collection`} className="title-cls link">
              <h4 className="text">Accessories</h4>
              <span className="count text-btn-uppercase">05</span>
            </Link>
          </li>
          <li className="cls-item">
            <div className="img-cls">
              <Image
                alt="img-cls"
                src="/images/collections/list-cls/cls-jewelry.jpg"
                width={120}
                height={160}
              />
            </div>
            <Link href={`/shop-collection`} className="title-cls link">
              <h4 className="text">Jewelry</h4>
              <span className="count text-btn-uppercase">08</span>
            </Link>
          </li>
          <li className="cls-item">
            <div className="img-cls">
              <Image
                alt="img-cls"
                src="/images/collections/list-cls/cls-women.jpg"
                width={120}
                height={160}
              />
            </div>
            <Link href={`/shop-collection`} className="title-cls link">
              <h4 className="text">Women</h4>
              <span className="count text-btn-uppercase">04</span>
            </Link>
          </li>
          <li className="cls-item">
            <div className="img-cls">
              <Image
                alt="img-cls"
                src="/images/collections/list-cls/cls-men.jpg"
                width={120}
                height={160}
              />
            </div>
            <Link href={`/shop-collection`} className="title-cls link">
              <h4 className="text">Men</h4>
              <span className="count text-btn-uppercase">22</span>
            </Link>
          </li>
        </ul>
        <div className="text-center">
          <Link href={`/shop-collection`} className="btn-line py_8">
            View All Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
