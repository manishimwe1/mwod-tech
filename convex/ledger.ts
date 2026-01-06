import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new ledger income entry
export const createLedgerIncome = mutation({
  args: {
    date: v.number(),
    referenceId: v.id("sales"),
    totalAmount: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("ledgerIncome", {
      ...args,
      type: "income",
    });
  },
});

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

export const totalRevenue = query({
  args: {},
  handler: async (ctx) => {
    const ledgerIncome = await ctx.db.query("ledgerIncome").collect();
    const total = ledgerIncome.reduce((sum, entry) => sum + entry.totalAmount, 0);
    return total;
  },
});

// Update an existing ledger income entry
export const updateLedgerIncome = mutation({
  args: {
    id: v.id("ledgerIncome"),
    totalAmount: v.optional(v.number()),
    date: v.optional(v.number()),
    referenceId: v.optional(v.id("sales")),
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

export const getTotalRevenueByDateRange = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const ledgerIncome = await ctx.db
      .query("ledgerIncome")
      .filter((q) =>
        q.and(
          q.gte(q.field("date"), args.startDate),
          q.lte(q.field("date"), args.endDate),
        ),
      )
      .collect();
    const total = ledgerIncome.reduce((sum, entry) => sum + entry.totalAmount, 0);
    return total;
  },
});
