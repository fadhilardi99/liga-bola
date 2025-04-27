import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md" }) => {
  const sizeClass = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div
        className={`animate-spin rounded-full ${sizeClass[size]} border-t-2 border-b-2 border-blue-500`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
