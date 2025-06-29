// components/HeroSection.jsx
import { getHeroSection } from "@/sanity/getData/heroSection";
import React from "react";

export default async function HeroSection() {
    const heroSection = await getHeroSection()
    console.log(heroSection,'hero section');
    
  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">{heroSection?.title}</h2>
          <p className="text-lg">{heroSection?.subTitle}</p>
          <button className="bg-white text-blue-700 font-semibold px-6 py-2 rounded hover:bg-blue-100">
            Shop Now
          </button>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img src={heroSection?.imageUrl ?? ''} alt="Gaming Desktop" className="mx-auto"/>
        </div>
      </div>
    </section>
  );
}
