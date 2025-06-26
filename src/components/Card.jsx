import React from "react";
import clsx from "clsx";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={clsx("rounded-2xl bg-white shadow-md", className)}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={clsx("p-6 text-gray-700", className)}>
      {children}
    </div>
  );
};
