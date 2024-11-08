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
import { FaEye, FaLock, FaLockOpen, FaBan } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { TUserResponse } from "@/schema/user.schema";
import { toast } from "sonner";
import { updateUserStatus } from "@/apis/user";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function RowAction<TData extends TUserResponse>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDetail = () => {
    router.push(`/manage/users/${row.original._id}`);
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!row.original._id) return;

    try {
      setIsLoading(true);
      await updateUserStatus(row.original._id, newStatus);

      const statusMessages = {
        Active: "activated",
        Inactive: "deactivated",
        Banned: "banned",
      };

      toast.success(
        `User ${
          statusMessages[newStatus as keyof typeof statusMessages]
        } successfully`
      );

      router.refresh();
    } catch (error) {
      toast.error("Failed to update user status");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <FaLock className="h-4 w-4" />;
      case "Inactive":
        return <FaLockOpen className="h-4 w-4" />;
      case "Banned":
        return <FaBan className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          disabled={isLoading}
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="group" onClick={handleViewDetail}>
          View Details
          <DropdownMenuShortcut>
            <span className="group-hover:hidden">
              <TbEyeClosed className="h-4 w-4" />
            </span>
            <span className="hidden group-hover:inline">
              <FaEye className="h-4 w-4" />
            </span>
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {row.original.role !== "Manager" && (
          <>
            {row.original.status !== "Active" && (
              <DropdownMenuItem
                className="group"
                onClick={() => handleUpdateStatus("Active")}
                disabled={isLoading}
              >
                Activate
                <DropdownMenuShortcut>
                  <FaLockOpen className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}

            {row.original.status !== "Inactive" && (
              <DropdownMenuItem
                className="group"
                onClick={() => handleUpdateStatus("Inactive")}
                disabled={isLoading}
              >
                Deactivate
                <DropdownMenuShortcut>
                  <FaLock className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}

            {row.original.status !== "Banned" && (
              <DropdownMenuItem
                className="group text-destructive focus:text-destructive"
                onClick={() => handleUpdateStatus("Banned")}
                disabled={isLoading}
              >
                Ban User
                <DropdownMenuShortcut>
                  <FaBan className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
