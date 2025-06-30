// App.jsx
import BestSellers from "@/components/BestSellers";
import BrandsCarousel from "@/components/BrandsCarousel";
import DealsOfTheDay from "@/components/DealsOfTheDay";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsSection from "@/components/NewsSection";
// import ProductCategories from "@/components/ProductCategories";
import TrendingTags from "@/components/TrendingTags";
import { getHeroSection } from "@/sanity/getData";
import React from "react";


export default async function App() {
  const heroSection = await getHeroSection();

  return (
    <div className="font-sans text-gray-900">
      <Header />
      <HeroSection heroSection={heroSection} />
      {/* <ProductCategories /> */}
      
      <FeaturedProducts />
      <BestSellers />
      <DealsOfTheDay />
      <BrandsCarousel />
      <TrendingTags />
      <NewsSection />
      <Footer />
    </div>
  );
}
