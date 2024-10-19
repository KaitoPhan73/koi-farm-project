import { ColumnDef } from "@tanstack/react-table";

type Option = {
  label: string;
  value: string;
  icon?: React.ComponentType<{
    className?: string;
  }>;
};

type CustomColumnMeta = {
  align?: "left" | "center" | "right";
  filterType?: "input" | "select" | "date";
  options?: Option[];
};

export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  meta?: CustomColumnMeta;
};
