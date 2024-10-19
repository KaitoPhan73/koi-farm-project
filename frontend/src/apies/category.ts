"use server";
import { httpBag } from "@/lib/http";
import {
  TCategoryRequest,
  TCategoryResponse,
  TCategoryUpdateRequest,
} from "@/schema/category.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";
// Lấy tất cả Categories
const getAllCategories = async (params?: any) => {
  return await httpBag.get<TTableResponse<TCategoryResponse>>(`/category`, {
    params,
  });
};

const getCategoryById = async (id: string) => {
  return await httpBag.get<TCategoryResponse>(`/category/${id}`, {
    next: { tags: ["categories"] },
  });
};

// Tạo mới Category
const createCategory = async (body: TCategoryRequest) => {
  const result = await httpBag.post<TCategoryResponse>("/category", body);

  return result;
};

// Cập nhật Category
const updateCategory = async (id: string, body: TCategoryUpdateRequest) => {
  const response = await httpBag.patch<TCategoryResponse>(
    `/category/${id}`,
    body
  );

  return response;
};

// Xóa Category
const deleteCategory = async (id: string): Promise<void> => {
  await httpBag.delete(`/category/${id}`);
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
