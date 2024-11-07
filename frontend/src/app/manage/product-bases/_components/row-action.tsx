"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { FaDeleteLeft } from "react-icons/fa6";
import { TProductBaseResponse } from "@/schema/product-base.schema";
import { deleteProductBase } from "@/apis/product-base";
import { useToast } from "@/hooks/use-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function RowAction<TData extends TProductBaseResponse>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { toast } = useToast();
  const router = useRouter();
  const handleViewDetail = () => {
    router.push(`/admin/product-bases/${row.original._id}`);
  };
  const handleDelete = async () => {
    try {
      const response = await deleteProductBase(row.original._id);
      toast({
        title: "Delete Success",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete product base: ${error}`,
      });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="group" onClick={handleViewDetail}>
          View
          <DropdownMenuShortcut>
            <span className="group-hover:hidden">
              <TbEyeClosed className=" h-4 w-4" />
            </span>
            <span className="hidden group-hover:inline">
              <FaEye className=" h-4 w-4 " />
            </span>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Remove
          <DropdownMenuShortcut>
            <FaDeleteLeft className=" h-4 w-4 " />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}