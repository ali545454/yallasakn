import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

const ApartmentImageGallery = ({ apartment }) => (
  <Dialog>
    <div className="relative">
      <section className="h-[300px] md:h-[500px] grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
        {apartment.images?.slice(0, 5).map((img, index) => (
          <DialogTrigger asChild key={index}>
            <div
              className={`
                ${
                  index === 0
                    ? "col-span-4 sm:col-span-2 row-span-2"
                    : "hidden sm:block"
                }
                overflow-hidden cursor-pointer group
              `}
            >
              <img
                src={img}
                alt={`View ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </DialogTrigger>
        ))}
      </section>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="absolute bottom-4 right-4 shadow-lg"
        >
          <ImageIcon className="w-4 h-4 ml-2" />
          عرض كل الصور
        </Button>
      </DialogTrigger>
    </div>
    <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
      <DialogHeader>
        <DialogTitle>معرض صور: {apartment.title}</DialogTitle>
      </DialogHeader>
      <div className="overflow-y-auto rounded-lg pr-3">
        <div className="space-y-4">
          {apartment.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Full view ${index + 1}`}
              className="w-full h-auto object-contain rounded-md"
            />
          ))}
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default ApartmentImageGallery;
