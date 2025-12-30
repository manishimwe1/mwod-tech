"use client";

import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useProductStore } from "@/lib/store";
import { Doc } from "@/convex/_generated/dataModel";
import { ChevronRightIcon, FlameIcon } from "lucide-react";
import ProductCardSkeleton from "./ProductCardSkeleton";

type Props = {
  initialProducts: Doc<"products">[];
};

const TrendingProductsClient = ({ initialProducts }: Props) => {
  const { products, setProducts } = useProductStore();

  // Hydrate Zustand ONCE from server data
  useEffect(() => {
    if (products.length === 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts, products.length, setProducts]);

  if (products.length === 0) {
    return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {Array.from({ length: 4 }).map((_, index) => (
    <ProductCardSkeleton key={index} />
  ))}
</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            <FlameIcon className="w-8 h-8 inline text-orange-500 mr-2" />
            Trending Laptops in Rwanda
          </h2>
          <p className="text-gray-600">
            Best selling laptops & electronics this week
          </p>
        </div>

        <a
          href="/products"
          className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
        >
          View All
          <ChevronRightIcon className="w-5 h-5" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProductsClient;
