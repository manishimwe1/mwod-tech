"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePreloadedQuery, type Preloaded } from "convex/react";
import type { FunctionReference } from "convex/server";
import { Id } from "@/convex/_generated/dataModel";

export interface HotProduct {
  _id: Id<"products">;
  name: string;
  description: string;
  price: number;
  images: string[];
  slug?: string;
  category: string;
}

interface Props {
  hotProducts: Preloaded<
    FunctionReference<"query", "public", {}, HotProduct[]>
  >;
}

export function FeaturedCarousel({ hotProducts }: Props) {
  const products = usePreloadedQuery(hotProducts);
  const [api, setApi] = useState<CarouselApi>();

  if (!products?.length) return null;

  return (
    <section className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Today's Deals 🔥
            </h1>
            <p className="text-sm text-gray-500">
              Popular products customers love
            </p>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 6000 })]}
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product._id}>
                <FeaturedSlide product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}


function FeaturedSlide({ product }: { product: HotProduct }) {
  const image = product.imageUrls?.[0];

  return (
    <article
      className="grid md:grid-cols-2 gap-6 items-center bg-gray-50 rounded-xl p-6"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-white rounded-lg overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={`${product.name} in ${product.category}`}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            priority
            itemProp="image"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <Badge className="mb-2">{product.category}</Badge>

        <h2
          className="text-xl md:text-2xl line-clamp-2 font-semibold text-gray-900"
          itemProp="name"
        >
          {product.name}
        </h2>

        <p
          className="mt-2 text-gray-600 line-clamp-2"
          itemProp="description"
        >
          {product.description}
        </p>

        <div
          className="mt-4 text-2xl font-bold text-gray-900"
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
        >
          <meta itemProp="price" content={product.price.toString()} />
          <meta itemProp="priceCurrency" content="RWF" />
          RWF {product.price.toLocaleString()}
        </div>

        <Button asChild className="mt-5">
          <Link href={`/product/${product._id}`}>
            Shop now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
