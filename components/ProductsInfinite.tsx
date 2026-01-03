"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useEffect, useRef, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";

type Props = {
  initialPage: {
    page: Doc<"products">[];
    continueCursor: any;
    isDone: boolean;
  };
};

export default function ProductsInfinite({ initialPage }: Props) {
  const [allProducts, setAllProducts] = useState<Doc<"products">[]>(
    initialPage.page
  );

  const { results, status, loadMore } = usePaginatedQuery(
    api.product.getProductsWithImagePaginated,
    {
      paginationOpts: { numItems: 12 },
    },
    { initialNumItems: initialPage.page.length }
  );

  // Update allProducts as new pages load
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {allProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Loading trigger */}
      <div ref={loaderRef} className="py-10 flex justify-center">
        {status === "LoadingMore" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}
        {status === "Exhausted" && (
          <p className="text-gray-500 text-sm">No more products available</p>
        )}
      </div>
    </>
  );
}
