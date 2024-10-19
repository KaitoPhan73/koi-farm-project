"use client";
import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { TProductResponse } from "@/schema/product.schema";
import { RowAction } from "./row-action";
import { formatPriceVND, formattedDateTime } from "@/lib/formatter";

export const productColumns: CustomColumnDef<TProductResponse>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => (
      <div
        className="w-36 truncate cursor-pointer"
        title={row.getValue("name")}
      >
        {row.getValue("name")}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "category.name", // Assuming category has a name field
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="w-36 truncate" title={row.getValue("category.name")}>
        {row.getValue("category.name") || "No category provided"}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age (Years)" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("age") !== undefined ? row.getValue("age") : "N/A"}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>{formatPriceVND(row.getValue("price"))}</div>,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("status") || "No status provided"}</div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div>{formattedDateTime(row.getValue("createdAt"))}</div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => (
      <div>{formattedDateTime(row.getValue("updatedAt"))}</div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowAction row={row} />,
  },
];
