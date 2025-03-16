import React from "react";

export default function NewsLetter() {
  return (
    <section className="section-newsletter style-2 type-space-2 bg_A89A8C">
      <div className="content">
        <h4 className="heading text-white wow fadeInUp">
          Sign up and get 20% off your first order
        </h4>
        <p className="text text-white wow fadeInUp" data-wow-delay="0.1s">
          Sign up for early sale access, new in, promotions and more
        </p>
        <form
          className="form-newsletter subscribe-form wow fadeInUp"
          data-wow-delay="0.2s"
          id="subscribe-form"
          action="#"
          method="post"
          acceptCharset="utf-8"
          data-mailchimp="true"
        >
          <div id="subscribe-content" className="subscribe-content">
            <fieldset className="email">
              <input
                type="email"
                name="email-form"
                id="subscribe-email"
                className="subscribe-email"
                placeholder="Enter your e-mail"
                tabIndex={0}
                aria-required="true"
              />
            </fieldset>
            <div className="button-submit">
              <button
                className="subscribe-button"
                type="button"
                id="subscribe-button"
              >
                <span className="body-text"> Subscribe </span>
              </button>
            </div>
          </div>
          <div id="subscribe-msg" className="subscribe-msg" />
        </form>
      </div>
    </section>
  );
}
