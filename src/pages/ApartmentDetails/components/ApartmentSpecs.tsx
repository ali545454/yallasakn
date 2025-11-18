import React from "react";
import { Bed, Users, Bath, Ruler, CookingPot } from "lucide-react";

const KeySpec = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 text-gray-700">
    <Icon className="w-6 h-6 text-primary" />
    <div>
      <p className="font-semibold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

const ApartmentSpecs = ({ apartment }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y">
    <KeySpec icon={Bed} label="غرف " value={apartment.bedrooms || "-"} />
    <KeySpec
      icon={Users}
      label="سرير متاح"
      value={apartment.availableBeds || "-"}
    />
    <KeySpec icon={Bath} label="حمامات" value={apartment.bathrooms || "-"} />
    <KeySpec
      icon={Ruler}
      label="مساحة"
      value={apartment.area ? `${apartment.area} م²` : "-"}
    />
    <KeySpec
      icon={CookingPot}
      label="مطابخ"
      value={apartment.kitchens || "-"}
    />
  </div>
);

export default ApartmentSpecs;
