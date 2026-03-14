import React from "react";
import { Link } from "react-router-dom";
import { Home, MapPin, Settings, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User as UserType } from "@/types";

interface MyApartmentsTabProps {
  userData: UserType;
  apartmentsOwnedCount: number;
  navigate: (path: string) => void;
}

export default function MyApartmentsTab({
  userData,
  apartmentsOwnedCount,
  navigate,
}: MyApartmentsTabProps) {
  const apartments = userData.apartments || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>شقق قمت بعرضها ({apartmentsOwnedCount})</CardTitle>
        <CardDescription>هذه هي قائمة الشقق التي قمت بإضافتها للمنصة.</CardDescription>
      </CardHeader>
      <CardContent>
        {apartmentsOwnedCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apt) => (
              <Card
                key={apt.uuid}
                className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
              >
                <Link to={`/apartments/${apt.uuid}`} className="block">
                  <img
                    src={
                      apt.main_image ||
                      `https://placehold.co/600x400/3b82f6/white?text=${encodeURIComponent(
                        apt.title
                      )}`
                    }
                    alt={apt.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-lg truncate">{apt.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin size={16} /> {apt.address}
                  </p>
                  <p className="text-lg font-semibold text-primary">{apt.price} جنيه/شهرياً</p>
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => navigate(`/dashboard`)}
                      size="sm"
                      className="flex-1 gap-2"
                    >
                      <Settings size={16} /> لوحة التحكم
                    </Button>
                    <Button
                      onClick={() => navigate(`/apartments/${apt.uuid}`)}
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-2"
                    >
                      <Eye size={16} /> مشاهدة
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Home className="mx-auto h-20 w-20 text-slate-300" />
            <h3 className="mt-4 text-xl font-semibold">لم تقم بإضافة أي شقق بعد</h3>
            <p className="mt-2 text-muted-foreground">
              ابدأ بعرض شقتك الأولى للطلاب الآن.
            </p>
            <Button className="mt-6" onClick={() => navigate("/add-apartment")}>أضف شقة الآن</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
