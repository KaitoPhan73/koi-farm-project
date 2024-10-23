"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Adjust the path as necessary
import { DataTable } from "@/components/table/data-table"; // Adjust the path as necessary
import { CustomColumnDef } from "@/types/Colunm"; // Adjust the path as necessary
import { TTableResponse } from "@/types/Table"; // Adjust the path as necessary
import { useRouter } from "next/navigation";

interface FeedbackIndexProps<TData, TValue> {
  columns: CustomColumnDef<TData, TValue>[];
  payload: TTableResponse<TData>;
  params: {
    page: number;
    limit: number;
  };
}

const FeedbackIndex = <TData, TValue>({
  columns,
  payload,
  params,
}: FeedbackIndexProps<TData, TValue>) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-3xl">Feedback Management</p>

        <Button
          variant="default"
          className="mb-3"
          onClick={() => router.push("/admin/feedbacks/create")}
        >
          Create Feedback
        </Button>
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
  );
};

export default FeedbackIndex;
