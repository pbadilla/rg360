import React from "react";
import Image from "next/image";

export default function Categories() {
  return (
    <div
      className="offcanvas offcanvas-start canvas-filter canvas-categories"
      id="shopCategories"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <span className="icon-left icon-filter" />
          <h5>Categories</h5>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="canvas-body">
          <div className="wd-facet-categories">
            <div
              role="dialog"
              className="facet-title collapsed"
              data-bs-target="#forWomen"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="forWomen"
            >
              <Image
                className="avt"
                alt="avt"
                src="/images/avatar/women.jpg"
                width={48}
                height={48}
              />
              <span className="title">For Women</span>
              <span className="icon icon-arrow-down" />
            </div>
            <div id="forWomen" className="collapse">
              <ul className="facet-body">
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/new-in.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      New in
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/promotion.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Promotion
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/clothing.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Clothing
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/shoes.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Shoes
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/bags.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Bags
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/accessories.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Accessories
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/jewelry.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Jewelry
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="wd-facet-categories">
            <div
              role="dialog"
              className="facet-title collapsed"
              data-bs-target="#forMen"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="forMen"
            >
              <Image
                className="avt"
                alt="avt"
                src="/images/avatar/men.jpg"
                width={48}
                height={48}
              />
              <span className="title">For Men</span>
              <span className="icon icon-arrow-down" />
            </div>
            <div id="forMen" className="collapse">
              <ul className="facet-body">
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/men.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Men
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/men.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Men
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="wd-facet-categories">
            <div
              role="dialog"
              className="facet-title collapsed"
              data-bs-target="#forKid"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="forKid"
            >
              <Image
                className="avt"
                alt="avt"
                src="/images/avatar/kid.jpg"
                width={48}
                height={48}
              />
              <span className="title">For Kid</span>
              <span className="icon icon-arrow-down" />
            </div>
            <div id="forKid" className="collapse">
              <ul className="facet-body">
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/kid.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Kid
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/kid.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Kid
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="wd-facet-categories">
            <div
              role="dialog"
              className="facet-title collapsed"
              data-bs-target="#accessories"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="accessories"
            >
              <Image
                className="avt"
                alt="avt"
                src="/images/avatar/accessories.jpg"
                width={48}
                height={48}
              />
              <span className="title">Accessories</span>
              <span className="icon icon-arrow-down" />
            </div>
            <div id="accessories" className="collapse">
              <ul className="facet-body">
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/accessories.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Accessories
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className="item link">
                    <Image
                      className="avt"
                      alt="avt"
                      src="/images/avatar/accessories.jpg"
                      width={48}
                      height={48}
                    />
                    <span className="title-sub text-caption-1 text-secondary">
                      Accessories
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
