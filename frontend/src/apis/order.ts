"use server";
import { httpBag } from "@/lib/http";
import {
  TOrderRequest,
  TOrderResponse,
  TUpdateOrderRequest,
} from "@/schema/order.schema"; // Import order schemas
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";

// Get all Orders
const getAllOrders = async (params?: any) => {
  return await httpBag.get<TTableResponse<TOrderResponse>>(`/orders`, {
    params,
  });
};

// Get Order by ID
const getOrderById = async (id: string) => {
  return await httpBag.get<TOrderResponse>(`/orders/${id}`);
};

// Create Order
const createOrder = async (body: TOrderRequest) => {
  const result = await httpBag.post<TOrderResponse>("/orders", body);
  return result;
};

// Update Order
const updateOrder = async (id: string, body: TUpdateOrderRequest) => {
  const response = await httpBag.patch<TOrderResponse>(`/orders/${id}`, body);
  return response;
};

// Delete Order
const deleteOrder = async (id: string): Promise<void> => {
  await httpBag.delete(`/orders/${id}`);
};

export { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder };
