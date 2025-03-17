"use client";
import React, { useState } from "react";

export default function Address() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: "Default",
      name: "themesflat",
      street: "1234 Fashion Street, Suite 567",
      city: "New York",
      website: "themesflat.com",
      phone: "(212) 555-1234",
      isEditing: false,
    },
    {
      id: 2,
      title: "Home",
      name: "John Doe",
      street: "5678 Style Avenue, Apt 901",
      city: "Los Angeles",
      website: "johndoe.com",
      phone: "(310) 555-6789",
      isEditing: false,
    },
  ]);

  const handleEditToggle = (id) => {
    setAddresses((prev) =>
      prev.map((address) =>
        address.id === id
          ? { ...address, isEditing: !address.isEditing }
          : address
      )
    );
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  return (
    <div className="my-account-content">
      <div className="account-address">
        <div className="text-center widget-inner-address">
          <button
            className="tf-btn btn-fill radius-4 mb_20 btn-address"
            onClick={() =>
              document.querySelector(".createForm").classList.toggle("d-block")
            }
          >
            <span className="text text-caption-1">Add a new address</span>
          </button>
          <form
            className="show-form-address wd-form-address createForm"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="title">Add a new address</div>
            <div className="cols mb_20">
              <fieldset className="">
                <input
                  className=""
                  type="text"
                  placeholder="First Name*"
                  name="text"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <fieldset className="">
                <input
                  className=""
                  type="text"
                  placeholder="Last Name*"
                  name="text"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
            </div>
            <div className="cols mb_20">
              <fieldset className="">
                <input
                  className=""
                  type="email"
                  placeholder="Username or email address*"
                  name="email"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <fieldset className="">
                <input
                  className=""
                  type="text"
                  placeholder="Phone*"
                  name="text"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
            </div>
            <fieldset className="mb_20">
              <input
                className=""
                type="text"
                placeholder="Address"
                name="text"
                tabIndex={2}
                defaultValue=""
                aria-required="true"
                required
              />
            </fieldset>
            <div className="tf-select mb_20">
              <select
                className="text-title"
                name="address[country]"
                data-default=""
              >
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
                <option
                  value="United States"
                  data-provinces="[['Alabama','Alabama'],['Alaska','Alaska'],['American Samoa','American Samoa'],['Arizona','Arizona'],['Arkansas','Arkansas'],['Armed Forces Americas','Armed Forces Americas'],['Armed Forces Europe','Armed Forces Europe'],['Armed Forces Pacific','Armed Forces Pacific'],['California','California'],['Colorado','Colorado'],['Connecticut','Connecticut'],['Delaware','Delaware'],['District of Columbia','Washington DC'],['Federated States of Micronesia','Micronesia'],['Florida','Florida'],['Georgia','Georgia'],['Guam','Guam'],['Hawaii','Hawaii'],['Idaho','Idaho'],['Illinois','Illinois'],['Indiana','Indiana'],['Iowa','Iowa'],['Kansas','Kansas'],['Kentucky','Kentucky'],['Louisiana','Louisiana'],['Maine','Maine'],['Marshall Islands','Marshall Islands'],['Maryland','Maryland'],['Massachusetts','Massachusetts'],['Michigan','Michigan'],['Minnesota','Minnesota'],['Mississippi','Mississippi'],['Missouri','Missouri'],['Montana','Montana'],['Nebraska','Nebraska'],['Nevada','Nevada'],['New Hampshire','New Hampshire'],['New Jersey','New Jersey'],['New Mexico','New Mexico'],['New York','New York'],['North Carolina','North Carolina'],['North Dakota','North Dakota'],['Northern Mariana Islands','Northern Mariana Islands'],['Ohio','Ohio'],['Oklahoma','Oklahoma'],['Oregon','Oregon'],['Palau','Palau'],['Pennsylvania','Pennsylvania'],['Puerto Rico','Puerto Rico'],['Rhode Island','Rhode Island'],['South Carolina','South Carolina'],['South Dakota','South Dakota'],['Tennessee','Tennessee'],['Texas','Texas'],['Utah','Utah'],['Vermont','Vermont'],['Virgin Islands','U.S. Virgin Islands'],['Virginia','Virginia'],['Washington','Washington'],['West Virginia','West Virginia'],['Wisconsin','Wisconsin'],['Wyoming','Wyoming']]"
                >
                  United States
                </option>
                <option value="Vietnam" data-provinces="[]">
                  Vietnam
                </option>
              </select>
            </div>
            <fieldset className="mb_20">
              <input
                className=""
                type="text"
                placeholder="City"
                name="text"
                tabIndex={2}
                defaultValue=""
                aria-required="true"
                required
              />
            </fieldset>
            <div className="tf-cart-checkbox mb_20">
              <div className="tf-checkbox-wrapp">
                <input
                  defaultChecked
                  className=""
                  type="checkbox"
                  id="CartDrawer-Form_agree"
                  name="agree_checkbox"
                />
                <div>
                  <i className="icon-check" />
                </div>
              </div>
              <label htmlFor="CartDrawer-Form_agree">
                Set as default address.
              </label>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-20">
              <button type="button" className="tf-btn btn-fill radius-4">
                <span className="text">Add address</span>
              </button>
              <span
                className="tf-btn btn-fill radius-4 btn-hide-address"
                onClick={() =>
                  document
                    .querySelector(".createForm")
                    .classList.remove("d-block")
                }
              >
                <span className="text">Cancel</span>
              </span>
            </div>
          </form>
          <div className="list-account-address">
            {addresses.map((address) => (
              <div className="account-address-item" key={address.id}>
                <h6 className="mb_20">{address.title}</h6>
                <p>{address.name}</p>
                <p>{address.street}</p>
                <p>{address.city}</p>
                <p>{address.website}</p>
                <p className="mb_10">{address.phone}</p>
                <div className="d-flex gap-10 justify-content-center">
                  <button
                    className="tf-btn radius-4 btn-fill justify-content-center btn-edit-address"
                    onClick={() => handleEditToggle(address.id)}
                  >
                    <span className="text">
                      {address.isEditing ? "Close" : "Edit"}
                    </span>
                  </button>
                  <button
                    className="tf-btn radius-4 btn-outline justify-content-center btn-delete-address"
                    onClick={() => handleDelete(address.id)}
                  >
                    <span className="text">Delete</span>
                  </button>
                </div>
                {address.isEditing && (
                  <form
                    className="edit-form-address wd-form-address d-block"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="title">Edit address</div>
                    <fieldset className="mb_20">
                      <input
                        type="text"
                        placeholder="First Name*"
                        name="firstName"
                        required
                      />
                    </fieldset>
                    <fieldset className="mb_20">
                      <input
                        type="text"
                        placeholder="Last Name*"
                        name="lastName"
                        required
                      />
                    </fieldset>
                    <fieldset className="mb_20">
                      <input
                        type="email"
                        placeholder="Email*"
                        name="email"
                        required
                      />
                    </fieldset>
                    <fieldset className="mb_20">
                      <input
                        type="text"
                        placeholder="Phone*"
                        name="phone"
                        required
                      />
                    </fieldset>
                    <fieldset className="mb_20">
                      <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        required
                      />
                    </fieldset>
                    <div className="tf-select mb_20">
                      <select name="country" required>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        {/* Add more countries here */}
                      </select>
                    </div>
                    <fieldset className="mb_20">
                      <input
                        className=""
                        type="text"
                        placeholder="City"
                        name="text"
                        tabIndex="2"
                        defaultValue=""
                        aria-required="true"
                        required
                      />
                    </fieldset>
                    <div className="tf-cart-checkbox mb_20">
                      <div className="tf-checkbox-wrapp">
                        <input
                          defaultChecked
                          className=""
                          type="checkbox"
                          id="CartDrawer-Form_agree"
                          name="agree_checkbox"
                        />
                        <div>
                          <i className="icon-check"></i>
                        </div>
                      </div>
                      <label htmlFor="CartDrawer-Form_agree">
                        Set as default address.
                      </label>
                    </div>
                    <div className="d-flex flex-column gap-20">
                      <button
                        type="submit"
                        className="tf-btn btn-fill radius-4"
                      >
                        <span className="text">Add address</span>
                      </button>
                      <span
                        onClick={() => handleEditToggle(address.id)}
                        className="tf-btn btn-fill radius-4 btn-hide-edit-address"
                      >
                        <span className="text">Cancel</span>
                      </span>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
