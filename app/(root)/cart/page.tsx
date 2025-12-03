"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

const CartPage = () => {
  const session = useSession()
  const user = useQuery(api.users.getUserByEmail, session.data ? {
    email:session.data.user.email ?? ''
  }:'skip')
  const cartItems = useQuery(api.cart.get, user?._id ? { userId: user._id as any } : "skip");
  const removeCartItem = useMutation(api.cart.remove);
  const updateCartItemQuantity = useMutation(api.cart.updateQuantity);

  const handleRemoveFromCart = async (productId: Doc<"products">["_id"]) => {
    if (!user) return;
    await removeCartItem({ productId, userId: user._id as any });
  };

  const handleUpdateQuantity = async (cartId: Id<"cart">, quantity: number) => {
    if (!user) return;
    if (quantity < 1) return;
    await updateCartItemQuantity({ cartId, quantity });
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your cart</h2>
        <Link href="/login">
          <Button>Log In</Button>
        </Link>
      </div>
    );
  }

  if (!cartItems) {
    return <div>Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <ShoppingCart className="w-24 h-24 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Add some products to your cart to see them here.</p>
        <Link href="/">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item?.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.product._id} className="flex items-center p-4">
              <Link href={`/product/${item.product._id}`}>
                <div className="relative w-24 h-24 mr-4">
                  <Image
                    src={item.product.imageUrls?.[0] || "/placeholder.png"}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </Link>
              <div className="flex-grow">
                <Link href={`/product/${item.product._id}`}>
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                </Link>
                <p className="text-gray-600">{item.product.price.toLocaleString()} RWF</p>
                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveFromCart(item.product._id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="p-4">
            <CardTitle className="mb-4">Order Summary</CardTitle>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{totalAmount.toLocaleString()} RWF</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>{totalAmount.toLocaleString()} RWF</span>
            </div>
            <Button className="w-full">Proceed to Checkout</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;