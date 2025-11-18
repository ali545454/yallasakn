import React from "react";
import { MapPin } from "lucide-react";
import MapPicker from "../Map/MapPicker";

const ApartmentMapSection = ({ apartment }) => (
  <section className="mt-8 mb-0 w-full px-0">
    <div className="container mx-auto">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-primary" /> موقع الشقة على الخريطة
      </h3>
      {apartment.latitude && apartment.longitude ? (
        <div className="w-full h-96 rounded-xl overflow-hidden border">
          <MapPicker
            lat={Number(apartment.latitude)}
            lng={Number(apartment.longitude)}
            onChange={() => {}}
          />
        </div>
      ) : (
        <p className="text-gray-500">لا تتوفر إحداثيات لهذا السكن.</p>
      )}
    </div>
  </section>
);

export default ApartmentMapSection;
