import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import { Skeleton } from "./ui/skeleton";

const ShowNameOfProduct = ({ productId }: { productId: Id<"products"> }) => {
  const getProductById = useQuery(api.product.getProductById, {
    id: productId,
  });
  return (
    <div className="font-mono text-xs">
{getProductById ? `${getProductById.name.slice(0, 20)}${getProductById.name.length > 10 ? "..." : ""}` : <Skeleton className="w-20 h-4" />}
    </div>
  );
};

export default ShowNameOfProduct;
