"use server";
import { orderColumns } from "./_components/column";
import OrderIndex from "./_components";
import { getAllOrders } from "@/apis/order";

export default async function OrdersPage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };

  const response = await getAllOrders(params);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <OrderIndex
          columns={orderColumns}
          payload={response.payload}
          params={params}
        />
      </div>
    </>
  );
}
