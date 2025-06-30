// components/ProductCategories.jsx
import Image from "next/image";
import React from "react";

const categories = [
  { name: "Lenovo", image: "/lenovo.jpg" },
  { name: "HP", image: "/hp.jpg" },
  { name: "Dell", image: "/dell.jpg" },
];

export default function ProductCategories() {
  return (
    <section className="py-8 container mx-auto flex items-center justify-center">
      {categories.map((cat, idx) => (
        <div key={idx} className="bg-white p-4 rounded text-center hover:shadow flex items-center justify-center gap-2">
          <Image height={40} width={40} src={cat.image} alt={cat.name} className="mx-auto mb-2 object-center object-contain rounded-full" />
          <h3 className="font-semibold">{cat.name}</h3>
        </div>
      ))}
    </section>
  );
}
