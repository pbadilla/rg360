import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Collections() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          <div
            className="collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp"
            data-wow-delay="0s"
          >
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/grid-cls/gaming-1.jpg"
                alt="banner-cls"
                src="/images/collections/grid-cls/gaming-1.jpg"
                width={630}
                height={630}
              />
            </a>
            <div className="content text-start">
              <div className="box-title">
                <p className="tag text-btn-uppercase text-white">Accessories</p>
                <h3 className="title">
                  <Link
                    href={`/shop-default-grid`}
                    className="link text-white fw-bold font-5"
                  >
                    Ultimate Audio <br />
                    Experience
                  </Link>
                </h3>
                <p className="text-white body-text-1">
                  Clear sound, all-day comfort.
                </p>
              </div>
              <div className="box-btn">
                <Link
                  href={`/shop-default-grid`}
                  className="btn-line style-white has-icon"
                >
                  Shop Now
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
          <div
            className="collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp"
            data-wow-delay="0s"
          >
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/grid-cls/gaming-2.jpg"
                alt="banner-cls"
                src="/images/collections/grid-cls/gaming-2.jpg"
                width={630}
                height={630}
              />
            </a>
            <div className="content text-start">
              <div className="box-title">
                <p className="tag text-btn-uppercase text-white">Accessories</p>
                <h3 className="title">
                  <Link
                    href={`/shop-default-grid`}
                    className="link text-white fw-bold font-5"
                  >
                    Essential Style <br />
                    Accessories
                  </Link>
                </h3>
                <p className="text-white body-text-1">
                  Style meets functionality.
                </p>
              </div>
              <div className="box-btn">
                <Link
                  href={`/shop-default-grid`}
                  className="btn-line style-white has-icon"
                >
                  Shop Now
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
          <div
            className="wd-load collection-default abs-left-center type-xl radius-20 hover-img wow fadeInUp"
            data-wow-delay="0s"
          >
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/collections/grid-cls/gaming-3.jpg"
                alt="banner-cls"
                src="/images/collections/grid-cls/gaming-3.jpg"
                width={1290}
                height={500}
              />
            </a>
            <div className="content text-start">
              <div className="box-title">
                <p className="tag text-white body-text fw-semibold">
                  ROG GAMING MOUSE
                </p>
                <h1 className="title">
                  <Link
                    href={`/shop-default-grid`}
                    className="link text-white fw-bold font-5"
                  >
                    Precision at Your <br />
                    Fingertips
                  </Link>
                </h1>
                <p className="text-white body-text-1">
                  Unleash Speed, Accuracy, and Control for the <br />
                  Ultimate Gaming Edge!
                </p>
              </div>
              <div className="box-btn">
                <Link
                  href={`/shop-default-grid`}
                  className="tf-btn btn-fill btn-white btn-md"
                >
                  <span className="text">Shop now</span>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
