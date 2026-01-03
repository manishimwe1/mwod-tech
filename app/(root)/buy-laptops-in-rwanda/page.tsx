import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import ProductCard from "@/components/ProductCard";
import ProductsInfinite from "@/components/ProductsInfinite"; // client infinite scroll
import { Doc } from "@/convex/_generated/dataModel";

export const metadata = {
  title: "Buy Laptops in Rwanda | New & Used Laptops in Kigali",
  description:
    "Buy affordable new and used laptops in Rwanda. Dell, HP, Lenovo laptops with warranty, fast delivery in Kigali and WhatsApp checkout.",
};

export default async function BuyLaptopsInRwandaPage() {
  // Fetch first page of products for SEO
  const firstPage = await fetchQuery(
    api.product.getProductsWithImagePaginated,
    { paginationOpts: { numItems: 12 } }
  );

  const products: Doc<"products">[] = firstPage.page;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* SEO H1 */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Buy Laptops in Rwanda
      </h1>

      {/* SEO Intro */}
      <p className="text-gray-600 max-w-3xl mb-10">
        Looking to buy a laptop in Rwanda? EasyFix Tech offers affordable new and
        used laptops in Kigali including Dell, HP, Lenovo, and gaming laptops.
        All devices are tested, verified, and available with fast delivery and
        WhatsApp checkout.
      </p>

      {/* Trust signals */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 text-sm">
        <div className="bg-gray-50 p-4 rounded-lg">✅ Verified laptops</div>
        <div className="bg-gray-50 p-4 rounded-lg">🚚 Fast delivery in Kigali</div>
        <div className="bg-gray-50 p-4 rounded-lg">🔒 Secure & WhatsApp checkout</div>
        <div className="bg-gray-50 p-4 rounded-lg">♻️ New & used options</div>
      </div>

      {/* Product grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Available Laptops for Sale
        </h2>
      </section>

      {/* Client-side infinite scroll for remaining pages */}
      <ProductsInfinite initialPage={firstPage} />

      {/* SEO Footer Content */}
      <section className="mt-16 max-w-3xl text-gray-600 text-sm leading-7">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Why Buy Laptops from EasyFix Tech?
        </h3>
        <p>
          We help customers across Rwanda find reliable laptops for work,
          school, business, and gaming. Whether you need a budget laptop or a
          high-performance machine, EasyFix Tech connects you with trusted local
          sellers and transparent pricing.
        </p>
      </section>
    </main>
  );
}
