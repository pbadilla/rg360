import React from "react";
import Image from "next/image";
export default function ListCollections() {
  return (
    <section className="flat-spacing pt-0 line-bottom-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <ul className="list-collection style-lg">
              <li className="cls-item hover-cursor-img">
                <div className="img-cls">
                  <Image
                    alt="img-cls"
                    src="/images/collections/list-cls/cls-item-decor1.jpg"
                    width={201}
                    height={150}
                  />
                </div>
                <a href="#" className="title-cls link">
                  <h4 className="text title-display">Heritage</h4>
                </a>
              </li>
              <li className="cls-item">
                <div className="img-cls">
                  <Image
                    alt="img-cls"
                    src="/images/collections/list-cls/cls-item-decor2.jpg"
                    width={200}
                    height={150}
                  />
                </div>
                <a href="#" className="title-cls link">
                  <h4 className="text title-display">Creativity</h4>
                </a>
              </li>
              <li className="cls-item">
                <div className="img-cls">
                  <Image
                    alt="img-cls"
                    src="/images/collections/list-cls/cls-item-decor3.jpg"
                    width={201}
                    height={150}
                  />
                </div>
                <a href="#" className="title-cls link">
                  <h4 className="text title-display">and Passion</h4>
                </a>
              </li>
              <li className="cls-item">
                <a href="#" className="title-cls link d-none d-sm-block">
                  <h4 className="text title-display">of Three</h4>
                </a>
                <div className="img-cls">
                  <Image
                    alt="img-cls"
                    src="/images/collections/list-cls/cls-item-decor4.jpg"
                    width={201}
                    height={150}
                  />
                </div>
                <a href="#" className="title-cls link">
                  <h4 className="text title-display">Generations</h4>
                </a>
              </li>
            </ul>
            <div className="text-center">
              <a href="#" className="btn-line text-button">
                READ MORE ABOUT OUR COMMITMENT
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
