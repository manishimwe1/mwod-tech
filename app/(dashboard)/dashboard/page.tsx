import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import SalesDataTable from "@/components/SalesDataTable";

export default async function Page() {
  const sales = await fetchQuery(api.sales.getAllSales, {});
  // console.log(sales);
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 ">
          {/* <SectionCards /> */}

          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Sales Management</h1>
            {sales ? <SalesDataTable data={sales} /> : <p>Loading sales...</p>}
          </div>
        </div>
        <div className="px-4 lg:px-6 mt-10">
          <ChartAreaInteractive />
        </div>
      </div>
    </div>
  );
}
