"use server";
import { getAllProducts } from "@/apis/product";
import ProductIndex from "./_components";
import { productColumns } from "./_components/column";

export default async function ProductsPage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };

  const response = await getAllProducts(params);
  console.log(response.payload.items[0]);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <ProductIndex
          columns={productColumns}
          payload={response.payload}
          params={params}
        />
      </div>
    </>
  );
}
