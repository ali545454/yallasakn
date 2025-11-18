import React from "react";
import { Check } from "lucide-react";

const featureIconMap = {
  "واي فاي": require("lucide-react").Wifi,
  تكييف: require("lucide-react").Snowflake,
  بلكونة: require("lucide-react").Wind,
  مصعد: require("lucide-react").CircleChevronUp,
  مطبخ: require("lucide-react").Utensils,
  غسالة: require("lucide-react").WashingMachine,
  "غاز طبيعي": require("lucide-react").Flame,
  "قريب من المواصلات": require("lucide-react").Truck,
  "بوتجاز/فرن": require("lucide-react").CookingPot,
};

const ApartmentFeatures = ({ apartment }) => (
  <section className="py-8 border-b">
    <h3 className="text-xl font-semibold mb-6">ما يقدمه هذا السكن</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
      {apartment.features?.map((feature) => {
        const Icon = featureIconMap[feature] || Check;
        return (
          <div key={feature} className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-primary" />
            <span className="text-gray-700">{feature}</span>
          </div>
        );
      })}
    </div>
  </section>
);

export default ApartmentFeatures;
