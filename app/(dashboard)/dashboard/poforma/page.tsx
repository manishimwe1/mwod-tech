"use client";

import React from "react";
import AddPoforma from "../../_components/AddPoforma";
import { ProformaInvoiceCard } from "../../_components/PerformaCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";

const PerformaPage = () => {
  const fetchedInvoices = useQuery(api.invoice.getInvoices);

  if (!fetchedInvoices)
    return (
      <div className="flex items-center justify-center flex-col h-screen w-full">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
        <span className="mt-2 text-lg text-gray-600">Loading Invoices...</span>
      </div>
    );
  return (
    <div className="flex flex-col items-center w-full p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Proforma Invoices</h1>
        <AddPoforma />
      </div>
      <div className="w-full max-w-6xl mx-auto">
        {fetchedInvoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg shadow-inner">
            <p className="text-xl text-gray-500">No proforma invoices yet!</p>
            <p className="text-md text-gray-400 mt-2">
              Start by adding a new proforma invoice.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fetchedInvoices.map((invoice) => (
              <ProformaInvoiceCard key={invoice._id} invoice={invoice} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformaPage;
