"use client";
import React from "react";

export default function NewsLetter() {
  return (
    <section className="section-newsletter">
      <div className="content">
        <h3 className="heading text-white wow fadeInUp">
          Sign up and get 20% off your first order
        </h3>
        <p className="text text-white wow fadeInUp" data-wow-delay="0.1s">
          Sign up for early sale access, new in, promotions and more
        </p>
        <form
          className="form-newsletter subscribe-form wow fadeInUp"
          data-wow-delay="0.2s"
          id="subscribe-form"
          onSubmit={(e) => e.preventDefault()}
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
                className="subscribe-button text-btn-uppercase font-2"
                type="button"
                id="subscribe-button"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
          <div id="subscribe-msg" className="subscribe-msg" />
        </form>
      </div>
    </section>
  );
}
