"use client";
import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { TUserResponse } from "@/schema/user.schema";
import { RowAction } from "./row-action";
import { formattedDateTime } from "@/lib/formatter";
import { Badge } from "@/components/ui/badge";

export const userColumns: CustomColumnDef<TUserResponse>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <div className="w-32 truncate" title={row.getValue("username")}>
        {row.getValue("username")}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => (
      <div className="w-36 truncate" title={row.getValue("fullName")}>
        {row.getValue("fullName")}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-40 truncate" title={row.getValue("email")}>
        {row.getValue("email")}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => (
      <div className="w-28 truncate" title={row.getValue("phone")}>
        {row.getValue("phone")}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => (
      <div className="w-40 truncate" title={row.getValue("address")}>
        {row.getValue("address")}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge
          variant={
            role === "Admin"
              ? "destructive"
              : role === "Manager"
              ? "default"
              : role === "Staff"
              ? "secondary"
              : "outline"
          }
        >
          {role || "Customer"}
        </Badge>
      );
    },
    enableSorting: true,
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
            status === "Active"
              ? "default"
              : status === "Inactive"
              ? "secondary"
              : "destructive"
          }
        >
          {status || "Active"}
        </Badge>
      );
    },
    enableSorting: true,
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
    enableSorting: true,
    enableColumnFilter: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowAction row={row} />,
  },
];
