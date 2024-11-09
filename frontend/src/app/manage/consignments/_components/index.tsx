"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { CustomColumnDef } from "@/types/Colunm";
import { TTableResponse } from "@/types/Table";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Overview } from "@/components/overview";

interface DataTableProps<TData, TValue> {
  columns: CustomColumnDef<TData, TValue>[];
  payload: TTableResponse<TData>;
  params: {
    page: number;
    limit: number;
  };
}

const ConsignmentIndex = <TData, TValue>({
  columns,
  payload,
  params,
}: DataTableProps<TData, TValue>) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex h-full flex-1 flex-col space-y-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Consignment Management
            </h2>
            <p className="text-muted-foreground">
              Manage your product consignments and inventory here
            </p>
          </div>
          {/* <div className="flex items-center space-x-2">
            <Button
              variant="default"
              onClick={() => router.push("/manage/consignments/create")}
            >
              Add New Consignment
            </Button>
          </div> */}
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Consignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{payload.total}</div>
            </CardContent>
          </Card>
          {/* Add more summary cards as needed */}
        </div>

        {/* Chart if needed */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          {/* <CardContent className="pl-2">
            <Overview />
          </CardContent> */}
        </Card>

        {/* Data Table */}
        <DataTable
          payload={{
            ...payload,
            page: params.page,
            limit: params.limit,
          }}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default ConsignmentIndex;
