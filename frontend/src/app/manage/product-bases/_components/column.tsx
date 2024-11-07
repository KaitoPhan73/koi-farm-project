"use client";
import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { TProductBaseResponse } from "@/schema/product-base.schema";
import { RowAction } from "./row-action";
import { formatPriceVND, formattedDateTime } from "@/lib/formatter";

export const productBaseColumns: CustomColumnDef<TProductBaseResponse>[] = [
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
    accessorKey: "breed",
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
    accessorKey: "category.name",
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
    accessorKey: "origin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Origin" />
    ),
    cell: ({ row }) => (
      <div className="w-36 truncate" title={row.getValue("origin")}>
        {row.getValue("origin") || "N/A"}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "personality",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Personality" />
    ),
    cell: ({ row }) => (
      <div className="w-36 truncate" title={row.getValue("personality")}>
        {row.getValue("personality") || "N/A"}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "basePrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Base Price" />
    ),
    cell: ({ row }) => <div>{formatPriceVND(row.getValue("basePrice"))}</div>,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "imageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div className="w-36 truncate">
        {row.getValue("imageUrl") ? (
          <img
            src={row.getValue("imageUrl")}
            alt="Product"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          "No image"
        )}
      </div>
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
