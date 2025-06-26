import React from "react";
import clsx from "clsx";

// Simple button with optional variants
export const Button = ({
  children,
  className = "",
  variant = "primary", // primary | secondary | ghost
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-200 shadow-sm";

  const variants = {
    primary: "bg-[#FF5E5B] text-white hover:bg-[#e14c4a]",
    secondary: "bg-[#32D6A0] text-white hover:bg-[#2bb489]",
    ghost: "bg-transparent text-[#FF5E5B] hover:bg-[#ffeceb]",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
