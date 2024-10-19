"use server";
import { httpBag } from "@/lib/http";
import {
  TCategoryRequest,
  TCategoryResponse,
  TUpdateCategoryRequest,
} from "@/schema/category.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";
// Lấy tất cả Categories
const getAllCategories = async (params?: any) => {
  return await httpBag.get<TTableResponse<TCategoryResponse>>(`/categories`, {
    params,
    cache: "no-store",
  });
};

const getCategoryById = async (id: string) => {
  return await httpBag.get<TCategoryResponse>(`/categories/${id}`);
};

const createCategory = async (body: TCategoryRequest) => {
  const result = await httpBag.post<TCategoryResponse>("/categories", body);

  return result;
};

// Cập nhật Category
const updateCategory = async (id: string, body: TUpdateCategoryRequest) => {
  const response = await httpBag.patch<TCategoryResponse>(
    `/categories/${id}`,
    body
  );

  return response;
};

// Xóa Category
const deleteCategory = async (id: string): Promise<void> => {
  await httpBag.delete(`/categories/${id}`);
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
