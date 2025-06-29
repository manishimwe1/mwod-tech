// components/TrendingTags.jsx
import React from "react";

const tags = ["#Smartphones", "#Wearables", "#Gaming", "#Headphones", "#TrendingNow"];

export default function TrendingTags() {
  return (
    <section className="py-6 bg-blue-50">
      <div className="container mx-auto flex flex-wrap gap-3 justify-center">
        {tags.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 bg-blue-700 text-white rounded-full hover:bg-blue-800 cursor-pointer">
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
