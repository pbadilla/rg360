import React from "react";
import Image from "next/image";
export default function Description() {
  return (
    <>
      {" "}
      <div className="right">
        <div className="letter-1 text-btn-uppercase mb_12">
          Stretch strap top
        </div>
        <p className="mb_12 text-secondary">
          Nodding to retro styles, this Hyperbola T-shirt is defined by its
          off-the-shoulder design. It's spun from a green stretch cotton jersey
          and adorned with an embroidered AC logo on the front, a brand's
          signature.
        </p>
        <p className="text-secondary">
          Thick knitted fabric. Short design. Straight design. Rounded neck.
          Sleeveless. Straps. Unclosed. Cable knit finish. Co-ord.
        </p>
      </div>
      <div className="left">
        <div className="letter-1 text-btn-uppercase mb_12">
          COMPOSITION, ORIGIN AND CARE GUIDELINES
        </div>
        <ul className="list-text type-disc mb_12 gap-6">
          <li className="font-2">
            Composition: 55% polyester, 30% acrylic, 13% polyamide, 2% elastane
          </li>
          <li className="font-2">Designed in Barcelona</li>
          <li className="font-2">Origin</li>
          <li className="font-2">Manufacture: USA</li>
        </ul>
        <div className="d-flex gap-20 mb_12 list-icon-guideline">
          <div className="d-flex">
            <svg
              width={24}
              height={22}
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                width={24}
                height="21.6"
                fill="url(#pattern0_15741_41601)"
              />
              <defs>
                <pattern
                  id="pattern0_15741_41601"
                  patternContentUnits="objectBoundingBox"
                  width={1}
                  height={1}
                >
                  <use
                    xlinkHref="#image0_15741_41601"
                    transform="scale(0.0125 0.0138889)"
                  />
                </pattern>
                <image
                  id="image0_15741_41601"
                  width={80}
                  height={72}
                  alt=""
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
          <div className="d-flex">
            <svg
              width={24}
              height={22}
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                width={24}
                height="21.6"
                fill="url(#pattern0_15741_41602)"
              />
              <defs>
                <pattern
                  id="pattern0_15741_41602"
                  patternContentUnits="objectBoundingBox"
                  width={1}
                  height={1}
                >
                  <use
                    xlinkHref="#image0_15741_41602"
                    transform="scale(0.0125 0.0138889)"
                  />
                </pattern>
                <image
                  id="image0_15741_41602"
                  width={80}
                  height={72}
                  alt=""
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAYAAABhlHJbAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAASAAAAABhcJAMAAAKIklEQVR4Ae2bu28USRDG/QLJoU8ggSEyISKAdQiZHULmDQnZ8C6z08vsPwGHd5kdcpkdHhnLQ0jO2NSI4DY9AcL3/ZquUc/uPHpmZ9br0460npme7q7qr7+uqq4ZLyzMjzkCcwTmCMwRmCPwf0LgwYMHaw8fPty9CmNamkUlV1ZWXiwuLu4C5CzqF+o0cwACGuDptwaQobKzeD1zAHr2OeYtLS3NAazKmhHQNh49ejTTIM4UAz1YG4B+cXFxypnlzHlWj0wAZYfcIKattIEl8A6/ffvW8/IvjYWa0E4ZBmMAdjqd/WvXrr2ZdhgRsk/gHXz8+HEAkH4AU13GEEj6nEj2SVkkkALQV97BA8oW7QvMo7IOymaownMHEqABnm/nAJQ+HU3oVoW+alfVmHcgkGRugUNZJJACUIoPv379uhnMPJ19alt5+gekEDSu375925cuU7GFEAXCSOwRwEnu8MePH9vv3r078HplnpZHS798+fLv+fn5X+vr62fqxM2COnyu+9UbN270eT7aZtJ79f1SMjYAS6ClFL5169Y58nmu69efP382dk4qNmnPBIppr1Tw2Bcey4xsf/jw4SyplHORYmBYp9/v0wlsdAzQs12x8STGsIb9lF179rnlKVkp8GgrBpyaDgKxcY8s+bsyV9g7JnCoX09j77Iay3Tn+WJMJS9k3+qK2ntl1La6ZWeMtYDZAiSxbzurPiD7QRLebLK0s+pVKdOS3RAhWK7OdKjfvggDcJUYnsvAUBnAQnGEUI6DYeAoEdarek17wKOd+h5jn/XnWWigTeyRIYR3FA48CKFJ2awKHvpFAUhFZh27oEs3UAaOEngtntc51N6W5ACQSvowj/yi7sSpnXMUEED6s10kVNqcZDWNOZGiQXgHcxo6GNXf0f19OZjTKg4GEGS4/0CeBrEnx2UMy1SB55LzXA8JsVZxdJkVcwoxA8vLy38HS5ZgvStHUWnJjnYfzcCwoXcw91R27Mt3rl+/TvAdHauF7BO7LWAOxYxd2zIXCNEs9Kzbx4bCOvWBc+hKZi/WUYwpEhRUYmDQbsGz8VihBWFNR8qt6+fCHbGjcDlWZZ/JDVkoNhFuFcohYlA9HIUzMwLvVKx79v79+9fW56TnWgwMhXr7sS3lbAnuSvE3KB/WC6+1dM1uDmLZZ+1l8B1bJQ8W5iZccRQCjh1F6Ci26zgKk511rs3AsDMxgeNQNmpV5Y+l9LrOO2LnggLf1GwzaM+KVYFxMPo87Dfr+ubNm2dajmSsSbwOR9vT/927d19Rh/Z+Yp9pos3cZHVbu2xiBoaSZRv3BAqeesAANQgLdxKmiH1u8BrY8Pv371G2L5SB3VJbiwRSaX+/j/0k2WaLD4gciCDCPpq8jgqkqwqEBXIqL9XObM9Qg+ppn30q58EA14i96oYP9B/2w0TontDEWOfk4eyq6l61fisAmhKygwzIYi6KCRnclknMuDeJF8TGwXDfJ31v8EfHsSaqEQ/7s7viv60CiGixJbVlokxL8JAwguu6B/2K5Z+sPSaBpV2X1dZP1XMjTqRIqMKdoXcw91WPH2n6DuHPqAMo6id85ifFZXCC8idtOYpAxthlo05krPd0QSqsCRyMLb107Zy7MOE5UiXV/8iz1m6nAqC3hQ4oLbNNjcYZdzExej+N41A/OKZUwhNz4NGZOMlQB+WpACjFzDti++Qc+12VdbFbeGRdH5ENBqSsQbBFZKtoXlZ1yFXe05JlJ+IAxCxU2UpmyalT1jqADIrBeeWMLQuEGAIhTNhm7qe9t00SnoQ/TIB5cCZEE+G2dJJj2Z06WNRq07oX1rKLSZhaSGKDOFAoQmwXlfBkkmRTAXmBQN4z0/pq9dwqgFUGJqBhKZ7V2JoMPCbojpmopMMGL1pdwrakWGJlrGApakk7uxiODyehtrnZaqurera92yLMsfK2z60ByCAEYGm63gYIW7VkcRQpR6L7F0UOxtr7CXLJUfUzNVvYGoA2CDGjX8Q+PK8AGkt4ygb+AnM9QO79NDGgAZZ1DlgYnXDN6qdKWSs7Edhn6Xop87t2IpnZEOxeXsLTJ2z/DBK2MJPXB7nvp5EzSdq/CnBWtxUGGvskJDdhSnii5Vma8PT2L5WwVf+576enzcLGGRiyT4MZe1nEcyU8jxR2WHANOwsTnmIWRyphi23M2k+rXsLCmLS/ManuuXEGFqXrsWFiD6yrlfBUAO0StpoY99VA3n5aYY8L2FWvMO1fF7SwXaMA4hAEjvOAtpQQRrnsXWofq+IugNiOIlSq6BqHxDZOdVL7afWf7IVJsAKydCn9uqpIVsyzRpfwnTt3fhUrnqK8BtnDERCeiJWvjHV6BgBP9GYs07HEKG1vBG/fvn2u+ryDYeKeyoG499NMCu9jvMyO3lkf0iam76p1GtuJwDItz1S6HkfBMkMpQNWv8YQnNlVyky2fRA20hHtiYX9Un6rgxNRvDEADC6AkmBdLybZMZbCtx24jRqk6dUx+0PZAQA79BA5kLlj2jR+NASgHQXp9Qz++N2FJ2Y7iAFvXuOYZHWIuBBi2Fj0c600P6cQEJtmgjOa1ihpxIt6AO6WlBVu45AvPaYHH6HEw2sEkX9gaeDzTdSvbu0aciIw3n8Ya49A3+gtPKjd5eAcTfmHLy36ONZwOceLP22b+Tgwg4Ylm15IG2L/ftFT22vJ6scMWUGfyvsda0veln62Ox5rsAc9i+ymrV9sGCrhU/g5HQTpKIcREn4uVKVzn+aiDka582lY5Bs2SXQtAFMKm6JcsW9keXpTPHHg2aDk5zEyYzcHZ8ZnbREu6khPxO4oTQoMQPCl2PMvgAaJt77j2B85u4n8oigbQ72PDD3cStmUoZ0rOzBkPLca5/KLOBPXhfvoNAXkdZUsBhHUCj91E8j5Wwvksw1EfpVCujvBpt5GulvYnTu2hOzroukOSI9xPx+pW6IVxFFkJTzFuoHICVoLVnj7RSNgYK/gy6qGnQpmnAmxdeg9l/7phwlblyX46NorIZaB3FJkJT82WZVwK0/WXAVKETHsR79L+Wj2wMkzYVvr3tjEGYguKEp48j0nXRwzkUqoQSCsWfC7hydf+KuM4VDlBN9mdVf2i/r1tjIHYAjXOTXga+yQoN11/KchUEBrYwtTLJ7adMk/uC1vfHf+Qk/yHVpaIMQDpHPugymMJT9gncC0V7wxyVqezXuaTCs5uB4Rwatt+WjfH4KCAu/o48bxZIOCN9bvQL/mwMaveVSjDxjMWOcp/8sabVx6Ob4yBPCSjG1bims40I459VyHuG9V/9D4m7Z+Fw2g/mQCOVuJejmOir+uz+rzMMsDBXKGDzFLqa/8qekXthWGfbIVL13v7ONH+sYqCLdfFE7uPmTQuPpurbO9WYhQ09lFXs4V9NC8d0/yq1CG2bQdAEJDdm0paftpoi4GJSK20jVlPiiTKzi/mCMwRmCMwR+DqI/AfrY/kRd8vd+kAAAAASUVORK5CYII="
                />
              </defs>
            </svg>
          </div>
          <div className="d-flex">
            <svg
              width={24}
              height={22}
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                width={24}
                height="21.6"
                fill="url(#pattern0_15741_41603)"
              />
              <defs>
                <pattern
                  id="pattern0_15741_41603"
                  patternContentUnits="objectBoundingBox"
                  width={1}
                  height={1}
                >
                  <use
                    xlinkHref="#image0_15741_41603"
                    transform="scale(0.0125 0.0138889)"
                  />
                </pattern>
                <image
                  id="image0_15741_41603"
                  width={80}
                  height={72}
                  alt=""
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAYAAABhlHJbAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAASAAAAABhcJAMAAAErUlEQVR4Ae2bzVXbQBSFbR/D3i04axaglAAlkBJMCbiEuAQoAUogJcSwYO8S4j32wbl3oqeMpBl5RgJJ2M/nmJFkzd+n+35GEoOBfpSAElACSkAJKAEloASUgBJQAm0TGNbt8Pz8/LJu3T7W2263q9fX11Xs2MaxFeT84XD4xG2UcuhLl6enpwtMYB47iVFshUM9f7fb1bKow5BPg6tKVzQajYw1LZfLaB5Hr8CXl5dfwr+OXz96gIQH812mEBOBGVoqwH+kDEAExGkoODlPAYIEFCjpiypQlBFZigKTs7OzSUxdVSBo2YFkPB5HqVABpnKrG0gUYAoQAcSkM8gJVYExPkzOrRtIVIFCcDCQXHAaE0gUYArw+flZAA5iAokC/K9A5oOyrAv2gwrQAohAIvlg8J0ZBWgBrBNIFKAFcLPZGBOGEicIJFPrJ++mArTQ8JY+VLjmIdyhDvKDCtACmG4aP/j+/q4KLLPZf0QiMcw4KJCoAgtMsZQzt7ZCAUY/Ayj0592lE0ZCKmZQ8idcc+JqR9068nb2sT9MAM+MF+P7bifYrm5qP9YsNpY+T0h45YKvXv8fiRJktkIpzpn7jQBSZYhWM1ypGaB51SR+RQaAc9dw0pUDk3O7KDG+a3wpBrEg7zBqASS4k5OTW3QwY8soTQcAtcQ2c6kltlf75G8q9fAPrIlzoospuZ7icKMBovFb+K+fVkMrqOker0Y81nk1wmqnT5vBS7rgIJKq7oFXJp0pk84FVHbfp5l/xFgw1wlc0x+2hTlWBpKgNObi4iKByf4WeFDcHE/xvx0iPEKDJXE1YtIZALzkMd9nrwkTHio/Ad4Eja3x/WE/hPE1fADHacZTzLsykFQqkFJGI3cCD9tXRwJvYGUJ4rKcmqhUIPzAHWoxGlHSV181qjpnvv+gBJJKgN4gkiTJNfp4YD8AeNOmv6PysYoxKRL7hwWs2+yfffIDBjuWUKPX8pwK5AQAjabL+o9tDt72uexcPjg+w/26q9TBy+FPLcGAeS0VyK/c7s/16fSBvPri997e3qLf2sz1ELmDfpmgl1Y1nIityshm654uZuwNJE6AnAR7xBVYdJAc03U4P7EPvZ2NRBzE/PfemSkBpKmIArC66FWSjAmVlBnBo86pRoGo6H1WXAIIeJI4cmlmbm/X6blBHXnVzNVE1W+u8xsds1M2uA9nNC4BRI/GhHC1nU6z0YjCKj/6TsOYvL/56jQ9jj5FhfsB2u8II+K1PlhOFkFrgUHnXAf2eftrbiuiKZjQ+rBIIySf/y2mMYYyqXdkvrIOvUEqNRez6QKcAAaLFSBy16nAHECcOE0rimylndbL9AJ25Ubs+QoLBpJpMSsp+kADkNTtFo55216+up4VFwEamcLeFaClGgjKWAL8sFho9msOIEzY5Fk4sYv0JRtU3zbAxZgxSknxsiHmAGZHdSNHwHJppUCSAaSDlFpdRj0ZQ89KUWDppaMMIFKGDGDPBt/5cBhIoELj1oqBJJfGyEixHjb/vSj7WuYI0IyzRYYToMtZ5po44h0oMecHM4D8l3eYcav3/o74OujUlYASUAJKQAkoASWgBJSAElACDQj8BQtLlbWiLn8cAAAAAElFTkSuQmCC"
                />
              </defs>
            </svg>
          </div>
          <div className="d-flex">
            <svg
              width={24}
              height={22}
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                width={24}
                height="21.6"
                fill="url(#pattern0_15741_41604)"
              />
              <defs>
                <pattern
                  id="pattern0_15741_41604"
                  patternContentUnits="objectBoundingBox"
                  width={1}
                  height={1}
                >
                  <use
                    xlinkHref="#image0_15741_41604"
                    transform="scale(0.0125 0.0138889)"
                  />
                </pattern>
                <image
                  id="image0_15741_41604"
                  width={80}
                  height={72}
                  alt=""
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
          <div className="d-flex">
            <svg
              width={24}
              height={22}
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                width={24}
                height="21.6"
                fill="url(#pattern0_15741_41605)"
              />
              <defs>
                <pattern
                  id="pattern0_15741_41605"
                  patternContentUnits="objectBoundingBox"
                  width={1}
                  height={1}
                >
                  <use
                    xlinkHref="#image0_15741_41605"
                    transform="scale(0.0125 0.0138889)"
                  />
                </pattern>
                <image
                  id="image0_15741_41605"
                  width={80}
                  height={72}
                  alt=""
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
        </div>
        <div className="text-caption-2">
          MACHINE WASHING MAX 30°C / 85ºF SHORT SPIN DRY
        </div>
      </div>
    </>
  );
}
