"use server";
import CategoryIndex from "./_components";
import { categoryColumns } from "./_components/colunm";
import { getAllCategories } from "@/apis/category";

export default async function ProductsPage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };

  const response = await getAllCategories(params);
  console.log(response.payload.items);
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
