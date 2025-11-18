import React from "react";
import {
  Wifi,
  Snowflake,
  Wind,
  CircleChevronUp,
  Utensils,
  WashingMachine,
  Flame,
  Truck,
  CookingPot,
  Check,
} from "lucide-react";

const featureIconMap = {
  "واي فاي": Wifi,
  تكييف: Snowflake,
  بلكونة: Wind,
  مصعد: CircleChevronUp,
  مطبخ: Utensils,
  غسالة: WashingMachine,
  "غاز طبيعي": Flame,
  "قريب من المواصلات": Truck,
  "بوتجاز/فرن": CookingPot,
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
