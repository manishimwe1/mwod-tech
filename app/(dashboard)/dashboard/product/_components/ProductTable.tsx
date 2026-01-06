'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductAction from "./ProductAction";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type Props = {
  products: {
    page: Doc<"products">[];
    continueCursor: any;
    isDone: boolean;
  };
};

const ITEMS_PER_PAGE = 10;

const ProductTable = ({ products }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { results, status, loadMore } = usePaginatedQuery(
    api.product.getProductsWithImagePaginated,
    {
      paginationOpts: { numItems: ITEMS_PER_PAGE },
    },
    { initialNumItems: products.page.length }
  );

  // Calculate pagination info
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = results.slice(startIndex, endIndex);
  const isLoadingMore = status === "LoadingMore";

  // Auto-load more if we're near the end
  useEffect(() => {
    if (currentPage === totalPages && status === "CanLoadMore") {
      loadMore(ITEMS_PER_PAGE);
    }
  }, [currentPage, totalPages, status, loadMore]);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="w-full space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentProducts?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                {product.imageUrls && product.imageUrls.length > 0 ? (
                  <Image
                    src={product.imageUrls[0] ?? ''}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="w-[60px] h-[60px] bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
                    No Image
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium text-ellipsis whitespace-nowrap overflow-hidden max-w-[200px]">
                {product.name}
              </TableCell>
              <TableCell className="text-ellipsis whitespace-nowrap overflow-hidden max-w-[200px]">
                {product.category}
              </TableCell>
              <TableCell>{product.price.toLocaleString()} Rwf</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge
                  variant={product.status === "active" ? "default" : "secondary"}
                >
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <ProductAction product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, results.length)} of {results.length} products
          {status === "CanLoadMore" && " (loading more...)"}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToFirstPage}
            disabled={currentPage === 1 || isLoadingMore}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevPage}
            disabled={currentPage === 1 || isLoadingMore}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages || 1}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={currentPage === totalPages || isLoadingMore}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToLastPage}
            disabled={currentPage === totalPages || isLoadingMore}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;