// components/UserTypeSelector.tsx

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface UserTypeSelectorProps {
  userType: "student" | "owner";
  setUserType: (type: "student" | "owner") => void;
}

const UserTypeSelector = ({ userType, setUserType }: UserTypeSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">نوع الحساب</Label>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant={userType === "student" ? "default" : "outline"}
          onClick={() => setUserType("student")}
          className="h-12"
        >
          طالب
        </Button>
        <Button
          type="button"
          variant={userType === "owner" ? "default" : "outline"}
          onClick={() => setUserType("owner")}
          className="h-12"
        >
          صاحب سكن
        </Button>
      </div>
    </div>
  );
};

export default UserTypeSelector;