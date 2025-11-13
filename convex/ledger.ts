import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new ledger income entry
export const createLedgerIncome = mutation({
  args: {
    totalAmount: v.number(),
    date: v.number(),
    invoiceId: v.union(v.id("invoice"), v.id("product"), v.id("facture")),
  },
  handler: async (ctx, args) => {
    const newLedgerIncome = await ctx.db.insert("ledgerIncome", {
      totalAmount: args.totalAmount,
      date: args.date,
      invoiceId: args.invoiceId,
    });
    return newLedgerIncome;
  },
});

// Get a single ledger income entry by ID
export const getLedgerIncome = query({
  args: {
    id: v.id("ledgerIncome"),
  },
  handler: async (ctx, args) => {
    const ledgerIncome = await ctx.db.get(args.id);
    return ledgerIncome;
  },
});

// List all ledger income entries
export const listLedgerIncome = query({
  args: {},
  handler: async (ctx) => {
    const ledgerIncome = await ctx.db.query("ledgerIncome").collect();
    return ledgerIncome;
  },
});

// Update an existing ledger income entry
export const updateLedgerIncome = mutation({
  args: {
    id: v.id("ledgerIncome"),
    totalAmount: v.optional(v.number()),
    date: v.optional(v.number()),
    invoiceId: v.optional(v.union(v.id("invoice"), v.id("product"), v.id("facture"))),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const updatedLedgerIncome = await ctx.db.patch(id, rest);
    return updatedLedgerIncome;
  },
});

// Delete a ledger income entry
export const deleteLedgerIncome = mutation({
  args: {
    id: v.id("ledgerIncome"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});