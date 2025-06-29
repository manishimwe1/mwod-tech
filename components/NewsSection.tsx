// components/NewsSection.jsx
import React from "react";

const news = [
  { title: "Launching our New Gaming Desktop", image: "https://via.placeholder.com/200", date: "Jun 28" },
  { title: "Top Headphones for 2025", image: "https://via.placeholder.com/200", date: "Jun 21" },
];

export default function NewsSection() {
  return (
    <section className="py-12 container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <img src={item.image} alt={item.title} className="w-full mb-3 rounded"/>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
