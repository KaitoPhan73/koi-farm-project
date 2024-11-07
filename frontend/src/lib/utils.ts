import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizePath = (path: string) => {
  return path
    .replace(/\/+$/, "") // Xóa tất cả dấu / ở cuối
    .replace(/^\/+/, "") // Xóa tất cả dấu / ở đầu
    .replace(/([^:]\/)\/+/g, "$1"); // Xóa // ở giữa, nhưng giữ lại http://
};
