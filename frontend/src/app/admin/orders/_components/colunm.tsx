"use client";
import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { TOrderResponse } from "@/schema/order.schema";
import { RowAction } from "./row-action"; // Create a RowAction for orders as well
import { formattedDateTime } from "@/lib/formatter";

export const orderColumns: CustomColumnDef<TOrderResponse>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User ID" />
    ),
    cell: ({ row }) => (
      <div className="w-36 truncate" title={row.getValue("user")}>
        {row.getValue("user") || "N/A"}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  // {
  //   accessorKey: "items",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Items" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-36 truncate" title={row.getValue("items")?.join(", ")}>
  //       {row.getValue("items")?.join(", ") || "N/A"}
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableColumnFilter: false,
  // },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => <div>{row.getValue("totalAmount") || "N/A"}</div>,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue("status") || "N/A"}</div>,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => (
      <div>{formattedDateTime(row.getValue("orderDate")) || "N/A"}</div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowAction row={row} />, // Implement RowAction for orders
  },
];
