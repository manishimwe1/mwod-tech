"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useEffect, useRef, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { ChevronRightIcon, FlameIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  initialPage: {
    page: Doc<"products">[];
    continueCursor: any;
    isDone: boolean;
  };
};

export default function TrendingProducts({ initialPage }: Props) {
  const [allProducts, setAllProducts] = useState<Doc<"products">[]>(initialPage.page);

  const { results, status, loadMore } = usePaginatedQuery(
    api.product.getProductsWithImagePaginated,
    {
      paginationOpts: { numItems: 12 },
    },
    { initialNumItems: initialPage.page.length }
  );

  // Update state as new pages load
  useEffect(() => {
    setAllProducts(results);
  }, [results]);

  const loaderRef = useRef<HTMLDivElement>(null);

  // Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && status === "CanLoadMore") {
          loadMore(12);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [status, loadMore]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            <FlameIcon className="w-8 h-8 inline text-orange-500 mr-2" />
            All Products
          </h2>
          <p className="text-gray-600">All products available for purchase</p>
        </div>
        <Link href="/buy-laptops-in-rwanda" className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
          View All
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Loading & Infinite Scroll Trigger */}
      <div ref={loaderRef} className="py-10 flex justify-center">
        {status === "LoadingMore" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}
        {status === "Exhausted" && (
          <p className="text-gray-500 text-sm mt-4">No more products available</p>
        )}
      </div>
    </div>
  );
}
