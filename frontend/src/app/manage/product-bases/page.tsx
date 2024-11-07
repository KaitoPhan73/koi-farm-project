"use server";
import { getAllProductBases } from "@/apis/product-base";
import ProductBaseIndex from "./_components";
import { productBaseColumns } from "./_components/column";

export default async function ProductBasesPage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };

  const response = await getAllProductBases(params);

  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <ProductBaseIndex
          columns={productBaseColumns}
          payload={response.payload}
          params={params}
        />
      </div>
    </>
  );
}
