// components/BrandsCarousel.jsx
import React from "react";

const brands = [
  "https://via.placeholder.com/100x40?text=Brand1",
  "https://via.placeholder.com/100x40?text=Brand2",
  "https://via.placeholder.com/100x40?text=Brand3",
  "https://via.placeholder.com/100x40?text=Brand4",
];

export default function BrandsCarousel() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto flex justify-around items-center flex-wrap gap-4">
        {brands.map((logo, idx) => (
          <img key={idx} src={logo} alt="Brand" className="h-10 object-contain"/>
        ))}
      </div>
    </section>
  );
}
