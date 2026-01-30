// Search.tsx

import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useApartments } from "./Search/hooks/useApartments";
import { useNeighborhoods } from "./Search/hooks/useNeighborhoods";
import { useFilters } from "./Search/hooks/useFilters";
import { useFilteredApartments } from "./Search/hooks/useFilteredApartments";
import { useFavorites } from "@/context/FavoritesContext";
import FilterPanel from "./Search/components/FilterPanel";
import SearchBar from "./Search/components/SearchBar";
import SortSelect from "./Search/components/SortSelect";
import ApartmentCard from "./Search/components/ApartmentCard";

const SearchPage = () => {
  const { t, i18n } = useTranslation();
  console.log('SearchPage t function:', t('search.title'));
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { apartments, isLoading, error } = useApartments();
  const { neighborhoods } = useNeighborhoods();
  const {
    searchTerm,
    setSearchTerm,
    selectedNeighborhood,
    setSelectedNeighborhood,
    priceRange,
    setPriceRange,
    bedrooms,
    setBedrooms,
    sortBy,
    setSortBy,
    showVerifiedOnly,
    setShowVerifiedOnly,
  } = useFilters(searchParams);

  const filters = {
    searchTerm,
    selectedNeighborhood,
    priceRange,
    bedrooms,
    sortBy,
    showVerifiedOnly,
  };

  const { filteredApartments } = useFilteredApartments(apartments, filters);

  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);
    if (selectedNeighborhood) params.set("neighborhood", selectedNeighborhood);
    setSearchParams(params);
  }, [searchTerm, selectedNeighborhood, setSearchParams]);

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
          <h1 className="text-3xl font-bold mb-4">{t('errors.unexpected')}</h1>
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div key={i18n.language} className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('search.title')}</h1>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {t('search.foundApartments', { count: filteredApartments.length })}
            </p>
            <div className="flex items-center gap-4">
              <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
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
                    <FilterPanel
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      selectedNeighborhood={selectedNeighborhood}
                      setSelectedNeighborhood={setSelectedNeighborhood}
                      bedrooms={bedrooms}
                      setBedrooms={setBedrooms}
                      showVerifiedOnly={showVerifiedOnly}
                      setShowVerifiedOnly={setShowVerifiedOnly}
                      neighborhoods={neighborhoods}
                    />
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
              <FilterPanel
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedNeighborhood={selectedNeighborhood}
                setSelectedNeighborhood={setSelectedNeighborhood}
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                showVerifiedOnly={showVerifiedOnly}
                setShowVerifiedOnly={setShowVerifiedOnly}
                neighborhoods={neighborhoods}
              />
            </Card>
          </div>
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredApartments.map((apartment) => (
                <ApartmentCard
                  key={apartment.uuid}
                  apartment={apartment}
                  isFavorite={favorites.includes(apartment.uuid)}
                  onToggleFavorite={toggleFavorite}
                />
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
                    setPriceRange({ min: 0, max: 10000 });
                    setBedrooms("");
                    setSortBy("newest");
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
