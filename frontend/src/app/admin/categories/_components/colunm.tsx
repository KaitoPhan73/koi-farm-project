import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { CustomColumnDef } from "@/types/Colunm";
import { TCategoryResponse } from "@/schema/category.schema";
import { RowAction } from "./row-action";

export const categoryColumns: CustomColumnDef<TCategoryResponse>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Name" />
    ),
    cell: ({ row }) => (
      <div
        className="w-36 truncate cursor-pointer"
        title={row.getValue("name")}
      >
        {row.getValue("name")}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="w-48 truncate" title={row.getValue("description")}>
        {row.getValue("description") || "No description provided"}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue("createdAt")).toLocaleDateString()}{" "}
        {/* Format date */}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    id: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue("updatedAt")).toLocaleDateString()}{" "}
        {/* Format date */}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowAction row={row} />,
  },
];
