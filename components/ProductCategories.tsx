// components/ProductCategories.jsx
import React from "react";

const categories = [
  { name: "Smartwatches", image: "https://via.placeholder.com/100" },
  { name: "Headphones", image: "https://via.placeholder.com/100" },
  { name: "Smartphones", image: "https://via.placeholder.com/100" },
];

export default function ProductCategories() {
  return (
    <section className="py-8 container mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((cat, idx) => (
        <div key={idx} className="bg-gray-100 p-4 rounded text-center hover:shadow">
          <img src={cat.image} alt={cat.name} className="mx-auto mb-2"/>
          <h3 className="font-semibold">{cat.name}</h3>
        </div>
      ))}
    </section>
  );
}
