"use server";
import { httpBag } from "@/lib/http";
import {
  TProductRequest,
  TProductResponse,
  TUpdateProductRequest,
} from "@/schema/product.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";

// Get all Products
const getAllProducts = async (params?: any) => {
  return await httpBag.get<TTableResponse<TProductResponse>>(`/products`, {
    params,
    cache: "no-store",
  });
};

// Get Product by ID
const getProductById = async (id: string) => {
  return await httpBag.get<TProductResponse>(`/products/${id}`);
};

// Create Product
const createProduct = async (body: TProductRequest) => {
  const result = await httpBag.post<TProductResponse>("/products", body);
  return result;
};

// Update Product
const updateProduct = async (id: string, body: TUpdateProductRequest) => {
  const response = await httpBag.patch<TProductResponse>(
    `/products/${id}`,
    body
  );
  return response;
};

// Delete Product
const deleteProduct = async (id: string): Promise<void> => {
  await httpBag.delete(`/products/${id}`);
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
