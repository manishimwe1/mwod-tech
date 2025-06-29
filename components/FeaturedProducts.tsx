// components/FeaturedProducts.jsx
import React from "react";

const featured = [
  { name: "Smartwatch X200", price: "$199", image: "https://via.placeholder.com/150" },
  { name: "Wireless Earbuds", price: "$59", image: "https://via.placeholder.com/150" },
  { name: "Portable Speaker", price: "$89", image: "https://via.placeholder.com/150" },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12 container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {featured.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <img src={item.image} alt={item.name} className="w-full mb-3 rounded"/>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-blue-700 font-bold">{item.price}</p>
            <button className="mt-2 bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
