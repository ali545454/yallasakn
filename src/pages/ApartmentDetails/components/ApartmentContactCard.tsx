import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const ApartmentContactCard = ({
  apartment,
  getOwnerInitials,
  handleWhatsAppContact,
}) => (
  <Card className="rounded-2xl shadow-lg border">
    <CardHeader>
      <CardTitle className="text-2xl">
        <span className="font-bold">{apartment.price} جنيه</span>
        <span className="font-normal text-base text-gray-600"> / الشهر</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center my-4 py-4 border-t">
        <p className="text-sm text-gray-500 mb-3">تواصل مع المالك</p>
        <div className="flex items-center justify-center gap-3">
          <Avatar className="h-14 w-14">
            <AvatarImage
              src={apartment.owner?.avatar}
              alt={apartment.owner?.fullName}
            />
            <AvatarFallback className="text-lg bg-primary text-white font-bold">
              {getOwnerInitials(apartment.owner?.fullName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg text-gray-800">
              {apartment.owner?.fullName || "مالك معتمد"}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3 mt-4">
        <Button
          onClick={handleWhatsAppContact}
          size="lg"
          className="w-full h-12 bg-green-500 hover:bg-green-600 text-lg"
        >
          <svg
            className="h-6 w-6 ml-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2.87c-5.46 0-9.91 4.45-9.91 9.91 0 1.77.47 3.42 1.3 4.88l-1.39 5.09 5.2-1.37a9.92 9.92 0 0 0 4.8-1.25c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm4.8 14.88c-.24.36-.59.54-.99.54-.15 0-.3-.02-.45-.06a4.57 4.57 0 0 1-1.63-.5c-1.1-.64-2.61-1.57-3.92-2.91-1.31-1.34-2.2-2.84-2.85-3.93a4.34 4.34 0 0 1-.5-1.63c-.04-.15-.06-.3-.06-.45 0-.41.17-.76.53-1.01l.93-1.09c.35-.41.97-.47 1.4-.14l.87.52c.38.23.63.63.7 1.05l.13.62c.07.39.04.79-.11 1.15-.15.35-.45.64-.79.88l-.78.58c.28.52.57 1.06 1.02 1.54 1.34 1.36 2.76 2.37 3.99 3.01l.71-.85c.23-.28.52-.46.85-.56.33-.1.68-.11 1.02-.02l.62.13c.42.08.82.33 1.05.7l.52.87c.33.43.28 1.05-.14 1.4z" />
          </svg>
          تواصل عبر واتساب
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full h-12 text-lg"
          disabled
        >
          <MessageCircle className="h-5 w-5 ml-2" /> ابدأ مراسلة
        </Button>
      </div>
      <p className="text-xs text-center text-gray-500 mt-4">
        لا تقم بأي تحويلات مالية قبل معاينة الشقة.
      </p>
    </CardContent>
  </Card>
);

export default ApartmentContactCard;
