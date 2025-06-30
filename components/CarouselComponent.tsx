"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HeroSectionType } from "@/typeing";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";
//   import Image from "next/image";

const CarouselComponent = ({
  heroSection,
}: {
  heroSection: HeroSectionType[];
}) => {
  // Defensive: ensure at least two items
  if (!heroSection || heroSection.length < 2) return null;

  // Split images for each carousel
  // First carousel gets images at indices 0, 2, 4, ... (1st, 3rd, 5th images)
  const firstImages = heroSection.filter((_, i) => i % 2 === 0);
  // Second carousel gets images at indices 1, 3, 5, ... (2nd, 4th, 6th images)
  const secondImages = heroSection.filter((_, i) => i % 2 === 1);

  return (
    <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full p-10">
      {/* First Carousel */}
      <Carousel
        className="w-full md:w-1/2 relative overflow-hidden rounded-xl shadow-lg"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
      >
        <CarouselContent className="w-full">
          {firstImages.map((feature) => (
            <CarouselItem className="w-full" key={feature._id}>
              <div className="w-full h-44 md:h-52 flex items-center justify-center rounded-xl overflow-hidden">
                <div
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: feature.imageUrl ? `url(${feature.imageUrl})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    // backgroundColor: feature.imageUrl ? undefined : '#e5e7eb', // fallback
                  }}
                />
                
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Second Carousel */}
      <Carousel
        className="w-full md:w-1/2 relative overflow-hidden rounded-xl hidden md:inline-block"
        plugins={[Autoplay({ delay: 6500, stopOnInteraction: false })]}
      >
        <CarouselContent className="w-full">
          {secondImages.map((feature) => (
            <CarouselItem className="w-full" key={feature._id}>
              <div className="w-full h-44 md:h-52 flex items-center justify-center rounded-xl overflow-hidden bg-stone-100">
                <div
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: feature.imageUrl ? `url(${feature.imageUrl})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: feature.imageUrl ? undefined : '#e5e7eb',
                  }}
                />
                <Button className="bg-blue-500 md:hidden text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 cursor-pointer absolute bottom-4 left-1/2 -translate-x-1/2 w-fit z-10" size={'sm'}>
                  Shop Now
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
