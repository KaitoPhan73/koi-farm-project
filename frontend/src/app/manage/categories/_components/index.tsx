"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { CustomColumnDef } from "@/types/Colunm";
import { TTableResponse } from "@/types/Table";
import { useRouter } from "next/navigation";
import { DialogCreateCategory } from "./dialog-create-category";

interface DataTableProps<TData, TValue> {
  columns: CustomColumnDef<TData, TValue>[];
  payload: TTableResponse<TData>;
  params: {
    page: number;
    limit: number;
  };
}

const CategoryIndex = <TData, TValue>({
  columns,
  payload,
  params,
}: DataTableProps<TData, TValue>) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex h-full flex-1 flex-col">
        {/* <CardReports data={response.payload} /> */}

        <div className="flex items-center justify-between">
          <p className="text-3xl">Quản Lí Phân Loại</p>

          <DialogCreateCategory className="mb-3" />
        </div>
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

export default CategoryIndex;
