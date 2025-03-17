"use client";

import { useState } from "react";

const sizes = [
  { id: "values-s", value: "S", price: 79.99, disabled: false },
  { id: "values-m", value: "M", price: 79.99, disabled: false },
  { id: "values-l", value: "L", price: 89.99, disabled: false },
  { id: "values-xl", value: "XL", price: 89.99, disabled: false },
  { id: "values-xxl", value: "XXL", price: 89.99, disabled: true },
];

export default function SizeSelect() {
  const [selectedSize, setSelectedSize] = useState("L"); // Default value is "L"

  const handleChange = (value) => {
    setSelectedSize(value);
  };
  return (
    <div className="variant-picker-item">
      <div className="d-flex justify-content-between mb_12">
        <div className="variant-picker-label">
          selected size:
          <span className="text-title variant-picker-label-value">
            {selectedSize}
          </span>
        </div>
        <a
          href="#size-guide"
          data-bs-toggle="modal"
          className="size-guide text-title link"
        >
          Size Guide
        </a>
      </div>
      <div className="variant-picker-values gap12">
        {sizes.map(({ id, value, price, disabled }) => (
          <div key={id} onClick={() => handleChange(value)}>
            <input
              type="radio"
              id={id}
              checked={selectedSize === value}
              disabled={disabled}
              readOnly
            />
            <label
              className={`style-text size-btn ${
                disabled ? "type-disable" : ""
              }`}
              htmlFor={id}
              data-value={value}
              data-price={price}
            >
              <span className="text-title">{value}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
