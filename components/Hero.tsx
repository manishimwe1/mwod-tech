'use client'

import { api } from "@/convex/_generated/api";
import { usePreloadedQuery } from "convex/react";
import { ArrowRight, ChevronRight, Phone, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = ({ hotProducts, dealsProducts }: any) => {
   const hot = usePreloadedQuery(
    hotProducts
  );

  const deals = usePreloadedQuery(
    dealsProducts
  );
  console.log({hot, deals},hot?.[0]?.imageUrls?.[0]);
  
  if (!hot || !deals) return null;

  const  dealFirstImage = deals?.[0]?.imageUrls?.[0] ?? "";
  const hotFirstImage = hot?.[0]?.imageUrls?.[0] ?? "";

  return (
    <section className="hidden lg:block bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24 ">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* TEXT CONTENT */}
          <div>
            {/* Local SEO badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Buy Laptops in Rwanda 🇷🇼
            </div>

            {/* ✅ MAIN SEO H1 */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Buy New & Used <span className="text-blue-600">Laptops in Rwanda</span>
            </h1>

            {/* ✅ SEO paragraph (VERY IMPORTANT) */}
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              EasyFix Tech offers affordable laptops in Rwanda including HP,
              Dell, Lenovo, and Apple. Perfect for students, office work,
              programming, and business. Enjoy warranty, pay on delivery,
              and fast delivery in Kigali and across Rwanda.
            </p>

            {/* ✅ REAL TRUST (LOCAL & SPECIFIC) */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  Warranty
                </div>
                <div className="text-sm text-gray-600">
                  Up to 3 Months
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  Delivery
                </div>
                <div className="text-sm text-gray-600">
                  Same Day in Kigali
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  Payment
                </div>
                <div className="text-sm text-gray-600">
                  Pay on Delivery
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/buy-laptops-in-rwanda"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                Browse Laptops
                <ChevronRight className="w-5 h-5" />
              </Link>

              <Link
                href="/sell"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition flex items-center justify-center gap-2"
              >
                Sell Your Laptop
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* IMAGES (UNCHANGED STRUCTURE, SEO SAFE) */}
          <div className="relative hidden lg:block">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                🔥 Laptop Deals Today
              </div>

              <div className="grid grid-cols-2 gap-4">
                {hot.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="relative h-32 mb-3 overflow-hidden">
                      <Image
                        src={hot?.[0]?.imageUrls?.[0]}
                        alt={`${hot[0].name} price in Rwanda`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-sm font-semibold truncate">
                      {hot[0].name}
                    </div>
                    <div className="text-xs text-gray-600 text-right">
                      From {hot[0].price.toLocaleString()} RWF
                    </div>
                  </div>
                )}

                {deals.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-xl mt-8">
                    <div className="relative h-32 mb-3 overflow-hidden">
                      <Image
                        src={dealFirstImage}
                        alt={`${deals[0].name} laptop Rwanda`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-sm font-semibold truncate">
                      {deals[0].name}
                    </div>
                    <div className="text-xs text-gray-600">
                      From {deals[0].price.toLocaleString()} RWF
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

