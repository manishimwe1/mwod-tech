"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useEffect, useRef, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { 
  ChevronRightIcon, 
  FlameIcon, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  X 
} from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { categories, brands } from "@/constants";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: 1000000,
    condition: "",
    sortBy: "newest" as "price-low" | "price-high" | "newest" | "popular",
  });

  // Collapsible filter states
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isConditionOpen, setIsConditionOpen] = useState(true);

  const { results, status, loadMore } = usePaginatedQuery(
    api.product.getFilteredProductsWithImagePaginated,
    {
      paginationOpts: { numItems: 12 },
      filters: {
        category: filters.category || undefined,
        brand: filters.brand || undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        condition: filters.condition as any || undefined,
        sortBy: filters.sortBy,
      },
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

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1]
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      brand: "",
      minPrice: 0,
      maxPrice: 1000000,
      condition: "",
      sortBy: "newest"
    });
  };

  // Count active filters
  const activeFilterCount = [
    filters.category,
    filters.brand,
    filters.condition,
    filters.minPrice > 0 || filters.maxPrice < 1000000
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Filter Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-80 bg-white border-r lg:border-r-0 lg:border-none
          overflow-y-auto z-50 lg:z-0
          transition-transform duration-300 ease-in-out
          ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:float-left lg:mr-8 lg:mb-8
        `}
      >
        <div className="sticky top-0 bg-white z-10 p-6 border-b lg:border-b-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-bold text-gray-900">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Sort By - Mobile/Tablet priority */}
          <div className="lg:hidden">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Sort By
            </label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value as any)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
          <div className="border-b pb-6">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <h4 className="text-sm font-semibold text-gray-900">Category</h4>
              {isCategoryOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              )}
            </button>
            {isCategoryOpen && (
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2.5">
                  <Checkbox
                    id="category-all"
                    checked={!filters.category}
                    onCheckedChange={() => handleFilterChange("category", "")}
                    className="rounded"
                  />
                  <label
                    htmlFor="category-all"
                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 flex-1"
                  >
                    All Categories
                  </label>
                </div>
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2.5">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.category === category}
                      onCheckedChange={() => handleFilterChange("category", category)}
                      className="rounded"
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 flex-1"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Brands */}
          <div className="border-b pb-6">
            <button
              onClick={() => setIsBrandOpen(!isBrandOpen)}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <h4 className="text-sm font-semibold text-gray-900">Brand</h4>
              {isBrandOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              )}
            </button>
            {isBrandOpen && (
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="flex items-center space-x-2.5">
                  <Checkbox
                    id="brand-all"
                    checked={!filters.brand}
                    onCheckedChange={() => handleFilterChange("brand", "")}
                    className="rounded"
                  />
                  <label
                    htmlFor="brand-all"
                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 flex-1"
                  >
                    All Brands
                  </label>
                </div>
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2.5">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brand === brand}
                      onCheckedChange={() => handleFilterChange("brand", brand)}
                      className="rounded"
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 flex-1"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="border-b pb-6">
            <button
              onClick={() => setIsPriceOpen(!isPriceOpen)}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <h4 className="text-sm font-semibold text-gray-900">Price Range</h4>
              {isPriceOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              )}
            </button>
            {isPriceOpen && (
              <div className="space-y-4 pt-2">
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  min={0}
                  max={1000000}
                  step={10000}
                  onValueChange={handlePriceChange}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">
                    RWF {filters.minPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-400">—</span>
                  <span className="font-medium text-gray-900">
                    RWF {filters.maxPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Condition */}
          <div className="pb-6">
            <button
              onClick={() => setIsConditionOpen(!isConditionOpen)}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <h4 className="text-sm font-semibold text-gray-900">Condition</h4>
              {isConditionOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              )}
            </button>
            {isConditionOpen && (
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2.5">
                  <Checkbox
                    id="condition-all"
                    checked={!filters.condition}
                    onCheckedChange={() => handleFilterChange("condition", "")}
                    className="rounded"
                  />
                  <label
                    htmlFor="condition-all"
                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 flex-1"
                  >
                    All Conditions
                  </label>
                </div>
                {["New", "Like New", "Good", "Used"].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2.5">
                    <Checkbox
                      id={`condition-${condition}`}
                      checked={filters.condition === condition}
                      onCheckedChange={() => handleFilterChange("condition", condition)}
                      className="rounded"
                    />
                    <label
                      htmlFor={`condition-${condition}`}
                      className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 flex-1"
                    >
                      {condition}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            onClick={resetFilters}
            className="w-full border-gray-300 hover:bg-gray-50"
          >
            Reset All Filters
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-80 lg:pl-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FlameIcon className="w-8 h-8 text-orange-500" />
              All Products
            </h2>
            <p className="text-gray-600">
              {allProducts.length} {allProducts.length === 1 ? 'product' : 'products'} available
            </p>
          </div>
          <Link 
            href="/buy-laptops-in-rwanda" 
            className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
          >
            View All
            <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile Filter Toggle & Sort */}
        <div className="lg:hidden flex items-center gap-3 mb-6">
          <Button
            onClick={() => setIsFilterOpen(true)}
            variant="outline"
            className="flex items-center gap-2 flex-1"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>
          <div className="hidden sm:block flex-1">
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value as any)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Sort */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            {activeFilterCount > 0 && `${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} applied`}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort:</span>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value as any)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Loading & Infinite Scroll Trigger */}
        <div ref={loaderRef} className="py-10">
          {status === "LoadingMore" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}
          {status === "Exhausted" && allProducts.length > 0 && (
            <p className="text-center text-gray-500 text-sm">
              You've reached the end of the list
            </p>
          )}
          {allProducts.length === 0 && status === "Exhausted" && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">No products found</p>
              <p className="text-gray-400 text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}