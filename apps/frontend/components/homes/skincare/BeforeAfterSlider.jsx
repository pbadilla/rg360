"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(40); // Initial slider position (40%)
  const [labelOpacity, setLabelOpacity] = useState({ before: 1, after: 1 });
  const sliderRef = useRef(null);
  const imageWrapperRef = useRef(null);

  // Handle the slider movement based on mouse position
  const handleSliderMove = (event) => {
    const sliderWidth = imageWrapperRef.current.offsetWidth;
    const newPosition =
      ((event.clientX - imageWrapperRef.current.offsetLeft) / sliderWidth) *
      100;
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100)); // Prevent slider from going beyond 0% and 100%
  };

  // Handle mouse down event to start dragging the slider
  const handleMouseDown = (event) => {
    event.preventDefault();
    window.addEventListener("mousemove", handleSliderMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Handle mouse up event to stop dragging the slider
  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleSliderMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  // Handle clicking anywhere on the image container to move the slider
  const handleImageClick = (event) => {
    handleSliderMove(event);
  };

  // Update label opacity based on slider position
  useEffect(() => {
    const updateLabelOpacity = () => {
      const beforeOpacity = sliderPosition < 10 ? 0 : 1; // Before button fades out when the slider is near the left side
      const afterOpacity = sliderPosition > 90 ? 0 : 1; // After button fades out when the slider is near the right side
      setLabelOpacity({ before: beforeOpacity, after: afterOpacity });
    };

    updateLabelOpacity();
  }, [sliderPosition]);

  return (
    <div
      id="image-compare"
      className="banner-double-compare icv icv__icv--horizontal standard"
      ref={imageWrapperRef}
      onClick={handleImageClick} // Allow clicking anywhere on the container to move the slider
    >
      <Image
        className="icv__img icv__img-a lazyloaded"
        data-src="/images/banner/banner-skin-before.jpg"
        alt="Before"
        src="/images/banner/banner-skin-before.jpg"
        width="1920"
        height="750"
      />
      <span
        className="icv__label icv__label-before keep"
        style={{ opacity: labelOpacity.before }}
      >
        Before
      </span>
      <span
        className="icv__label icv__label-after keep"
        style={{ opacity: labelOpacity.after }}
      >
        After
      </span>
      <div
        className="icv__wrapper"
        style={{ width: `${100 - sliderPosition}%`, height: "50%" }}
      >
        <Image
          className="icv__img icv__img-b lazyloaded"
          data-src="/images/banner/banner-skin-after.jpg"
          alt="After"
          src="/images/banner/banner-skin-after.jpg"
          width="1920"
          height="750"
        />
      </div>
      <div
        className="icv__control"
        style={{ width: "50px", left: `calc(${sliderPosition}% - 25px)` }}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
      >
        <div
          className="icv__control-line"
          style={{ width: "2px", background: "rgb(255, 255, 255)" }}
        ></div>
        <div
          className="icv__circle"
          style={{
            backdropFilter: "blur(5px)",
            border: "2px solid rgb(255, 255, 255)",
          }}
        ></div>
        <div className="icv__theme-wrapper">
          <div
            className="icv__arrow-wrapper"
            style={{ transform: "translateX(5px)" }}
          >
            <svg
              height="15"
              width="15"
              style={{
                transform: "scale(0.7) rotateZ(180deg)",
                height: "20px",
                width: "20px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 15 15"
            >
              <path
                fill="transparent"
                stroke="#FFFFFF"
                strokeLinecap="round"
                strokeWidth="3"
                d="M4.5 1.9L10 7.65l-5.5 5.4"
              />
            </svg>
          </div>
          <div
            className="icv__arrow-wrapper"
            style={{ transform: "translateX(-5px)" }}
          >
            <svg
              height="15"
              width="15"
              style={{
                transform: "scale(0.7) rotateZ(0deg)",
                height: "20px",
                width: "20px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 15 15"
            >
              <path
                fill="transparent"
                stroke="#FFFFFF"
                strokeLinecap="round"
                strokeWidth="3"
                d="M4.5 1.9L10 7.65l-5.5 5.4"
              />
            </svg>
          </div>
        </div>
        <div
          className="icv__control-line"
          style={{ width: "2px", background: "rgb(255, 255, 255)" }}
        ></div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
