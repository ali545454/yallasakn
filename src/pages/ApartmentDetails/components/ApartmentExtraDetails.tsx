import React from "react";
import {
  MapPin,
  Layers,
  Building2,
  Hash,
  ShieldCheck,
  Calendar,
} from "lucide-react";

function getFloorName(floorNumber) {
  if (!floorNumber) return "غير محدد";
  const floorMap = {
    1: "الأول",
    2: "الثاني",
    3: "الثالث",
    4: "الرابع",
    5: "الخامس",
    6: "السادس",
    7: "السابع",
    8: "الثامن",
    9: "التاسع",
    10: "العاشر",
  };
  return floorMap[Number(floorNumber)] || `${floorNumber}`;
}

const ApartmentExtraDetails = ({ apartment }) => {
  const createdAt = apartment.createdAt ? new Date(apartment.createdAt) : null;
  const isValidDate = createdAt && !isNaN(createdAt.getTime());
  return (
    <section className="py-8">
      <h3 className="text-xl font-semibold mb-6">تفاصيل إضافية</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-gray-700 flex-shrink-0" />
          <span>
            <span className="font-medium">الحي: </span>
            {apartment.neighborhood || "غير محدد"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-gray-700 flex-shrink-0" />
          <span>
            <span className="font-medium">الطابق: </span>
            {getFloorName(apartment.floorNumber)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-gray-700 flex-shrink-0" />
          <span>
            <span className="font-medium"> نوع السكن: </span>
            {apartment.residenceType || "الجميع"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Hash className="w-6 h-6 text-gray-700 flex-shrink-0" />
          <span>
            <span className="font-medium">متاح لـ: </span>
            {apartment.preferred_tenant_type || "الجميع"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck
            className={`w-6 h-6 flex-shrink-0 ${
              apartment.is_verified ? "text-green-600" : "text-red-100"
            }`}
          />
          <span>
            {apartment.isVerified
              ? "تم التحقق من هذا السكن بواسطة فريقنا"
              : "لم يتم التحقق من هذا السكن"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-gray-700 flex-shrink-0" />
          <span>
            <span className="font-medium">أضيف في: </span>
            {isValidDate
              ? createdAt.toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "غير متوفر"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ApartmentExtraDetails;
