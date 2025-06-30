import React from "react";
import { getProductBySlug, getSimilarProducts } from "@/sanity/getData";
import { BlockContent } from "@/components/BlockContent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const decodedSlug = decodeURIComponent(params.slug);
  const product = await getProductBySlug(decodedSlug);

  console.log(product, "product");
  const similar = await getSimilarProducts(product?.title as string,product?._id as string)
  return (
    <div className="px-10 p-4 space-y-4">
      {/* Breadcrumb */}
      <nav className="text-gray-500 text-sm">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {/* <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem> */}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{decodedSlug}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full overflow-x-hidden">
          <BlockContent
            content={product?.body}
            title={product?.title ?? ""}
            description={product?.description ?? ""}
            price={product?.price ?? 0}
            similar={similar}
          />
        </div>
        
      </div>
    </div>
  );
}
