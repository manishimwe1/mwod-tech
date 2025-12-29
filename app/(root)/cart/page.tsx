"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Package,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

const CartPage = () => {
  const session = useSession();
  const user = useQuery(
    api.users.getUserByEmail,
    session.data ? { email: session.data.user.email ?? "" } : "skip"
  );
  const cartItems = useQuery(
    api.cart.get,
    user?._id ? { userId: user._id as any } : "skip"
  );
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

  if (!session) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sign in to continue
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to view your cart and complete your purchase
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Log In
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!cartItems) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Discover amazing products and add them to your cart
          </p>
          <Link href="/">
            <Button
              size="lg"
              className="shopping-btn"
            >
              Start Shopping
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item?.price ?? 0) * (item?.quantity ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card
                key={item?._id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link
                      href={`/product/${item?._id}`}
                      className="flex-shrink-0"
                    >
                      <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-100 group">
                        <Image
                          src={item?.imageUrls?.[0] || "/placeholder.png"}
                          alt={item?.name || "Product"}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <Link href={`/product/${item?._id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                          {item?.name || "Product"}
                        </h3>
                      </Link>
                      <p className="text-2xl font-bold text-blue-600 mb-4">
                        {(item?.price ?? 0).toLocaleString()} RWF
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 rounded-md hover:bg-white"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.cartId as Id<"cart">,
                                (item?.quantity ?? 0) - 1
                              )
                            }
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">
                            {item?.quantity ?? 0}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 rounded-md hover:bg-white"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.cartId as Id<"cart">,
                                (item?.quantity ?? 0) + 1
                              )
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex-grow"></div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() =>
                            handleRemoveFromCart(item?._id as Id<"products">)
                          }
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="p-6">
                  <CardTitle className=" text-2xl">
                    Order Summary
                  </CardTitle>
                </div>
                <CardContent className="p-6 space-y-4">
                  {/* Summary Items */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        {totalAmount.toLocaleString()} RWF
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-700">
                      <span>Tax</span>
                      <span className="font-semibold">
                        Calculated at checkout
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {totalAmount.toLocaleString()} RWF
                      </span>
                    </div>

                    {/* <Button className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button> */}

                    <Button
                      // size="lg"
                      variant="secondary"
                      className="flex-1 text-base w-full cursor-pointer h-12 bg-green-600 text-white hover:bg-green-700"
                      onClick={() => {
                        
                        const whatsappUrl = `https://wa.me/250783805516`;
                        window.open(whatsappUrl, "_blank");
                      }}
                    >
                      {/* <MessageCircle className="w-5 h-5 mr-2" /> */}
                      Proceed to Checkout
                    </Button>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Package className="w-5 h-5 text-green-600" />
                      <span>Free shipping on all orders</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                      <span>Secure checkout guaranteed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Continue Shopping Link */}
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full mt-4 hover:bg-gray-100"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
