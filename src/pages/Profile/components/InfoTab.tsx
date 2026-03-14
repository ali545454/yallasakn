import React from "react";
import { Edit3, Save, X, User, Phone, University, BookOpen, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User as UserType } from "@/types";

const InfoField = React.memo<{ icon: React.ReactNode; label: string; value?: string }>(
  ({ icon, label, value }) => (
    <div className="flex items-center gap-4 text-right">
      <div className="flex-grow bg-slate-100 p-3 rounded-md text-slate-800">
        {value || <span className="text-slate-400">غير محدد</span>}
      </div>
      <div className="flex items-center gap-2 justify-end min-w-[120px]">
        <span className="font-medium text-slate-600">{label}</span>
        {icon}
      </div>
    </div>
  )
);

interface InfoTabProps {
  userData: UserType;
  isEditing: boolean;
  tempData: Partial<UserType>;
  onEdit: () => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onInputChange: (field: string, value: string) => void;
}

const roleTitles: Record<string, string> = {
  student: "طالب",
  owner: "صاحب سكن",
  admin: "مشرف",
};

export default function InfoTab({
  userData,
  isEditing,
  tempData,
  onEdit,
  onSave,
  onCancel,
  onInputChange,
}: InfoTabProps) {
  const role = roleTitles[userData.role] || userData.role;

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-xl">
            <User className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <CardTitle className="text-2xl text-slate-800">تفاصيل الملف الشخصي</CardTitle>
            <CardDescription className="text-slate-600">
              {isEditing ? "قم بتحديث معلوماتك الشخصية" : "معلوماتك الشخصية المسجلة"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">الاسم الكامل</Label>
              <Input
                value={tempData.full_name ?? ""}
                onChange={(e) => onInputChange("full_name", e.target.value)}
                className="h-12 border-2 border-slate-200 focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">رقم الهاتف</Label>
              <Input
                value={tempData.phone ?? ""}
                onChange={(e) => onInputChange("phone", e.target.value)}
                className="h-12 border-2 border-slate-200 focus:border-primary transition-colors"
              />
            </div>
            {userData.role === "student" && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">الجامعة</Label>
                  <Input
                    value={tempData.university ?? ""}
                    onChange={(e) => onInputChange("university", e.target.value)}
                    className="h-12 border-2 border-slate-200 focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">الكلية</Label>
                  <Input
                    value={tempData.college ?? ""}
                    onChange={(e) => onInputChange("college", e.target.value)}
                    className="h-12 border-2 border-slate-200 focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-semibold text-slate-700">السنة الدراسية</Label>
                  <Input
                    value={tempData.academic_year ?? ""}
                    onChange={(e) => onInputChange("academic_year", e.target.value)}
                    className="h-12 border-2 border-slate-200 focus:border-primary transition-colors"
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField icon={<User className="text-slate-400" />} label="الاسم الكامل" value={userData.full_name} />
            <InfoField icon={<Phone className="text-slate-400" />} label="رقم الهاتف" value={userData.phone} />
            {userData.role === "student" && (
              <>
                <InfoField icon={<University className="text-slate-400" />} label="الجامعة" value={userData.university} />
                <InfoField icon={<BookOpen className="text-slate-400" />} label="الكلية" value={userData.college} />
                <InfoField icon={<Calendar className="text-slate-400" />} label="السنة" value={userData.academic_year} />
              </>
            )}
          </div>
        )}

        <div className="border-t pt-6 mt-6 space-y-6">
          <InfoField icon={<Mail className="text-slate-400" />} label="البريد الإلكتروني" value={userData.email} />
          <InfoField icon={<User className="text-slate-400" />} label="الدور" value={role} />
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          {!isEditing ? (
            <Button
              onClick={onEdit}
              className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80"
            >
              <Edit3 className="h-4 w-4" /> تعديل
            </Button>
          ) : (
            <>
              <Button
                onClick={onSave}
                className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-green-500 to-green-600"
              >
                <Save className="h-4 w-4" /> حفظ
              </Button>
              <Button
                variant="outline"
                onClick={onCancel}
                className="gap-2 border-2 hover:bg-slate-50 transition-all duration-300"
              >
                <X className="h-4 w-4" /> إلغاء
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
