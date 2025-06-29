// components/DealsOfTheDay.jsx
import React from "react";

const deals = [
  { name: "Black Friday Phone", oldPrice: "$999", newPrice: "$749", image: "https://via.placeholder.com/150" },
  { name: "Air Purifier", oldPrice: "$299", newPrice: "$199", image: "https://via.placeholder.com/150" },
];

export default function DealsOfTheDay() {
  return (
    <section className="py-12 container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Deals of the Day</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map((item, idx) => (
          <div key={idx} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded shadow hover:scale-105 transition">
            <div className="flex items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded mr-4"/>
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="line-through">{item.oldPrice}</p>
                <p className="text-xl font-bold">{item.newPrice}</p>
                <button className="mt-2 bg-white text-purple-700 px-3 py-1 rounded hover:bg-purple-100">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
