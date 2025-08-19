import React from "react";

import clsx from "clsx";

const badgeStyles = {
  new: "bg-green-100 text-green-800",
  sale: "bg-red-100 text-red-800",
  soldout: "bg-gray-200 text-gray-600",
  limited: "bg-yellow-100 text-yellow-800",
  bestseller: "bg-purple-100 text-purple-800",
  shipping: "bg-blue-100 text-blue-800",
};

const labelMap = {
  new: "NEW",
  sale: "SALE",
  soldout: "SOLD OUT",
  limited: "LIMITED STOCK",
  bestseller: "BESTSELLER",
  shipping: "FREE SHIPPING",
};

export const OfferBadge = ({ type = "new", children }) => {
  const badgeClass = badgeStyles[type] || badgeStyles.new;
  const label = children || labelMap[type] || type.toUpperCase();

  return (
    <span
      className={clsx(
        "text-xs font-medium px-2 py-0.5 rounded-full",
        badgeClass,
      )}
    >
      {label}
    </span>
  );
};
