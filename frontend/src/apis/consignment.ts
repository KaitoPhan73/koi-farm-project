"use server";
import { httpBag } from "@/lib/http";
import {
  TConsignmentRequest,
  TConsignmentResponse,
  TUpdateConsignmentRequest,
} from "@/schema/consignment.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";

// Get all Consignments
const getAllConsignments = async (params?: any) => {
  return await httpBag.get<TTableResponse<TConsignmentResponse>>(
    `/consignments`,
    {
      params,
    }
  );
};

// Get Consignment by ID
const getConsignmentById = async (id: string) => {
  return await httpBag.get<TConsignmentResponse>(`/consignments/${id}`);
};

// Create Consignment
const createConsignment = async (body: TConsignmentRequest) => {
  const result = await httpBag.post<TConsignmentResponse>(
    "/consignments",
    body
  );
  revalidateTag("consignments");
  return result;
};

// Update Consignment
const updateConsignment = async (
  id: string,
  body: TUpdateConsignmentRequest
) => {
  const response = await httpBag.patch<TConsignmentResponse>(
    `/consignments/${id}`,
    body
  );
  revalidateTag("consignments");
  return response;
};

// Delete Consignment
const deleteConsignment = async (id: string): Promise<void> => {
  await httpBag.delete(`/consignments/${id}`);
  revalidateTag("consignments");
};

export {
  getAllConsignments,
  getConsignmentById,
  createConsignment,
  updateConsignment,
  deleteConsignment,
};
