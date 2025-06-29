// components/BestSellers.jsx
import React from "react";

const bestSellers = [
  { name: "MacBook Pro 14”", price: "$1499", image: "https://via.placeholder.com/150" },
  { name: "iPhone 14", price: "$799", image: "https://via.placeholder.com/150" },
  { name: "Galaxy Watch 5", price: "$249", image: "https://via.placeholder.com/150" },
];

export default function BestSellers() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Best Sellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {bestSellers.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <img src={item.image} alt={item.name} className="w-full mb-3 rounded"/>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-blue-700 font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
