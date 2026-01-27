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
        <div>
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep === s.number
                      ? "bg-primary text-primary-foreground"
                      : currentStep > s.number
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > s.number ? "✓" : s.number}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-12 mt-2 ${
                      currentStep > s.number ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
              <div className="pt-1 ml-3">
                <h3
                  className={`font-semibold ${
                    currentStep === s.number ? "text-primary" : ""
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
        </div>
        <Card className="bg-muted/50 hidden lg:block">
          <CardHeader>
            <CardTitle>نصيحة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {steps[currentStep - 1].tip}
            </p>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

export default ProgressSidebar;