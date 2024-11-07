"use server";
import { httpBag } from "@/lib/http";
import {
  TProductBaseRequest,
  TProductBaseResponse,
} from "@/schema/product-base.schema";
import { TTableResponse } from "@/types/Table";

// Get all ProductBases
const getAllProductBases = async (params?: any) => {
  return await httpBag.get<TTableResponse<TProductBaseResponse>>(
    `/product-bases`,
    {
      params,
    }
  );
};

// Get ProductBase by ID
const getProductBaseById = async (id: string) => {
  return await httpBag.get<TProductBaseResponse>(`/product-bases/${id}`);
};

// Create ProductBase
const createProductBase = async (body: TProductBaseRequest) => {
  const result = await httpBag.post<TProductBaseResponse>(
    "/product-bases",
    body
  );
  return result;
};

// Update ProductBase
const updateProductBase = async (
  id: string,
  body: Partial<TProductBaseRequest>
) => {
  const response = await httpBag.patch<TProductBaseResponse>(
    `/product-bases/${id}`,
    body
  );
  return response;
};

// Delete ProductBase
const deleteProductBase = async (id: string): Promise<void> => {
  await httpBag.delete(`/product-bases/${id}`);
};

export {
  getAllProductBases,
  getProductBaseById,
  createProductBase,
  updateProductBase,
  deleteProductBase,
};
