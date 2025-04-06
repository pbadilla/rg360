import React from "react";
import clsx from "clsx";

export const ColorBadge = ({ color = "gray", selected = false, onClick }) => {
  const colorMap = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    black: "bg-black",
    white: "bg-white border border-gray-300",
    gray: "bg-gray-400",
    purple: "bg-purple-500",
    pink: "bg-pink-400",
    orange: "bg-orange-400",
    teal: "bg-teal-500",
    // Add more as needed
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-6 h-6 rounded-full cursor-pointer border-2 transition-all duration-150",
        selected ? "ring-2 ring-offset-1 ring-black" : "border-transparent",
        colorMap[color] || "bg-gray-400"
      )}
      title={color}
    />
  );
};
