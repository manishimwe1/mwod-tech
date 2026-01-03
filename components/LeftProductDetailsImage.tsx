import { Doc } from "@/convex/_generated/dataModel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ZoomImage from "@/components/ZoomImage";
import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import Image from "next/image";


const LeftProductDetailsImage = ({ product }: { product: Doc<"products">   }) => {
     const plugin = useRef(Autoplay({ delay: 600000, stopOnInteraction: false }));
     const [selectedIndex, setSelectedIndex] = useState(0);
     const [mainCarouselApi, setMainCarouselApi] = useState<EmblaCarouselType>();
     const [thumbnailCarouselApi, setThumbnailCarouselApi] = useState<EmblaCarouselType>();
     const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
     }, []);

     useEffect(() => {
        if (!mainCarouselApi) return;
        onSelect(mainCarouselApi);
        mainCarouselApi.on("select", onSelect);
        mainCarouselApi.on("reInit", onSelect);
        return () => {
            mainCarouselApi.off("select", onSelect);
            mainCarouselApi.off("reInit", onSelect);
        };
     }, [mainCarouselApi, onSelect]);

     const onThumbClick = useCallback(
        (index: number) => {
            if (!mainCarouselApi || !thumbnailCarouselApi) return;
            mainCarouselApi.scrollTo(index);
        },
        [mainCarouselApi, thumbnailCarouselApi]
     );
     
  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
        {/* Stock Badge */}
        {product.stock > 0 ? (
          <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm z-10">
            In Stock ({product.stock})
          </div>
        ) : (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm z-10">
            Out of Stock
          </div>
        )}

        {/* Image Carousel */}
        <Carousel
          className="w-full h-[400px] md:h-[500px] relative"
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          setApi={setMainCarouselApi}
        >
          <CarouselContent className="h-full">
            {product.imageUrls?.map((image, i) => (
              <CarouselItem
                key={i}
                className="aspect-square relative rounded-lg overflow-hidden"
              >
                <ZoomImage
                  src={image!}
                  alt={product.name}
                  className="object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-blue-50 rounded-full shadow-md p-2 text-gray-800 hover:text-blue-600 transition-all" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-blue-50 rounded-full shadow-md p-2 text-gray-800 hover:text-blue-600 transition-all" />
        </Carousel>
      </div>
      {/* Thumbnail Carousel */}
      <Carousel
        className="w-full"
        opts={{ align: "start", loop: true, containScroll: "keepSnaps" }}
        setApi={setThumbnailCarouselApi}
      >
        <CarouselContent className="flex gap-2">
          {product.imageUrls?.map((image, index) => (
            <CarouselItem
              key={index}
              className={`basis-1/4 md:basis-1/6 lg:basis-1/8 cursor-pointer rounded-lg overflow-hidden border-2 ${
                index === selectedIndex ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => onThumbClick(index)}
            >
              <Image
                src={image!}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default LeftProductDetailsImage;
