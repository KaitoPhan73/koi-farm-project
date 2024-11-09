"use server";
import ConsignmentIndex from "./_components";
import { columns } from "./_components/columns";
import { getAllConsignments } from "@/apis/consignment";

export default async function ProductsPage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };

  const response = await getAllConsignments(params);
  console.log(response.payload.items);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <ConsignmentIndex
          columns={columns}
          payload={response.payload}
          params={params}
        />
      </div>
    </>
  );
}
