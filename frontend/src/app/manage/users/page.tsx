"use server";
import { userColumns } from "./_components/column";
import { getAllUsers } from "@/apis/user";
import { useRouter } from "next/navigation";
import UserIndex from "./_components";

export default async function ProductsPage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };

  const response = await getAllUsers(params);
  console.log(response);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <UserIndex
          columns={userColumns}
          payload={response.payload}
          params={params}
        />
      </div>
    </>
  );
}
