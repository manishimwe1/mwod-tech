"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";

const SaledProductModal = ({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Doc<"products">;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(product.price);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const sellProduct = useMutation(api.product.sellProduct);
  const createSale = useMutation(api.sales.createSale);
  const createLedger = useMutation(api.ledger.createLedgerIncome);

  const totalAmount = useMemo(() => {
    return Math.max(quantity * discount, 0);
  }, [quantity, unitPrice, discount]);

  const handleConfirmSale = async () => {
    if (quantity <= 0 || quantity > product.stock) return;

    try {
      setLoading(true);

      await sellProduct({
        productId: product._id,
        quantity,
      });

      const saleId = await createSale({
        productId: product._id,
        quantity,
        unitPrice,
        discount,
        totalAmount,
        date: Date.now(),
      });

      await createLedger({
        date: Date.now(),
        referenceId: saleId,
        totalAmount,
      });

      onClose();
    } catch (err) {
      console.error(err);
      alert("Sale failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sell Product</DialogTitle>
          <DialogDescription>
            Record a sale with price override or discount
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm">
            <p className="font-semibold line-clamp-2">{product.name}</p>
            <div className="flex items-center justify-between mt-4">
              <p className="text-muted-foreground">
                Stock available: <b>{product.stock}</b>
              </p>
              <div className="bg-blue-500  p-2 rounded-sm">
                <p className="text-white">
                  Base price: <b>{product.price.toLocaleString()} Rwf</b>
                </p>
              </div>
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium mb-1">Quantity</Label>
            <Input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Quantity"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-1">Selling price per unit</Label>
            <Input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              placeholder="Selling price per unit"
              disabled
            />
          </div>

          <div>
            <Label className="block text-sm font-medium mb-1">Selled Price</Label>
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              placeholder="Discount"
            />
          </div>

          <div className="rounded-md bg-muted p-3 text-sm">
            <p>
              Total:{" "}
              <span className="font-bold">{totalAmount.toLocaleString()}</span>
            </p>
          </div>

          <Button
            className="w-full cursor-pointer"
            disabled={loading || quantity > product.stock}
            onClick={handleConfirmSale}
          >
            {loading ? "Processing..." : "Confirm Sale"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaledProductModal;
