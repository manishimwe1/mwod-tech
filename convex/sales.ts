import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createSale = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
    unitPrice: v.number(),
    discount: v.number(),
    totalAmount: v.number(),
    date: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sales", args);
  },
});

export const getAllSales = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sales").order("desc").collect();
  },
});
