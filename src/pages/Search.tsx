import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Bath,
  Bed,
  Eye,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import FavoriteButton from "@/components/FavoriteButton";
import Loading from "@/components/Loading";
import { useFavorites } from "@/context/FavoritesContext";

// ======================= تعريف رابط الـ API =======================
export const API_URL = import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app/`;

// دوال مساعدة
const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );

const convertObjectKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertObjectKeysToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result: any, key: string) => {
      result[snakeToCamel(key)] = convertObjectKeysToCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
};

// =====================================================================
const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [apartments, setApartments] = useState<any[]>([]);
  const [filteredApartments, setFilteredApartments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(
    searchParams.get("neighborhood") || ""
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [bedrooms, setBedrooms] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const [neighborhoods, setNeighborhoods] = useState<any[]>([]); // الأحياء من الـ API
  const { favorites } = useFavorites();
  // جلب الشقق
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/apartments/all_apartments`
        );
        if (!response.ok) throw new Error("فشل جلب البيانات من الخادم");
        const data = await response.json();
        const formattedData = convertObjectKeysToCamelCase(data);

        setApartments(formattedData);
        setFilteredApartments(formattedData);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching apartments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApartments();
  }, []);

  // جلب الأحياء
  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/neighborhoods`)
      .then((res) => setNeighborhoods(res.data))
      .catch((err) => console.error("Error fetching neighborhoods:", err));
  }, []);

  // فلترة الشقق
  useEffect(() => {
    let filtered = apartments;

    if (searchTerm) {
      filtered = filtered.filter(
        (apt) =>
          apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedNeighborhood && selectedNeighborhood !== "all") {
      filtered = filtered.filter(
        (apt) => apt.neighborhood === selectedNeighborhood
      );
    }
    filtered = filtered.filter(
      (apt) => apt.price >= priceRange[0] && apt.price <= priceRange[1]
    );
    if (bedrooms && bedrooms !== "any") {
      const bedCount = parseInt(bedrooms);
      if (bedCount < 4) {
        filtered = filtered.filter((apt) => apt.bedrooms === bedCount);
      } else {
        filtered = filtered.filter((apt) => apt.bedrooms >= 4);
      }
    }
    if (showVerifiedOnly) {
      filtered = filtered.filter((apt) => apt.isVerified);
    }
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
    }
    setFilteredApartments(filtered);
  }, [
    searchTerm,
    selectedNeighborhood,
    priceRange,
    bedrooms,
    sortBy,
    showVerifiedOnly,
    apartments,
  ]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);
    if (selectedNeighborhood) params.set("neighborhood", selectedNeighborhood);
    setSearchParams(params);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Loading />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 text-center text-red-600">
          <h1 className="text-3xl font-bold mb-4">حدث خطأ</h1>
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  // ====== Panel الفلترة ======
  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">النطاق السعري</h3>
        <div className="space-y-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0]} جنيه</span>
            <span>{priceRange[1]} جنيه</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">المنطقة</h3>
        <Select
          value={selectedNeighborhood}
          onValueChange={setSelectedNeighborhood}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر المنطقة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المناطق</SelectItem>
            {neighborhoods.map((n) => (
              <SelectItem key={n.id} value={n.name}>
                {n.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">عدد الغرف</h3>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger>
            <SelectValue placeholder="عدد الغرف" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">أي عدد</SelectItem>
            <SelectItem value="1">غرفة واحدة</SelectItem>
            <SelectItem value="2">غرفتان</SelectItem>
            <SelectItem value="3">ثلاث غرف</SelectItem>
            <SelectItem value="4">أربع غرف أو أكثر</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="verified"
          checked={showVerifiedOnly}
          onCheckedChange={(checked) => setShowVerifiedOnly(checked === true)}
        />
        <label htmlFor="verified" className="text-sm font-medium">
          شقق موثقة فقط
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">البحث عن شقق</h1>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن شقق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12 h-12 text-right"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-12 w-12 p-0 flex items-center justify-center"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              تم العثور على {filteredApartments.length} شقة
            </p>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">الأحدث</SelectItem>
                  <SelectItem value="price-low">السعر: الأقل أولاً</SelectItem>
                  <SelectItem value="price-high">
                    السعر: الأعلى أولاً
                  </SelectItem>
                  <SelectItem value="rating">التقييم</SelectItem>
                </SelectContent>
              </Select>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 ml-2" />
                    فلتر
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>تصفية النتائج</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="hidden lg:block">
            <Card className="p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">تصفية النتائج</h2>
              <FilterPanel />
            </Card>
          </div>
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredApartments.map((apartment) => (
                <Card
                  key={apartment.uuid}
                  className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={apartment.images?.[0] || "/placeholder.svg"}
                      alt={apartment.title}
                      className="w-full h-[250px] object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />

                    {/* ضع القلب كـ absolute في أعلى اليمين */}
<div className="absolute top-2 right-2">
  <FavoriteButton apartment={apartment} /> 
  {/* مرر الـ apartment كله مش uuid بس */}
</div>


                    {apartment.isVerified && (
                      <Badge className="absolute top-2 left-2 flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        موثق
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 text-right line-clamp-2">
                      {apartment.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 text-right line-clamp-2">
                      {apartment.description}
                    </p>

                    <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{apartment.neighborhood}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{apartment.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{apartment.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{apartment.area}م²</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {apartment.features
                        ?.slice(0, 3)
                        .map((feature: any, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {feature.name || feature}
                          </Badge>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {apartment.rating || "N/A"}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({apartment.reviewCount || 0} تقييم)
                      </span>
                    </div>

                    <div className="mt-auto" />
                  </CardContent>

                  <CardFooter className="p-4 pt-0 ">
                    <div className="flex justify-between items-center w-full">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {apartment.price} جنيه
                        </div>
                        <div className="text-xs text-muted-foreground">
                          شهرياً
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/apartment/${apartment.uuid}`)}
                      >
                        <Eye className="h-4 w-4 ml-1" />
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredApartments.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  لم يتم العثور على شقق تطابق معايير البحث
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedNeighborhood("");
                    setPriceRange([0, 10000]);
                    setBedrooms("");
                    setShowVerifiedOnly(false);
                  }}
                >
                  مسح جميع الفلاتر
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
