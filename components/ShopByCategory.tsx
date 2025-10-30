import { ArrowRight, Check, Package, TrendingUp } from "lucide-react";
import React from "react";

const ShopByCategory = () => {
  return (
    <section className="py-16 lg:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by <span className="text-blue-600">Category</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our verified collection of electronics at unbeatable prices
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Phones + iPhones",
              image: "📱",
              listings: 14861,
              views: 1422,
              gradient: "from-blue-50 to-blue-100",
              slug: "phones-iphones",
              priceFrom: "250,000",
            },
            {
              title: "MacBooks + Laptops",
              image: "💻",
              listings: 920,
              views: 408,
              gradient: "from-purple-50 to-purple-100",
              slug: "computers-laptops",
              priceFrom: "440,000",
            },
            {
              title: "Watches + Accessories",
              image: "⌚",
              listings: 1274,
              views: 264,
              gradient: "from-pink-50 to-pink-100",
              slug: "watches-accessories",
              priceFrom: "180,000",
            },
          ].map((category) => (
            <div
              key={category.slug}
              className={`group bg-gradient-to-br ${category.gradient} rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2 cursor-pointer`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {category.title}
                  </h3>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Verified
                  </div>
                </div>

                {/* Image */}
                <div className="bg-white rounded-xl h-48 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-8xl">{category.image}</span>
                </div>

                {/* Price Teaser */}
                <div className="mb-4 text-center">
                  <span className="text-sm text-gray-600">From </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {category.priceFrom}
                  </span>
                  <span className="text-sm text-gray-600"> RWF</span>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm bg-white bg-opacity-50 rounded-lg p-3">
                    <span className="text-gray-700 flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      Active Listings
                    </span>
                    <strong className="text-gray-900">
                      {category.listings.toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-sm bg-white bg-opacity-50 rounded-lg p-3">
                    <span className="text-gray-700 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      Views Today
                    </span>
                    <strong className="text-gray-900">
                      {category.views.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 group-hover:gap-3">
                  Browse {category.title}
                  <ArrowRight className="w-5 h-5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
