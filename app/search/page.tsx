import React from "react";
import { getProductData } from "@/sanity/getData";
import Link from "next/link";
import Image from "next/image";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.toLowerCase() || "";
  const products = await getProductData();
  const filtered = query
    ? products?.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    : [];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {query && (
        <p className="mb-4 text-gray-600">
          Showing results for <span className="font-semibold">&quot;{query}&quot;</span>
        </p>
      )}
      {filtered && filtered.length > 0 ? (
        <ul className="space-y-4">
          {filtered.map((product) => (
            <li key={product._id} className="flex items-center gap-4 p-2 border rounded-md hover:bg-gray-50">
              <Link href={`/product-detail/${encodeURIComponent(product.slug.current)}`} className="flex items-center gap-4">
                <Image
                  src={product.imageUrl || "/images/thinkpad.jpg"}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="rounded bg-white object-contain"
                />
                <span className="font-medium text-lg">{product.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
} 