"use server";
import { httpBag } from "@/lib/http";
import {
  TUserRequest,
  TUserResponse,
  TUpdateUserRequest,
} from "@/schema/user.schema";
import { TTableResponse } from "@/types/Table";
import { revalidateTag } from "next/cache";

// Get all Users
const getAllUsers = async (params?: any) => {
  return await httpBag.get<TTableResponse<TUserResponse>>("/users", {
    params,
  });
};

// Get User by ID
const getUserById = async (id: string) => {
  return await httpBag.get<TUserResponse>(`/users/${id}`);
};

// Create User
const createUser = async (body: TUserRequest) => {
  const result = await httpBag.post<TUserResponse>("/users", body);
  return result;
};

// Update User
const updateUser = async (id: string, body: TUpdateUserRequest) => {
  const response = await httpBag.patch<TUserResponse>(`/users/${id}`, body);
  return response;
};

// Update User Status
const updateUserStatus = async (id: string, status: string) => {
  const response = await httpBag.patch<TUserResponse>(`/users/${id}/status`, {
    status,
  });
  return response;
};

// Delete User
const deleteUser = async (id: string): Promise<void> => {
  await httpBag.delete(`/users/${id}`);
};

// Get all Suppliers
const getAllSuppliers = async () => {
  return await httpBag.get<TTableResponse<TUserResponse>>("/users", {
    params: { role: "Supplier" },
  });
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserStatus,
  deleteUser,
  getAllSuppliers,
};
