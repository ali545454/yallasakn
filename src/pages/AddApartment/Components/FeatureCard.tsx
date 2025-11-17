import React from "react";

const FeatureCard = ({ feature, selected, onClick }: any) => {
  return (
    <div
      className={`p-4 flex flex-col items-center justify-center cursor-pointer border ${
        selected ? "border-primary ring-2 ring-primary" : "border-gray-300"
      }`}
      onClick={onClick}
    >
      <span>{feature.label}</span>
    </div>
  );
};

export default FeatureCard;
