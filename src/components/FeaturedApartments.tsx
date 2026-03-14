import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import FavoriteButton from "@/components/FavoriteButton";

interface Apartment {
  uuid: string;
  id: number;
  title: string;
  price: number;
  neighborhood?: string | { name?: string };
  image?: string;
}

const ApartmentSkeleton = () => (
  <Card className="flex h-full flex-col overflow-hidden shadow-md">
    <Skeleton className="h-48 w-full" />
    <div className="flex flex-grow flex-col p-4">
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-4 h-4 w-1/2" />
      <Skeleton className="mb-4 h-6 w-1/3" />
      <div className="mt-auto">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  </Card>
);

const FeaturedApartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/v1/apartments/featured")
      .then((res) => {
        setApartments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching featured apartments:", err);
        setError("لا يمكن تحميل الشقق المميزة حالياً.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
          شقق مختارة بعناية
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
          تصفح أفضل الشقق التي قمنا باختيارها لك، والتي تتميز بمواقعها وخدماتها
          الممتازة.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ApartmentSkeleton />
          <ApartmentSkeleton />
          <ApartmentSkeleton />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apt) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={
                      apt.image
                        ? apt.image
                        : `https://placehold.co/600x400/EEE/31343C?text=${encodeURIComponent(
                            apt.title
                          )}`
                    }
                    alt={apt.title}
                  />
                  <FavoriteButton
                    apartmentUuid={apt.uuid}
                    className="absolute right-2 top-2"
                    iconClassName="h-4 w-4"
                  />
                </div>
                <CardContent className="flex flex-grow flex-col p-4">
                  <h3 className="mb-2 h-14 line-clamp-2 text-right text-lg font-bold">
                    {apt.title}
                  </h3>
                  <p className="mb-3 flex items-center justify-end gap-1 text-sm text-muted-foreground">
                    {typeof apt.neighborhood === "string"
                      ? apt.neighborhood
                      : apt.neighborhood?.name || "حي غير محدد"}
                    <MapPin className="h-4 w-4" />
                  </p>
                  <p className="mb-4 text-right text-xl font-extrabold text-primary">
                    {apt.price} جنيه/شهرياً
                  </p>
                </CardContent>
                <CardFooter className="mt-auto p-4">
                  <Link to={`/apartment/${apt.uuid}`} className="w-full">
                    <Button size="lg" className="w-full font-bold">
                      عرض التفاصيل <ArrowLeft className="mr-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedApartments;
