"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { TConsignmentResponse } from "@/schema/consignment.schema";
import { RowAction } from "./row-action";

export const columns: ColumnDef<TConsignmentResponse>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate" title={row.getValue("address")}>
        {row.getValue("address")}
      </div>
    ),
  },
  {
    accessorKey: "koiType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Koi Type" />
    ),
  },
  {
    accessorKey: "selectedMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Selected Method" />
    ),
  },
  //   {
  //     accessorKey: "comments",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Comments" />
  //     ),
  //     cell: ({ row }) => (
  //       <div className="max-w-[200px] truncate" title={row.getValue("comments")}>
  //         {row.getValue("comments") || "N/A"}
  //       </div>
  //     ),
  //   },
  //   {
  //     accessorKey: "user",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="User" />
  //     ),
  //     cell: ({ row }) => {
  //       const user = row.getValue("user") as { username: string } | undefined;
  //       return user?.username || "N/A";
  //     },
  //   },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => <RowAction row={row} />,
  //   },
];
