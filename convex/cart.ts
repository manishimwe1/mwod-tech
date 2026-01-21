import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const add = mutation({
  args: {
    productId: v.id("products"),
    userId: v.optional(v.id("user")),
    anonymousId: v.optional(v.string()),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    // Validate that either userId or anonymousId is provided
    if (!args.userId && !args.anonymousId) {
      throw new Error("Either userId or anonymousId must be provided");
    }

    let existingCartItem;
    if (args.userId) {
      existingCartItem = await ctx.db
        .query("cart")
        .withIndex("by_userId_productId", (q) =>
          q.eq("userId", args.userId).eq("productId", args.productId)
        )
        .first();
    } else {
      existingCartItem = await ctx.db
        .query("cart")
        .withIndex("by_anonymousId_productId", (q) =>
          q.eq("anonymousId", args.anonymousId!).eq("productId", args.productId)
        )
        .first();
    }

    if (existingCartItem) {
      await ctx.db.patch(existingCartItem._id, {
        quantity: existingCartItem.quantity + args.quantity,
      });
      return existingCartItem._id;
    } else {
      const cartId = await ctx.db.insert("cart", {
        productId: args.productId,
        userId: args.userId,
        anonymousId: args.anonymousId,
        quantity: args.quantity,
      });
      return cartId;
    }
  },
});

export const remove = mutation({
  args: {
    productId: v.id("products"),
    userId: v.optional(v.id("user")),
    anonymousId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate that either userId or anonymousId is provided
    if (!args.userId && !args.anonymousId) {
      throw new Error("Either userId or anonymousId must be provided");
    }

    let existingCartItem;
    if (args.userId) {
      existingCartItem = await ctx.db
        .query("cart")
        .withIndex("by_userId_productId", (q) =>
          q.eq("userId", args.userId).eq("productId", args.productId)
        )
        .first();
    } else {
      existingCartItem = await ctx.db
        .query("cart")
        .withIndex("by_anonymousId_productId", (q) =>
          q.eq("anonymousId", args.anonymousId!).eq("productId", args.productId)
        )
        .first();
    }

    if (existingCartItem) {
      await ctx.db.delete(existingCartItem._id);
      return true;
    }
    return false;
  },
});

export const updateQuantity = mutation({
  args: {
    cartId: v.id("cart"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.cartId, {
      quantity: args.quantity,
    });
  },
});

export const get = query({
  args: {
    userId: v.optional(v.id("user")),
    anonymousId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate that either userId or anonymousId is provided
    if (!args.userId && !args.anonymousId) {
      throw new Error("Either userId or anonymousId must be provided");
    }

    let cartItems;
    if (args.userId) {
      cartItems = await ctx.db
        .query("cart")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .collect();
    } else {
      cartItems = await ctx.db
        .query("cart")
        .withIndex("by_anonymousId", (q) => q.eq("anonymousId", args.anonymousId!))
        .collect();
    }

    const productsInCart = await Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        if (!product) return null;

        return {
          ...product,
          quantity: item.quantity,
          cartId: item._id,
          ...(Array.isArray(product.images) && product.images.length > 0
            ? {
                imageUrls: await Promise.all(
                  product.images.map((imageId) => ctx.storage.getUrl(imageId))
                ),
              }
            : {}),
        };
      })
    );

    return productsInCart.filter(Boolean);
  },
});