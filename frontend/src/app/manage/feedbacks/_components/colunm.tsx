"use client";
import { CustomColumnDef } from "@/types/Colunm"; // Adjust the path as necessary
import { TFeedbackResponse } from "@/schema/feedback.schema"; // Adjust the path as necessary
import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header"; // Adjust the path as necessary
import { RowAction } from "./row-action";

export const feedbackColumns: CustomColumnDef<TFeedbackResponse>[] = [
  {
    accessorKey: "customer.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("customer.name") || "N/A"}</div>,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "product.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("product.name") || "N/A"}</div>,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "feedback",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Feedback" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("feedback") || "No feedback provided"}</div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowAction row={row} />, // Implement RowAction component
  },
];
