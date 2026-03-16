import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { AddApartmentFormValues } from "../schema";
import { features } from "../constants";

const Step3: React.FC = () => {
  const { watch, setValue } = useFormContext<AddApartmentFormValues>();

  const toggleFeature = (featureId: keyof AddApartmentFormValues) => {
    const current = watch(featureId) as boolean | undefined;
    setValue(featureId, !current, { shouldValidate: true, shouldTouch: true });
  };

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <Card className="border border-slate-200 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <Star className="h-6 w-6" />
            اختر المميزات المتوفرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => {
              const isSelected = watch(feature.id as keyof AddApartmentFormValues);
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => toggleFeature(feature.id as keyof AddApartmentFormValues)}
                  className={`p-4 flex flex-col items-center justify-center gap-2 rounded-lg transition-all duration-300 border ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-200"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:ring-2 hover:ring-blue-100"
                  }`}
                >
                  <div
                    className={`transition-colors duration-300 ${
                      isSelected ? "text-blue-600" : "text-slate-600"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <span className="text-center text-sm font-medium text-slate-700">
                    {feature.label}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step3;
