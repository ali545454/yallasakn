import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { steps } from "../constants";

interface ProgressSidebarProps {
  currentStep: number;
}

const ProgressSidebar: React.FC<ProgressSidebarProps> = ({ currentStep }) => {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 space-y-8">
        <Card className="shadow-lg border border-slate-200 bg-white">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold">خطوات الإضافة</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-start mb-6 last:mb-0">
                <div className="flex flex-col items-center mr-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      currentStep === s.number
                        ? "bg-blue-600 text-white shadow-lg scale-110"
                        : currentStep > s.number
                        ? "bg-slate-500 text-white shadow-md"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {currentStep > s.number ? "✓" : s.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-12 mt-2 transition-colors duration-300 ${
                        currentStep > s.number ? "bg-slate-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
                <div className="pt-1 ml-3">
                  <h3
                    className={`font-semibold transition-colors duration-300 ${
                      currentStep === s.number ? "text-blue-600" : "text-slate-700"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    الخطوة {s.number} من {steps.length}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border border-slate-200 shadow-lg hidden lg:block bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">💡 نصيحة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-700">
              {steps[currentStep - 1].tip}
            </p>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

export default ProgressSidebar;