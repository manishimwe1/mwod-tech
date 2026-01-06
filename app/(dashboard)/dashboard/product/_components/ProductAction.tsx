import { Doc } from "@/convex/_generated/dataModel";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteProductModel from "./DeleteProductModel";
import { EditProductModel } from "./EditProductModel";
import SaledProductModel from "./SaledProductModel";

const ProductAction = ({ product }: { product: Doc<"products"> }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [saledProduct, setSaledProduct] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer hover:bg-stone-200  dark:hover:bg-stone-800 rounded-md p-1 focus:outline-none">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Product</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setSaledProduct(true)}
          >
            Saled
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenEdit(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Draft</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openDelete && (
        <DeleteProductModel
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          product={product}
        />
      )}

      {openEdit && (
        <EditProductModel
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          product={product}
        />
      )}

      {saledProduct && (
        <SaledProductModel
          isOpen={saledProduct}
          onClose={() => setSaledProduct(false)}
          product={product}
        />
      )}
    </>
  );
};

export default ProductAction;
