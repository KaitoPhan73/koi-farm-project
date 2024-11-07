"use client";
import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { TProductResponse } from "@/schema/product.schema";
import { RowAction } from "./row-action";
import { formatPriceVND, formattedDateTime } from "@/lib/formatter";

export const productColumns: CustomColumnDef<TProductResponse>[] = [
  {
    accessorKey: "productBase.name",
    id: "productBaseName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => (
      <div
        className="w-36 truncate cursor-pointer"
        title={row.getValue("productBaseName")}
      >
        {row.getValue("productBaseName")}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "productBase.breed",
    id: "breed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Breed" />
    ),
    cell: ({ row }) => (
      <div className="w-36 truncate" title={row.getValue("breed")}>
        {row.getValue("breed") || "N/A"}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "productBase.category.name",
    id: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="w-36 truncate" title={row.getValue("categoryName")}>
        {row.getValue("categoryName") || "N/A"}
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
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size (cm)" />
    ),
    cell: ({ row }) => <div>{row.getValue("size")} cm</div>,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowAction row={row} />,
  },
];
