import React from "react";

import clsx from "clsx";

export const ColorBadge = ({ color = "gray", selected = false, onClick }) => {

  const colorMap = {
    // Spanish
    rojo: "bg-red-500",
    azul: "bg-blue-500",
    verde: "bg-green-500",
    amarillo: "bg-yellow-400",
    negro: "bg-black",
    blanco: "bg-white border border-gray-300",
    gris: "bg-gray-400",
    violeta: "bg-purple-600",
    rosa: "bg-pink-400",
    naranja: "bg-orange-400",
    turquesa: "bg-teal-500",
    plata: "bg-gray-300",

    // English equivalents
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    black: "bg-black",
    white: "bg-white border border-gray-300",
    gray: "bg-gray-400",
    purple: "bg-purple-600",
    pink: "bg-pink-400",
    orange: "bg-orange-400",
    teal: "bg-teal-500",
    silver: "bg-gray-300",

    // Fallback
    default: "bg-gray-400",
  };

  const normalizedColor = color.toLowerCase();
  const backgroundClass = colorMap[normalizedColor] || colorMap.default;

  const colorNames = {
    rojo: "Red",
    azul: "Blue",
    verde: "Green",
    amarillo: "Yellow",
    negro: "Black",
    blanco: "White",
    gris: "Gray",
    violeta: "Purple",
    rosa: "Pink",
    naranja: "Orange",
    turquesa: "Teal",
    plata: "Silver",
    // You could also map English to Spanish here if needed
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-4 h-4 rounded-full cursor-pointer border-1 transition-all duration-200 ease-in-out transform",
        selected ? "ring-2 ring-offset-2 ring-black scale-110" : "scale-100",
        colorMap[color.toLowerCase()] || "bg-gray-400",
      )}
      title={`${colorNames[normalizedColor] || color} (${color})`}
    />
  );
};
