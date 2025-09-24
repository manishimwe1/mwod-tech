// ./convex/functions/invoice.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// CREATE INVOICE
export const createFacture = mutation({
  args: {
    clientName: v.string(),
    factureInvoice: v.optional(v.number()),
    items: v.array(
      v.object({
        description: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
        totalPrice: v.number(),
      })
    ),
    status: v.union(v.literal("draft"), v.literal("sent"), v.literal("paid")),
    totalAmount: v.number(),
    updatedAt: v.number(),
    date: v.number(),

  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("facture", args);
  },
});

// GET ALL INVOICES
export const getFactures = query({
  handler: async (ctx) => {
    return await ctx.db.query("facture").order( "desc").collect();
  },
});

// GET SINGLE INVOICE BY ID
export const getFacture = query({
  args: {
    id: v.id("invoice"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// UPDATE INVOICE
export const updateFacture = mutation({
  args: {
    id: v.id("invoice"),
    clientName: v.optional(v.string()),
    factureInvoice: v.optional(v.number()),
    items: v.optional(
      v.array(
        v.object({
          description: v.string(),
          quantity: v.number(),
          unitPrice: v.number(),
          totalPrice: v.number(),
        })
      )
    ),
    status: v.optional(v.union(v.literal("draft"), v.literal("sent"), v.literal("paid"))),
    totalAmount: v.optional(v.number()),
    updatedAt: v.number(),
    date: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    return await ctx.db.patch(id, updateData);
  },
});

// DELETE INVOICE
export const deleteInvoice = mutation({
  args: {
    id: v.id("invoice"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
