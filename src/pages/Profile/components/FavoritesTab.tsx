import React from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { HeartOff } from "lucide-react";

interface FavoritesTabProps {
  favoriteCount: number;
  paginatedFavorites: any[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  toggleFavorite: (uuid: string) => void;
  navigate: (path: string) => void;
}

export default function FavoritesTab({
  favoriteCount,
  paginatedFavorites,
  totalPages,
  currentPage,
  setCurrentPage,
  toggleFavorite,
  navigate,
}: FavoritesTabProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-red-50/30 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-500/10 to-pink-500/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-xl">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-2xl text-slate-800">الشقق المفضلة</CardTitle>
              <CardDescription className="text-slate-600">
                {favoriteCount} شقة محفوظة في قائمتك المفضلة
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {paginatedFavorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedFavorites.map((apt) => (
                <Card
                  key={apt.uuid}
                  className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group relative bg-white border-0 hover:-translate-y-1"
                >
                  {/* زر إزالة من المفضلة */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-3 right-3 z-20 shadow-lg hover:scale-110 transition-transform duration-200 bg-white/90 hover:bg-red-500 border-2 border-white"
                          onClick={() => toggleFavorite(apt.uuid)}
                        >
                          <HeartOff className="h-4 w-4 text-red-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-red-500 text-white">
                        <p>إزالة من المفضلة</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* الصورة */}
                  <Link to={`/apartments/${apt.uuid}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          apt.main_image ||
                          `https://placehold.co/600x400/ef4444/white?text=${encodeURIComponent(
                            apt.title || "شقة"
                          )}`
                        }
                        alt={apt.title || "شقة"}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg backdrop-blur-sm">
                        {apt.price ?? 0} جنيه
                      </div>
                      {apt.isVerified && (
                        <div className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg">
                          موثق ✓
                        </div>
                      )}
                    </div>

                    {/* المحتوى */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-lg text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">
                        {apt.title || "شقة"}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-2">
                        {apt.description || "وصف غير متوفر"}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{apt.neighborhood || "غير محدد"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Home className="h-4 w-4" />
                          <span>{apt.bedrooms} غرفة</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-dashed border-slate-200">
              <div className="p-6 bg-white rounded-full w-24 h-24 mx-auto shadow-lg border border-slate-100">
                <HeartOff className="h-12 w-12 text-slate-300 mx-auto mt-6" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-700">قائمة المفضلة فارغة</h3>
              <p className="mt-3 text-slate-500 max-w-md mx-auto">
                لم تقم بإضافة أي شقق إلى قائمتك المفضلة بعد. ابدأ في استكشاف الشقق المتاحة!
              </p>
              <Button
                className="mt-8 px-8 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate("/search")}
              >
                <Home className="h-5 w-5 mr-2" />
                تصفح الشقق الآن
              </Button>
            </div>
          )}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.max(1, p - 1));
                    }}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
