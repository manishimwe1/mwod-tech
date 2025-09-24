import React from "react";
import AddNewItemBtn from "../../_components/AddNewItemBtn";

const page = () => {
  return (
    <div className="flex flex-col items-start w-full h-full p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Facture Invoices</h1>
        <AddNewItemBtn title="Add Facture" />
      </div>
    </div>
  );
};

export default page;
