"use client";

import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
const discounts = [
  {
    discount: "10% OFF",
    details: "For all orders from 200$",
    code: "Mo234231",
  },
  {
    discount: "10% OFF",
    details: "For all orders from 200$",
    code: "Mo234231",
  },
  {
    discount: "10% OFF",
    details: "For all orders from 200$",
    code: "Mo234231",
  },
];
export default function Checkout() {
  const [activeDiscountIndex, setActiveDiscountIndex] = useState(1);
  const { cartProducts, totalPrice } = useContextElement();
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="flat-spacing tf-page-checkout">
              <div className="wrap">
                <div className="title-login">
                  <p>Already have an account?</p>{" "}
                  <Link href={`/login`} className="text-button">
                    Login here
                  </Link>
                </div>
                <form
                  className="login-box"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid-2">
                    <input type="text" placeholder="Your name/Email" />
                    <input type="password" placeholder="Password" />
                  </div>
                  <button className="tf-btn" type="submit">
                    <span className="text">Login</span>
                  </button>
                </form>
              </div>
              <div className="wrap">
                <h5 className="title">Information</h5>
                <form className="info-box" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid-2">
                    <input type="text" placeholder="First Name*" />
                    <input type="text" placeholder="Last Name*" />
                  </div>
                  <div className="grid-2">
                    <input type="text" placeholder="Email Address*" />
                    <input type="text" placeholder="Phone Number*" />
                  </div>
                  <div className="tf-select">
                    <select
                      className="text-title"
                      name="address[country]"
                      data-default=""
                    >
                      <option
                        selected=""
                        value="Choose Country/Region"
                        data-provinces="[]"
                      >
                        Choose Country/Region
                      </option>
                      <option
                        value="United States"
                        data-provinces="[['Alabama','Alabama'],['Alaska','Alaska'],['American Samoa','American Samoa'],['Arizona','Arizona'],['Arkansas','Arkansas'],['Armed Forces Americas','Armed Forces Americas'],['Armed Forces Europe','Armed Forces Europe'],['Armed Forces Pacific','Armed Forces Pacific'],['California','California'],['Colorado','Colorado'],['Connecticut','Connecticut'],['Delaware','Delaware'],['District of Columbia','Washington DC'],['Federated States of Micronesia','Micronesia'],['Florida','Florida'],['Georgia','Georgia'],['Guam','Guam'],['Hawaii','Hawaii'],['Idaho','Idaho'],['Illinois','Illinois'],['Indiana','Indiana'],['Iowa','Iowa'],['Kansas','Kansas'],['Kentucky','Kentucky'],['Louisiana','Louisiana'],['Maine','Maine'],['Marshall Islands','Marshall Islands'],['Maryland','Maryland'],['Massachusetts','Massachusetts'],['Michigan','Michigan'],['Minnesota','Minnesota'],['Mississippi','Mississippi'],['Missouri','Missouri'],['Montana','Montana'],['Nebraska','Nebraska'],['Nevada','Nevada'],['New Hampshire','New Hampshire'],['New Jersey','New Jersey'],['New Mexico','New Mexico'],['New York','New York'],['North Carolina','North Carolina'],['North Dakota','North Dakota'],['Northern Mariana Islands','Northern Mariana Islands'],['Ohio','Ohio'],['Oklahoma','Oklahoma'],['Oregon','Oregon'],['Palau','Palau'],['Pennsylvania','Pennsylvania'],['Puerto Rico','Puerto Rico'],['Rhode Island','Rhode Island'],['South Carolina','South Carolina'],['South Dakota','South Dakota'],['Tennessee','Tennessee'],['Texas','Texas'],['Utah','Utah'],['Vermont','Vermont'],['Virgin Islands','U.S. Virgin Islands'],['Virginia','Virginia'],['Washington','Washington'],['West Virginia','West Virginia'],['Wisconsin','Wisconsin'],['Wyoming','Wyoming']]"
                      >
                        United States
                      </option>
                      <option
                        value="Australia"
                        data-provinces="[['Australian Capital Territory','Australian Capital Territory'],['New South Wales','New South Wales'],['Northern Territory','Northern Territory'],['Queensland','Queensland'],['South Australia','South Australia'],['Tasmania','Tasmania'],['Victoria','Victoria'],['Western Australia','Western Australia']]"
                      >
                        Australia
                      </option>
                      <option value="Austria" data-provinces="[]">
                        Austria
                      </option>
                      <option value="Belgium" data-provinces="[]">
                        Belgium
                      </option>
                      <option
                        value="Canada"
                        data-provinces="[['Alberta','Alberta'],['British Columbia','British Columbia'],['Manitoba','Manitoba'],['New Brunswick','New Brunswick'],['Newfoundland and Labrador','Newfoundland and Labrador'],['Northwest Territories','Northwest Territories'],['Nova Scotia','Nova Scotia'],['Nunavut','Nunavut'],['Ontario','Ontario'],['Prince Edward Island','Prince Edward Island'],['Quebec','Quebec'],['Saskatchewan','Saskatchewan'],['Yukon','Yukon']]"
                      >
                        Canada
                      </option>
                      <option value="Czech Republic" data-provinces="[]">
                        Czechia
                      </option>
                      <option value="Denmark" data-provinces="[]">
                        Denmark
                      </option>
                      <option value="Finland" data-provinces="[]">
                        Finland
                      </option>
                      <option value="France" data-provinces="[]">
                        France
                      </option>
                      <option value="Germany" data-provinces="[]">
                        Germany
                      </option>
                      <option
                        value="Hong Kong"
                        data-provinces="[['Hong Kong Island','Hong Kong Island'],['Kowloon','Kowloon'],['New Territories','New Territories']]"
                      >
                        Hong Kong SAR
                      </option>
                      <option
                        value="Ireland"
                        data-provinces="[['Carlow','Carlow'],['Cavan','Cavan'],['Clare','Clare'],['Cork','Cork'],['Donegal','Donegal'],['Dublin','Dublin'],['Galway','Galway'],['Kerry','Kerry'],['Kildare','Kildare'],['Kilkenny','Kilkenny'],['Laois','Laois'],['Leitrim','Leitrim'],['Limerick','Limerick'],['Longford','Longford'],['Louth','Louth'],['Mayo','Mayo'],['Meath','Meath'],['Monaghan','Monaghan'],['Offaly','Offaly'],['Roscommon','Roscommon'],['Sligo','Sligo'],['Tipperary','Tipperary'],['Waterford','Waterford'],['Westmeath','Westmeath'],['Wexford','Wexford'],['Wicklow','Wicklow']]"
                      >
                        Ireland
                      </option>
                      <option value="Israel" data-provinces="[]">
                        Israel
                      </option>
                      <option
                        value="Italy"
                        data-provinces="[['Agrigento','Agrigento'],['Alessandria','Alessandria'],['Ancona','Ancona'],['Aosta','Aosta Valley'],['Arezzo','Arezzo'],['Ascoli Piceno','Ascoli Piceno'],['Asti','Asti'],['Avellino','Avellino'],['Bari','Bari'],['Barletta-Andria-Trani','Barletta-Andria-Trani'],['Belluno','Belluno'],['Benevento','Benevento'],['Bergamo','Bergamo'],['Biella','Biella'],['Bologna','Bologna'],['Bolzano','South Tyrol'],['Brescia','Brescia'],['Brindisi','Brindisi'],['Cagliari','Cagliari'],['Caltanissetta','Caltanissetta'],['Campobasso','Campobasso'],['Carbonia-Iglesias','Carbonia-Iglesias'],['Caserta','Caserta'],['Catania','Catania'],['Catanzaro','Catanzaro'],['Chieti','Chieti'],['Como','Como'],['Cosenza','Cosenza'],['Cremona','Cremona'],['Crotone','Crotone'],['Cuneo','Cuneo'],['Enna','Enna'],['Fermo','Fermo'],['Ferrara','Ferrara'],['Firenze','Florence'],['Foggia','Foggia'],['Forlì-Cesena','Forlì-Cesena'],['Frosinone','Frosinone'],['Genova','Genoa'],['Gorizia','Gorizia'],['Grosseto','Grosseto'],['Imperia','Imperia'],['Isernia','Isernia'],['L'Aquila','L’Aquila'],['La Spezia','La Spezia'],['Latina','Latina'],['Lecce','Lecce'],['Lecco','Lecco'],['Livorno','Livorno'],['Lodi','Lodi'],['Lucca','Lucca'],['Macerata','Macerata'],['Mantova','Mantua'],['Massa-Carrara','Massa and Carrara'],['Matera','Matera'],['Medio Campidano','Medio Campidano'],['Messina','Messina'],['Milano','Milan'],['Modena','Modena'],['Monza e Brianza','Monza and Brianza'],['Napoli','Naples'],['Novara','Novara'],['Nuoro','Nuoro'],['Ogliastra','Ogliastra'],['Olbia-Tempio','Olbia-Tempio'],['Oristano','Oristano'],['Padova','Padua'],['Palermo','Palermo'],['Parma','Parma'],['Pavia','Pavia'],['Perugia','Perugia'],['Pesaro e Urbino','Pesaro and Urbino'],['Pescara','Pescara'],['Piacenza','Piacenza'],['Pisa','Pisa'],['Pistoia','Pistoia'],['Pordenone','Pordenone'],['Potenza','Potenza'],['Prato','Prato'],['Ragusa','Ragusa'],['Ravenna','Ravenna'],['Reggio Calabria','Reggio Calabria'],['Reggio Emilia','Reggio Emilia'],['Rieti','Rieti'],['Rimini','Rimini'],['Roma','Rome'],['Rovigo','Rovigo'],['Salerno','Salerno'],['Sassari','Sassari'],['Savona','Savona'],['Siena','Siena'],['Siracusa','Syracuse'],['Sondrio','Sondrio'],['Taranto','Taranto'],['Teramo','Teramo'],['Terni','Terni'],['Torino','Turin'],['Trapani','Trapani'],['Trento','Trentino'],['Treviso','Treviso'],['Trieste','Trieste'],['Udine','Udine'],['Varese','Varese'],['Venezia','Venice'],['Verbano-Cusio-Ossola','Verbano-Cusio-Ossola'],['Vercelli','Vercelli'],['Verona','Verona'],['Vibo Valentia','Vibo Valentia'],['Vicenza','Vicenza'],['Viterbo','Viterbo']]"
                      >
                        Italy
                      </option>
                      <option
                        value="Japan"
                        data-provinces="[['Aichi','Aichi'],['Akita','Akita'],['Aomori','Aomori'],['Chiba','Chiba'],['Ehime','Ehime'],['Fukui','Fukui'],['Fukuoka','Fukuoka'],['Fukushima','Fukushima'],['Gifu','Gifu'],['Gunma','Gunma'],['Hiroshima','Hiroshima'],['Hokkaidō','Hokkaido'],['Hyōgo','Hyogo'],['Ibaraki','Ibaraki'],['Ishikawa','Ishikawa'],['Iwate','Iwate'],['Kagawa','Kagawa'],['Kagoshima','Kagoshima'],['Kanagawa','Kanagawa'],['Kumamoto','Kumamoto'],['Kyōto','Kyoto'],['Kōchi','Kochi'],['Mie','Mie'],['Miyagi','Miyagi'],['Miyazaki','Miyazaki'],['Nagano','Nagano'],['Nagasaki','Nagasaki'],['Nara','Nara'],['Niigata','Niigata'],['Okayama','Okayama'],['Okinawa','Okinawa'],['Saga','Saga'],['Saitama','Saitama'],['Shiga','Shiga'],['Shimane','Shimane'],['Shizuoka','Shizuoka'],['Tochigi','Tochigi'],['Tokushima','Tokushima'],['Tottori','Tottori'],['Toyama','Toyama'],['Tōkyō','Tokyo'],['Wakayama','Wakayama'],['Yamagata','Yamagata'],['Yamaguchi','Yamaguchi'],['Yamanashi','Yamanashi'],['Ōita','Oita'],['Ōsaka','Osaka']]"
                      >
                        Japan
                      </option>
                      <option
                        value="Malaysia"
                        data-provinces="[['Johor','Johor'],['Kedah','Kedah'],['Kelantan','Kelantan'],['Kuala Lumpur','Kuala Lumpur'],['Labuan','Labuan'],['Melaka','Malacca'],['Negeri Sembilan','Negeri Sembilan'],['Pahang','Pahang'],['Penang','Penang'],['Perak','Perak'],['Perlis','Perlis'],['Putrajaya','Putrajaya'],['Sabah','Sabah'],['Sarawak','Sarawak'],['Selangor','Selangor'],['Terengganu','Terengganu']]"
                      >
                        Malaysia
                      </option>
                      <option value="Netherlands" data-provinces="[]">
                        Netherlands
                      </option>
                      <option
                        value="New Zealand"
                        data-provinces="[['Auckland','Auckland'],['Bay of Plenty','Bay of Plenty'],['Canterbury','Canterbury'],['Chatham Islands','Chatham Islands'],['Gisborne','Gisborne'],['Hawke's Bay','Hawke’s Bay'],['Manawatu-Wanganui','Manawatū-Whanganui'],['Marlborough','Marlborough'],['Nelson','Nelson'],['Northland','Northland'],['Otago','Otago'],['Southland','Southland'],['Taranaki','Taranaki'],['Tasman','Tasman'],['Waikato','Waikato'],['Wellington','Wellington'],['West Coast','West Coast']]"
                      >
                        New Zealand
                      </option>
                      <option value="Norway" data-provinces="[]">
                        Norway
                      </option>
                      <option value="Poland" data-provinces="[]">
                        Poland
                      </option>
                      <option
                        value="Portugal"
                        data-provinces="[['Aveiro','Aveiro'],['Açores','Azores'],['Beja','Beja'],['Braga','Braga'],['Bragança','Bragança'],['Castelo Branco','Castelo Branco'],['Coimbra','Coimbra'],['Faro','Faro'],['Guarda','Guarda'],['Leiria','Leiria'],['Lisboa','Lisbon'],['Madeira','Madeira'],['Portalegre','Portalegre'],['Porto','Porto'],['Santarém','Santarém'],['Setúbal','Setúbal'],['Viana do Castelo','Viana do Castelo'],['Vila Real','Vila Real'],['Viseu','Viseu'],['Évora','Évora']]"
                      >
                        Portugal
                      </option>
                      <option value="Singapore" data-provinces="[]">
                        Singapore
                      </option>
                      <option
                        value="South Korea"
                        data-provinces="[['Busan','Busan'],['Chungbuk','North Chungcheong'],['Chungnam','South Chungcheong'],['Daegu','Daegu'],['Daejeon','Daejeon'],['Gangwon','Gangwon'],['Gwangju','Gwangju City'],['Gyeongbuk','North Gyeongsang'],['Gyeonggi','Gyeonggi'],['Gyeongnam','South Gyeongsang'],['Incheon','Incheon'],['Jeju','Jeju'],['Jeonbuk','North Jeolla'],['Jeonnam','South Jeolla'],['Sejong','Sejong'],['Seoul','Seoul'],['Ulsan','Ulsan']]"
                      >
                        South Korea
                      </option>
                      <option
                        value="Spain"
                        data-provinces="[['A Coruña','A Coruña'],['Albacete','Albacete'],['Alicante','Alicante'],['Almería','Almería'],['Asturias','Asturias Province'],['Badajoz','Badajoz'],['Balears','Balears Province'],['Barcelona','Barcelona'],['Burgos','Burgos'],['Cantabria','Cantabria Province'],['Castellón','Castellón'],['Ceuta','Ceuta'],['Ciudad Real','Ciudad Real'],['Cuenca','Cuenca'],['Cáceres','Cáceres'],['Cádiz','Cádiz'],['Córdoba','Córdoba'],['Girona','Girona'],['Granada','Granada'],['Guadalajara','Guadalajara'],['Guipúzcoa','Gipuzkoa'],['Huelva','Huelva'],['Huesca','Huesca'],['Jaén','Jaén'],['La Rioja','La Rioja Province'],['Las Palmas','Las Palmas'],['León','León'],['Lleida','Lleida'],['Lugo','Lugo'],['Madrid','Madrid Province'],['Melilla','Melilla'],['Murcia','Murcia'],['Málaga','Málaga'],['Navarra','Navarra'],['Ourense','Ourense'],['Palencia','Palencia'],['Pontevedra','Pontevedra'],['Salamanca','Salamanca'],['Santa Cruz de Tenerife','Santa Cruz de Tenerife'],['Segovia','Segovia'],['Sevilla','Seville'],['Soria','Soria'],['Tarragona','Tarragona'],['Teruel','Teruel'],['Toledo','Toledo'],['Valencia','Valencia'],['Valladolid','Valladolid'],['Vizcaya','Biscay'],['Zamora','Zamora'],['Zaragoza','Zaragoza'],['Álava','Álava'],['Ávila','Ávila']]"
                      >
                        Spain
                      </option>
                      <option value="Sweden" data-provinces="[]">
                        Sweden
                      </option>
                      <option value="Switzerland" data-provinces="[]">
                        Switzerland
                      </option>
                      <option
                        value="United Arab Emirates"
                        data-provinces="[['Abu Dhabi','Abu Dhabi'],['Ajman','Ajman'],['Dubai','Dubai'],['Fujairah','Fujairah'],['Ras al-Khaimah','Ras al-Khaimah'],['Sharjah','Sharjah'],['Umm al-Quwain','Umm al-Quwain']]"
                      >
                        United Arab Emirates
                      </option>
                      <option
                        value="United Kingdom"
                        data-provinces="[['British Forces','British Forces'],['England','England'],['Northern Ireland','Northern Ireland'],['Scotland','Scotland'],['Wales','Wales']]"
                      >
                        United Kingdom
                      </option>
                      <option value="Vietnam" data-provinces="[]">
                        Vietnam
                      </option>
                    </select>
                  </div>
                  <div className="grid-2">
                    <input type="text" placeholder="Town/City*" />
                    <input type="text" placeholder="Street,..." />
                  </div>
                  <div className="grid-2">
                    <div className="tf-select">
                      <select className="text-title" data-default="">
                        <option selected="" value="Choose State">
                          Choose State
                        </option>
                        <option value="California">California</option>
                        <option value="Alabama">Alabam</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Washington">Washington</option>
                        <option value="Texas">Texas</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Nevada">Nevada</option>
                        <option value="Illinois">Illinois</option>
                      </select>
                    </div>
                    <input type="text" placeholder="Postal Code*" />
                  </div>
                  <textarea placeholder="Write note..." defaultValue={""} />
                </form>
              </div>
              <div className="wrap">
                <h5 className="title">Choose payment Option:</h5>
                <form
                  className="form-payment"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="payment-box" id="payment-box">
                    <div className="payment-item payment-choose-card active">
                      <label
                        htmlFor="credit-card-method"
                        className="payment-header"
                        data-bs-toggle="collapse"
                        data-bs-target="#credit-card-payment"
                        aria-controls="credit-card-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="credit-card-method"
                          defaultChecked
                        />
                        <span className="text-title">Credit Card</span>
                      </label>
                      <div
                        id="credit-card-payment"
                        className="collapse show"
                        data-bs-parent="#payment-box"
                      >
                        <div className="payment-body">
                          <p className="text-secondary">
                            Make your payment directly into our bank account.
                            Your order will not be shipped until the funds have
                            cleared in our account.
                          </p>
                          <div className="input-payment-box">
                            <input type="text" placeholder="Name On Card*" />
                            <div className="ip-card">
                              <input type="text" placeholder="Card Numbers*" />
                              <div className="list-card">
                                <Image
                                  width={48}
                                  height={16}
                                  alt="card"
                                  src="/images/payment/img-7.png"
                                />
                                <Image
                                  width={21}
                                  height={16}
                                  alt="card"
                                  src="/images/payment/img-8.png"
                                />
                                <Image
                                  width={22}
                                  height={16}
                                  alt="card"
                                  src="/images/payment/img-9.png"
                                />
                                <Image
                                  width={24}
                                  height={16}
                                  alt="card"
                                  src="/images/payment/img-10.png"
                                />
                              </div>
                            </div>
                            <div className="grid-2">
                              <input type="date" />
                              <input type="text" placeholder="CVV*" />
                            </div>
                          </div>
                          <div className="check-save">
                            <input
                              type="checkbox"
                              className="tf-check"
                              id="check-card"
                              defaultChecked
                            />
                            <label htmlFor="check-card">
                              Save Card Details
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="payment-item">
                      <label
                        htmlFor="delivery-method"
                        className="payment-header collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#delivery-payment"
                        aria-controls="delivery-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="delivery-method"
                        />
                        <span className="text-title">Cash on delivery</span>
                      </label>
                      <div
                        id="delivery-payment"
                        className="collapse"
                        data-bs-parent="#payment-box"
                      />
                    </div>
                    <div className="payment-item">
                      <label
                        htmlFor="apple-method"
                        className="payment-header collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#apple-payment"
                        aria-controls="apple-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="apple-method"
                        />
                        <span className="text-title apple-pay-title">
                          <Image
                            alt="apple"
                            src="/images/payment/applePay.png"
                            width={13}
                            height={18}
                          />
                          Apple Pay
                        </span>
                      </label>
                      <div
                        id="apple-payment"
                        className="collapse"
                        data-bs-parent="#payment-box"
                      />
                    </div>
                    <div className="payment-item paypal-item">
                      <label
                        htmlFor="paypal-method"
                        className="payment-header collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#paypal-method-payment"
                        aria-controls="paypal-method-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="paypal-method"
                        />
                        <span className="paypal-title">
                          <Image
                            alt="apple"
                            src="/images/payment/paypal.png"
                            width={90}
                            height={23}
                          />
                        </span>
                      </label>
                      <div
                        id="paypal-method-payment"
                        className="collapse"
                        data-bs-parent="#payment-box"
                      />
                    </div>
                  </div>
                  <button className="tf-btn btn-reset">Payment</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-1">
            <div className="line-separation" />
          </div>
          <div className="col-xl-5">
            <div className="flat-spacing flat-sidebar-checkout">
              <div className="sidebar-checkout-content">
                <h5 className="title">Shopping Cart</h5>
                <div className="list-product">
                  {cartProducts.map((elm, i) => (
                    <div key={i} className="item-product">
                      <Link
                        href={`/product-detail/${elm.id}`}
                        className="img-product"
                      >
                        <Image
                          alt="img-product"
                          src={elm.imgSrc}
                          width={600}
                          height={800}
                        />
                      </Link>
                      <div className="content-box">
                        <div className="info">
                          <Link
                            href={`/product-detail/${elm.id}`}
                            className="name-product link text-title"
                          >
                            {elm.title}
                          </Link>
                          <div className="variant text-caption-1 text-secondary">
                            <span className="size">XL</span>/
                            <span className="color">Blue</span>
                          </div>
                        </div>
                        <div className="total-price text-button">
                          <span className="count">{elm.quantity}</span>X
                          <span className="price">${elm.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sec-discount">
                  <Swiper
                    dir="ltr"
                    className="swiper tf-sw-categories"
                    slidesPerView={2.25} // data-preview="2.25"
                    breakpoints={{
                      1024: {
                        slidesPerView: 2.25, // data-tablet={3}
                      },
                      768: {
                        slidesPerView: 3, // data-tablet={3}
                      },
                      640: {
                        slidesPerView: 2.5, // data-mobile-sm="2.5"
                      },
                      0: {
                        slidesPerView: 1.2, // data-mobile="1.2"
                      },
                    }}
                    spaceBetween={20}
                  >
                    {discounts.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className={`box-discount ${
                            activeDiscountIndex === index ? "active" : ""
                          }`}
                          onClick={() => setActiveDiscountIndex(index)}
                        >
                          <div className="discount-top">
                            <div className="discount-off">
                              <div className="text-caption-1">Discount</div>
                              <span className="sale-off text-btn-uppercase">
                                {item.discount}
                              </span>
                            </div>
                            <div className="discount-from">
                              <p className="text-caption-1">{item.details}</p>
                            </div>
                          </div>
                          <div className="discount-bot">
                            <span className="text-btn-uppercase">
                              {item.code}
                            </span>
                            <button className="tf-btn">
                              <span className="text">Apply Code</span>
                            </button>
                          </div>
                        </div>{" "}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="ip-discount-code">
                    <input type="text" placeholder="Add voucher discount" />
                    <button className="tf-btn">
                      <span className="text">Apply Code</span>
                    </button>
                  </div>
                  <p>
                    Discount code is only used for orders with a total value of
                    products over $500.00
                  </p>
                </div>
                <div className="sec-total-price">
                  <div className="top">
                    <div className="item d-flex align-items-center justify-content-between text-button">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="item d-flex align-items-center justify-content-between text-button">
                      <span>Discounts</span>
                      <span>-$80.00</span>
                    </div>
                  </div>
                  <div className="bottom">
                    <h5 className="d-flex justify-content-between">
                      <span>Total</span>
                      <span className="total-price-checkout">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
