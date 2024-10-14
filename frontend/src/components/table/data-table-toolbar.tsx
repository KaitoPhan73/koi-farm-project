"use client";

import React, { useCallback } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { CustomColumnDef } from "@/types/Colunm";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = useCallback(
    (column: string, value: string) => {
      router.push(pathname + "?" + createQueryString(column, value));
    },
    [router, pathname, createQueryString]
  );

  const resetFilters = useCallback(() => {
    table.resetColumnFilters();
    router.push(pathname);
  }, [table, router, pathname]);

  const isFiltered = table.getState().columnFilters.length > 0;

  const columnTitles = table.getAllColumns().reduce((acc, column) => {
    const header = column.columnDef.header;
    if (typeof header === "function") {
      const renderedHeader = header({ column } as any);
      if (React.isValidElement(renderedHeader)) {
        acc[column.id] =
          (renderedHeader.props as { title?: string }).title || "ERROR HEADER";
      } else {
        acc[column.id] = "ERROR HEADER";
      }
    } else {
      acc[column.id] = header || "ERROR HEADER";
    }

    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getAllColumns().map((column) => {
          const columnDef = column.columnDef as CustomColumnDef<TData, unknown>;
          if (columnDef.enableColumnFilter === true) {
            const filterType = columnDef.meta?.filterType || "input";

            if (filterType === "input") {
              return (
                <Input
                  key={column.id}
                  placeholder={`Tìm Kiếm ${columnTitles[column.id]}...`}
                  value={(column.getFilterValue() as string) ?? ""}
                  onChange={(event) => {
                    column.setFilterValue(event.target.value);
                    handleSearch(column.id, event.target.value);
                  }}
                  className="h-8 w-[150px] lg:w-[250px]"
                />
              );
            }

            if (filterType === "select" && columnDef.meta?.options) {
              return (
                <DataTableFacetedFilter
                  key={column.id}
                  column={table.getColumn(column.id)!}
                  title={columnTitles[column.id]}
                  options={columnDef.meta.options}
                />
              );
            }
          }
          return null;
        })}
        {/* {isFiltered && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )} */}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
