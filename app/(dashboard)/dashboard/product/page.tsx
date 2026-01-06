
import { api } from "@/convex/_generated/api";
import React from "react";
import ProductTable from "@/app/(dashboard)/dashboard/product/_components/ProductTable";
import { fetchQuery } from "convex/nextjs";

const ProductDashboardPage = async() => {
  const products = await fetchQuery(
    api.product.getProductsWithImagePaginated,
    { paginationOpts: { numItems: 10 } }
  );

  return (
    <div className="container mx-auto  px-4 flex items-start justify-center flex-col">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>
      {products ? (
        <ProductTable products={products} />
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default ProductDashboardPage;
