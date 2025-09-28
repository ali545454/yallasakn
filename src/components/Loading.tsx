import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "border-white",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        border-4 ${color} border-t-transparent rounded-full
        animate-spin
      `}
    ></div>
  );
};

// مثال لاستخدامه على صفحة تحميل
const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen ">
      <Spinner size="md" color="border-primary" />
    </div>
  );
};

export default Loading;
