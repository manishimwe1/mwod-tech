import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div
      className="
        group relative flex flex-col
        bg-white rounded-3xl 
        shadow-[0px_4px_20px_rgba(0,0,0,0.06)]
        transition-all duration-500 ease-out 
        overflow-hidden border border-white/40
        backdrop-blur-xl
        animate-pulse
      "
    >
      {/* Image Placeholder */}
      <div
        className="
          relative w-full h-full lg:aspect-square overflow-hidden 
          bg-gray-200
          rounded-t-3xl
          border-b border-gray-100
          shadow-inner
          h-[300px]
        "
      >
        {/* Badge Placeholder */}
        <div className="absolute top-3 left-3 z-20 w-16 h-6 bg-gray-300 rounded-full"></div>
        {/* Wishlist Button Placeholder */}
        <div className="absolute top-3 right-3 z-10 w-8 h-8 bg-gray-300 rounded-full"></div>
        {/* Views Badge Placeholder */}
        <div className="absolute bottom-3 left-3 w-24 h-6 bg-gray-300 rounded"></div>
      </div>

      {/* Info Section Placeholder */}
      <div className="p-3">
        {/* Rating Placeholder */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Title Placeholder */}
        <div className="h-4 bg-gray-200 rounded mb-2 w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-8/12"></div>

        {/* Condition Placeholder */}
        <div className="mb-2">
          <div className="w-24 h-6 bg-gray-200 rounded"></div>
        </div>

        {/* Price Placeholder */}
        <div className="flex items-start justify-end h-12 gap-2 mb-2">
          <div className="w-24 h-6 bg-gray-200 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Save RWF Placeholder */}
        <div className="bg-gray-100 rounded-lg p-2 mb-2">
          <div className="h-4 bg-gray-200 rounded w-10/12 mx-auto"></div>
        </div>

        {/* Add to Cart Button Placeholder */}
        <div className="flex gap-2">
          <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;