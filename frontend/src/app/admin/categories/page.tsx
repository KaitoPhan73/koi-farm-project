"use server";

import { DataTable } from "@/components/table/data-table";

import { cookies } from "next/headers";

import CategoryIndex from "./_components";
import { categoryColumns } from "./_components/colunm";
import { getAllCategories } from "@/apies/category";

export default async function ProductsPage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };

  const response = await getAllCategories(params);

  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <CategoryIndex
          columns={categoryColumns}
          payload={response.payload}
          params={params}
        />
      </div>
    </>
  );
}
