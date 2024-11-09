"use client";

import React from "react";
import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { TOrderResponse } from "@/schema/order.schema";
import { RowAction } from "./row-action";
import { formattedDateTime } from "@/lib/formatter";
import { FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => {
      const [open, setOpen] = React.useState(false);
      const items = row.getValue("items") as string[];

      return (
        <>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <FaEye className="h-4 w-4" />
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Items</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {items?.map((item, index) => (
                  <div key={index} className="p-2 border rounded-md">
                    {item}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(row.getValue("totalAmount") || 0)}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "Completed"
              ? "default"
              : status === "Processing"
              ? "secondary"
              : status === "Shipped"
              ? "outline"
              : status === "Cancelled"
              ? "destructive"
              : "default"
          }
        >
          {status || "Pending"}
        </Badge>
      );
    },
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
    cell: ({ row }) => <RowAction row={row} />,
  },
];
