import * as React from "react";
import { cn } from "@/lib/utils";

interface BankCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardNumber?: string;
  cardHolder?: string;
  expiry?: string;
  status?: string;
  brand?: string;
  variant?: "default" | "gradient";
  children?: React.ReactNode;
}

const BankCard = React.forwardRef<HTMLDivElement, BankCardProps>(
  (
    {
      cardNumber = "•••• •••• •••• ••••",
      cardHolder = "Your Name",
      expiry = "12/25",
      status = "active",
      brand = "VISA",
      variant = "default",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const bgClass = React.useMemo(() => {
      if (variant === "gradient") {
        return "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600";
      }

      switch (brand?.toLowerCase()) {
        case "amex":
          return "bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white";
        case "visa":
          return "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-white";
        case "mastercard":
          return "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white";
        default:
          return "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white";
      }
    }, [variant, brand]);

    const opacityClass = status === "active" ? "opacity-100" : "opacity-60";

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-72 h-44 sm:h-56 sm:w-96 rounded-2xl shadow-2xl p-6 text-white overflow-hidden transition-transform sm:hover:scale-110",
          bgClass,
          opacityClass,
          className
        )}
        {...props}
      >
        {/* Top Row: Brand / Status */}
        <div className="flex justify-between items-start">
          <div className="font-semibold text-lg">{brand}</div>
          <span
            className={cn(
              "inline-flex px-3 py-1 rounded-full text-xs font-medium",
              status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
        {/* Chip / SIM Icon */}
        <div className="mt-4 w-10 h-6">
          <img
            src="/sim_chip.png"
            alt="SIM chip icon"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Number */}
        <div className="mt-4 font-mono tracking-widest text-lg sm:text-xl">
          {cardNumber}
        </div>

        {/* Card Holder & Expiry */}
        <div className="absolute bottom-4 left-4 flex flex-col text-xs sm:text-sm text-gray-200">
          <span className="uppercase font-semibold">{cardHolder}</span>
          <span className="font-bold">{expiry}</span>
        </div>

        {/* Optional Children */}
        {children}
      </div>
    );
  }
);

BankCard.displayName = "BankCard";

export { BankCard };
