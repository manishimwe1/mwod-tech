import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateRicaForm = mutation({
  args: {
    ricaFormId: v.id("ricaForm"),
    clientName: v.optional(v.string()),
    clientPhone: v.optional(v.string()),
    clientId: v.optional(v.string()),
    province: v.optional(v.string()),
    district: v.optional(v.string()),
    sector: v.optional(v.string()),
    cell: v.optional(v.string()),
    updatedAt: v.optional(v.number()),
    date: v.optional(v.number()),
  },
  handler: async (ctx, { ricaFormId, ...rest }) => {
    return await ctx.db.patch(ricaFormId, rest);
  },
});

export const deleteRicaForm = mutation({
  args: {
    ricaFormId: v.id("ricaForm"),
  },
  handler: async (ctx, { ricaFormId }) => {
    await ctx.db.delete(ricaFormId);
  },
});

export const listRicaForms = query({
  handler: async (ctx) => {
    return await ctx.db.query("ricaForm").collect();
  },
});

export const getRicaForm = query({
  args: {
    ricaFormId: v.id("ricaForm"),
  },
  handler: async (ctx, { ricaFormId }) => {
    return await ctx.db.get(ricaFormId);
  },
});

export const createRicaForm = mutation({
  args: {
    clientName: v.string(),
    clientPhone: v.optional(v.string()),
    clientId: v.optional(v.string()),
    province: v.optional(v.string()),
    district: v.optional(v.string()),
    sector: v.optional(v.string()),
    cell: v.optional(v.string()),
    updatedAt: v.number(),
    date: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("ricaForm", args);
  },
});