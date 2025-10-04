import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// تم استعادة الطريقة الصحيحة لتعريف متغيرات البيئة في Vite
const API_URL = import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app/`;

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/neighborhoods`);
        setNeighborhoods(res.data.map((n: any) => n.name));
      } catch (err) {
        console.error("Error fetching neighborhoods:", err);
      }
    };
    fetchNeighborhoods();
  }, []);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.set("q", searchTerm);
    if (selectedNeighborhood && selectedNeighborhood !== "all") {
      searchParams.set("neighborhood", selectedNeighborhood);
    }
    if (priceRange && priceRange !== "all") {
      searchParams.set("price", priceRange);
    }
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleMobileSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.set("q", searchTerm);
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleAddApartment = () => {
    navigate("/add-apartment");
  };

  return (
    <section
      className="relative flex items-center justify-center px-4 py-20"
      style={{
        minHeight: "calc(100vh - 64px)",
        // صورة جديدة تعبر عن شقق طلابية فاخرة
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2023/11/06/02/21/kitchen-8368678_960_720.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
          سكنك المثالي في أسيوط بانتظارك
        </h1>
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
          استعرض أفضل الشقق الطلابية بسهولة وأمان. هل أنت صاحب سكن؟
          <button
            onClick={handleAddApartment}
            className="font-bold text-primary hover:text-primary/80 transition mx-1 underline"
          >
            أضف عقارك الآن
          </button>
        </p>

        {/* --- شريط البحث المتقدم (للشاشات الكبيرة فقط) --- */}
        <div className="mt-10 max-w-5xl mx-auto bg-white rounded-full shadow-2xl p-2 hidden md:flex items-center gap-4">
          {/* البحث */}
          <div className="relative flex items-center flex-1">
            <Search className="absolute right-4 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث بالاسم أو المواصفات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 border-none rounded-full bg-transparent pr-12 text-right focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <span className="w-px h-8 bg-gray-200"></span>

          {/* اختيار المنطقة */}
          <Select
            value={selectedNeighborhood}
            onValueChange={setSelectedNeighborhood}
          >
            <SelectTrigger className="w-56 h-12 border-none bg-transparent justify-end gap-2 text-right focus:ring-0 focus:ring-offset-0">
              <MapPin className="h-5 w-5 text-gray-400 order-last" />
              <SelectValue placeholder="اختر المنطقة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المناطق</SelectItem>
              {neighborhoods.map((neighborhood) => (
                <SelectItem key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="w-px h-8 bg-gray-200"></span>

          {/* النطاق السعري */}
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-56 h-12 border-none bg-transparent justify-end gap-2 text-right focus:ring-0 focus:ring-offset-0">
              <DollarSign className="h-5 w-5 text-gray-400 order-last" />
              <SelectValue placeholder="النطاق السعري" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأسعار</SelectItem>
              <SelectItem value="0-1000">أقل من 1000 جنيه</SelectItem>
              <SelectItem value="1000-2000">1000 - 2000 جنيه</SelectItem>
              <SelectItem value="2000-3000">2000 - 3000 جنيه</SelectItem>
              <SelectItem value="3000-5000">3000 - 5000 جنيه</SelectItem>
              <SelectItem value="5000+">أكثر من 5000 جنيه</SelectItem>
            </SelectContent>
          </Select>

          {/* زر البحث */}
          <Button
            onClick={handleSearch}
            size="icon"
            className="w-12 h-12 rounded-full shadow-lg"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">بحث</span>
          </Button>
        </div>

        {/* --- شريط البحث البسيط (للموبايل فقط) --- */}
        <form
          onSubmit={handleMobileSearch}
          className="mt-8 max-w-sm mx-auto md:hidden"
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="ابحث عن منطقتك أو شقتك..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 rounded-full bg-white pr-6 pl-16 text-right text-base"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
