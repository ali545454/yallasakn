import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// واجهة لبيانات الشقة
interface Apartment {
  uuid: string;
  id: number;
  title: string;
  price: number;
  neighborhood?: string;
  image?: string;
}

// مكون الهيكل العظمي (Skeleton) لعرضه أثناء التحميل
const ApartmentSkeleton = () => (
  <Card className="flex flex-col h-full shadow-md overflow-hidden">
    <Skeleton className="w-full h-48" />
    <div className="p-4 flex flex-col flex-grow">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-6 w-1/3 mb-4" />
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
      .get("http://127.0.0.1:5000/api/v1/apartments/featured")
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
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          شقق مختارة بعناية
        </h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          تصفح أفضل الشقق التي قمنا باختيارها لك، والتي تتميز بمواقعها وخدماتها
          الممتازة.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ApartmentSkeleton />
          <ApartmentSkeleton />
          <ApartmentSkeleton />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((apt) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                <div className="aspect-video overflow-hidden">
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
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2 h-14 line-clamp-2 text-right">
                    {apt.title}
                  </h3>
                  <p className="flex items-center gap-1 text-muted-foreground text-sm mb-3 justify-end">
                    {apt.neighborhood?.name || "حي غير محدد"}
                    <MapPin className="h-4 w-4" />
                  </p>
                  <p className="font-extrabold text-primary text-xl text-right mb-4">
                    {apt.price} جنيه/شهرياً
                  </p>
                </CardContent>
                <CardFooter className="p-4 mt-auto">
                  <Link to={`/apartments/${apt.uuid}`} className="w-full">
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
